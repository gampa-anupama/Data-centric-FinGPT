from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse, FileResponse
import pandas as pd
import os
import finnhub
from datetime import datetime, timedelta

from finnlp.data_sources.news.akshare_cctv import Akshare_cctv
from finnlp.data_sources.news.finnhub_date_range import Finnhub_Date_Range
from finnlp.data_sources.news.cnbc_streaming import CNBC_Streaming
from finnlp.data_sources.news.yahoo_streaming import Yahoo_Date_Range  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Root
# =========================
@app.get("/")
def root():
    return {"message": "FinNLP News API is running!"}

@app.get("/cctv-news/download")
async def download_cctv_news():
    file_path = "cctv_news_2023-01-01_2023-01-03.csv"  # or dynamically get path
    if os.path.exists(file_path):
        return FileResponse(file_path, filename=os.path.basename(file_path), media_type='text/csv')
    else:
        return {"error": "File not found"}
    

@app.get("/cctv-news")
def get_cctv_news(
    start_date: str = "2023-01-01",
    end_date: str = "2023-01-03",
    download: bool = Query(False)
):
    try:
        downloader = Akshare_cctv()
        downloader.download_news(start_date, end_date)
        df = downloader.dataframe
        file_path = f"cctv_news_{start_date}_{end_date}.csv"
        df.to_csv(file_path, index=False, encoding="utf-8")

        if download:
            return FileResponse(path=file_path, filename=os.path.basename(file_path), media_type="text/csv")

        return {
            "message": "CCTV news downloaded successfully",
            "rows": len(df),
            "csv_file": os.path.basename(file_path),
            "preview": df.head(10).to_dict(orient="records")
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# =========================
# 2. FINNHUB GENERAL NEWS
# =========================
@app.get("/finnhub-news")
def get_finnhub_news():
    try:
        api_key = "d2hd2r1r01qon4ebkv8gd2hd2r1r01qon4ebkv90"
        client = finnhub.Client(api_key=api_key)

        # Fetch general news
        res = client.general_news("general", min_id=None)
        df = pd.DataFrame(res)

        if "datetime" in df.columns:
            df["datetime"] = pd.to_datetime(df["datetime"], unit="s")

        # Save to CSV
        file_path = "general_news.csv"
        df.to_csv(file_path, index=False, encoding="utf-8")

        return {
            "message": "Finnhub news downloaded successfully",
            "rows": len(df),
            "csv_file": os.path.abspath(file_path),
            "preview": df.head(10).to_dict(orient="records")
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# =========================
# 3. AAPL NEWS (Finnhub_Date_Range)
# =========================
@app.get("/aapl-news")
def get_aapl_news():
    try:
        api_key = "d2hd2r1r01qon4ebkv8gd2hd2r1r01qon4ebkv90"
        downloader = Finnhub_Date_Range(args={"token": api_key})

        # Last 30 days dynamically
        end_date = datetime.today().strftime("%Y-%m-%d")
        start_date = (datetime.today() - timedelta(days=30)).strftime("%Y-%m-%d")

        # Download Apple news
        downloader.download_date_range_stock(
            start_date=start_date,
            end_date=end_date,
            stock="AAPL"
        )

        df = downloader.dataframe
        if df.empty:
            return JSONResponse(
                status_code=404,
                content={"error": f"No Apple news found between {start_date} and {end_date}"}
            )

        # Save to CSV
        file_path = f"aapl_news_{start_date}_to_{end_date}.csv"
        df.to_csv(file_path, index=False, encoding="utf-8-sig")

        return {
            "message": f"AAPL news downloaded successfully ({start_date} → {end_date})",
            "rows": len(df),
            "csv_file": os.path.abspath(file_path),
            "preview": df.head(10).to_dict(orient="records")
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.get("/cnbc-news")
def get_cnbc_news(
    keyword: str = Query("apple", description="Keyword to search"),
    rounds: int = Query(3, description="Number of pages to fetch"),
    delay: float = Query(0.5, description="Delay between requests in seconds")
):
    try:
        downloader = CNBC_Streaming()
        downloader.download_streaming_search(keyword=keyword, rounds=rounds, delay=delay)
        df = downloader.dataframe.reset_index(drop=True)

        if df.empty:
            return JSONResponse(
                status_code=404,
                content={"error": f"No CNBC news found for keyword '{keyword}'"}
            )

        # Clean invalid values (NaN, inf, -inf) so JSON can handle it
        df = df.replace([float("inf"), float("-inf")], None)
        df = df.where(pd.notnull(df), None)

        # Save to CSV
        file_path = f"cnbc_news_{keyword}.csv"
        df.to_csv(file_path, index=False, encoding="utf-8")

        # First 10 rows as safe JSON
        preview = df.head(10).to_dict(orient="records")

        return {
            "message": f"CNBC news for '{keyword}' downloaded successfully",
            "rows": len(df),
            "csv_file": os.path.abspath(file_path),
            "preview": preview
        }

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# =========================
# 4. Download CSV (Optional)
# =========================
@app.get("/download/{file_name}")
def download_file(file_name: str):
    try:
        return FileResponse(file_name, filename=file_name)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=404)

# import your class

# =========================
# 4. Yahoo News (Date Range)
# =========================
@app.get("/yahoo-news")
def get_yahoo_news(
    stock: str = Query("AAPL", description="Stock ticker symbol, e.g., AAPL"),
    start_date: str = Query((datetime.today() - timedelta(days=30)).strftime("%Y-%m-%d"), description="Start date in YYYY-MM-DD"),
    end_date: str = Query(datetime.today().strftime("%Y-%m-%d"), description="End date in YYYY-MM-DD")
):
    try:
        api_key = "d2hd2r1r01qon4ebkv8gd2hd2r1r01qon4ebkv90"  # replace with your actual Finnhub API key
        downloader = Yahoo_Date_Range(args={"token": api_key})

        # Download Yahoo Finance style news
        downloader.download_date_range_stock(
            start_date=start_date,
            end_date=end_date,
            stock=stock
        )

        df = downloader.dataframe

        if df.empty:
            return JSONResponse(
                status_code=404,
                content={"error": f"No Yahoo news found for {stock} between {start_date} and {end_date}"}
            )

        # Save CSV
        file_path = f"yahoo_news_{stock}_{start_date}_{end_date}.csv"
        df.to_csv(file_path, index=False, encoding="utf-8")

        # Show preview (first 10 rows)
        preview = df.head(10).to_dict(orient="records")

        return {
            "message": f"Yahoo news downloaded successfully for {stock}",
            "rows": len(df),
            "csv_file": os.path.abspath(file_path),
            "preview": preview
        }

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


from fastapi.responses import FileResponse

# ---------------------------
# Universal CSV Download Route
# ---------------------------
@app.get("/{source_name}/download")
def download_news_csv(source_name: str):
    """
    Generic route for downloading CSVs of different sources.
    Example: /cctv-news/download or /finnhub-news/download
    """
    try:
        # Map backend routes to their respective file names
        file_map = {
            "cctv-news": "cctv_news_2023-01-01_2023-01-03.csv",
            "finnhub-news": "general_news.csv",
            "aapl-news": "aapl_news_" + (datetime.today() - timedelta(days=30)).strftime("%Y-%m-%d") + "_to_" + datetime.today().strftime("%Y-%m-%d") + ".csv",
            "cnbc-news": "cnbc_news_apple.csv",
            "yahoo-news": "yahoo_news_AAPL_" + (datetime.today() - timedelta(days=30)).strftime("%Y-%m-%d") + "_" + datetime.today().strftime("%Y-%m-%d") + ".csv",
        }

        file_name = file_map.get(source_name)
        if not file_name or not os.path.exists(file_name):
            return JSONResponse(content={"error": f"File for {source_name} not found"}, status_code=404)

        return FileResponse(path=file_name, filename=os.path.basename(file_name), media_type="text/csv")

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
