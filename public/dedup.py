import pandas as pd
from datetime import timedelta, datetime
import json

def get_data_from_file(datafile):
    with open(datafile, 'r') as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    return format_df(df)

def format_df(df):
    # Remove duplicates
    df = df.loc[~df.index.duplicated(keep='last')]
    
    # Convert index to datetime and resample to daily frequency
    df.index = pd.to_datetime(df.index)
    df = df.resample('D').ffill()
    
    # Check for missing and duplicate dates
    start_date = df.index[0].date()
    end_date = df.index[-1].date()
    expected_dates = pd.date_range(start=start_date, end=end_date, freq='D')
    missing_dates = expected_dates.difference(df.index)
    duplicate_dates = df.index[df.index.duplicated(keep='last')].unique()
    
    # Print information about missing and duplicate dates
    if len(missing_dates) > 0:
        print(f"The following dates are missing: {', '.join(map(str, missing_dates.date))}")
    if len(duplicate_dates) > 0:
        print(f"The following dates are duplicated: {', '.join(map(str, duplicate_dates.date))}")
    
    # Save updated data to file
    df.to_csv("output.txt")
    return df

if __name__ == "__main__":
    datafile = "hkd_historical"
    formatted_data = get_data_from_file(datafile)
