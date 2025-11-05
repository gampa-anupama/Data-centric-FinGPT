from data_sources.company_announcement.juchao import Juchao_Announcement

# Initialize
ann = Juchao_Announcement()

# Download announcements for stock 000001 (Ping An Bank) between Jan–Feb 2024
ann.download_date_range_stock(
    start_date="2025-01-01",
    end_date="2025-02-28",
    stock="000001",
    get_content=True,      # download PDFs and extract text
    save_dir="./ann_pdfs/", 
    delate_pdf=False
)

# See results
print(ann.dataframe.head())
