from data_sources.company_announcement.sec import SEC_Announcement

sec = SEC_Announcement(save_dir="SEC_filings/")

# Download filings for a date range
sec.download_date_range_stock(start_date="2025-08-25", end_date="2025-09-13", stock="AAPL")

# Access the dataframe
df = sec.dataframe
print(df.head())
