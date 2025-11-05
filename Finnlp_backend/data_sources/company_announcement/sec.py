import os
import time
from tqdm import tqdm
from lxml import etree
import pandas as pd
import json
from ._base import Company_Announcement_Downloader
from lxml import etree
import re
class SEC_Announcement(Company_Announcement_Downloader):
    def __init__(self, save_dir=None, args={}):
        if save_dir:
            args["save_dir"] = save_dir
        super().__init__(args)
        self.dataframe = pd.DataFrame()
        self.args = args  # <--- store args
        if save_dir:
            os.makedirs(save_dir, exist_ok=True)

    def download_date_range_stock(self, start_date, end_date, stock="AAPL", delay=0.1):
        entityName = self._get_entity_name(stock)  # -> cik
        # first page
        total_pages = self._gather_one_page(start_date, end_date, 1, entityName, delay)
        # other pages
        if total_pages > 1:
            for page in tqdm(range(1, total_pages), desc="Downloading other pages..."):
                self._gather_one_page(start_date, end_date, page + 1, entityName, delay)

        self.dataframe = self.dataframe.reset_index(drop=True)

    def _get_entity_name(self, stock="AAPL"):
        url = "https://efts.sec.gov/LATEST/search-index"
        headers = {"user-agent": "Mozilla/5.0"}
        params = {"keysTyped": stock}
        resp = self._request_get(url=url, headers=headers, params=params)
        if resp is None:
            raise ConnectionError("Can't get entity name")

        res = json.loads(resp.text)
        item_list = res["hits"]["hits"]
        if not item_list:
            raise ValueError(f"No SEC entity found for {stock}")
        cik = item_list[0]["_id"].zfill(10)
        return cik
    def extract_filing_text(self, raw_text):
        try:
           # First try HTML
           tree = etree.HTML(raw_text)
           if tree is None:
              # fallback to XML parsing
              tree = etree.fromstring(raw_text.encode('utf-8'), parser=etree.XMLParser(recover=True))
           content = tree.xpath("//text()")
           content = [c.strip() for c in content if c.strip() != ""]
           text = " ".join(content)
        except Exception:
            text = raw_text

        # normalize whitespace
        import re
        text = re.sub(r"\s+", " ", text)
        return text

    def _gather_one_page(self, start_date, end_date, page, entityName="0000320193", delay=0.01):
        from_ = (page - 1) * 100
        url = "https://efts.sec.gov/LATEST/search-index"
        headers = {"user-agent": "Mozilla/5.0"}
        params = {
            "dateRange": "custom",
            "ciks": entityName,
            "startdt": start_date,
            "enddt": end_date,
            "from": from_,
            "page": page,
        }
        resp = self._request_get(url=url, headers=headers, params=params)
        if resp is None:
            print("⚠️ SEC returned no response")
            return 0
        res = json.loads(resp.text)
        total_items = res["hits"]["total"]["value"]
        total_pages = (total_items + 99) // 100
        items = res["hits"]["hits"]
        if not items:
            print(f"⚠️ No filings found for {entityName} between {start_date} and {end_date}")
            return total_pages

        url_base = "https://www.sec.gov/Archives/edgar/data"
        save_dir = self.args.get("save_dir")

        for item in tqdm(items, desc="Downloading filings..."):
            try:
                url_third = item["_source"].get("xsl")
                url_second, url_fourth = item["_id"].split(":")
                url_second = url_second.split("-")
                url_first = url_second[0].lstrip("0")
                url_second = "".join(url_second)

                if url_third:
                    filing_url = f"{url_base}/{url_first}/{url_second}/{url_third}/{url_fourth}"
                else:
                    filing_url = f"{url_base}/{url_first}/{url_second}/{url_fourth}"

                filing_resp = self._request_get(url=filing_url, headers=headers)
                content = ""
                if filing_resp is not None:
                    try:
                        content =self. extract_filing_text(filing_resp.text)
                    except Exception:
                        content = filing_resp.text  # fallback

                # Save file to disk
                if save_dir:
                    filename = f"{item['_id'].replace(':','_')}.txt"
                    filepath = os.path.join(save_dir, filename)
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)

                # Add to dataframe
                data = {
                    "_id": item["_id"],
                    "ciks": item["_source"].get("ciks", ""),
                    "form": item["_source"].get("form", ""),
                    "file_date": item["_source"].get("file_date", ""),
                    "file_description": item["_source"].get("file_description", ""),
                    "content": content,
                    "file_path": filepath if save_dir else None
                }
                self.dataframe = pd.concat([self.dataframe, pd.DataFrame([data])])
                time.sleep(delay)

            except Exception as e:
                print(f"❌ Error parsing item {item.get('_id','')}: {e}")
                continue

        return total_pages
