import pandas as pd
import json

# Read the JSON data from a local file
with open("historical") as f:
    json_data = json.load(f)

# Convert the list of dictionaries to a dictionary
data_dict = {d["date"]: d for d in json_data}

# Load the dictionary into a Pandas DataFrame
df = pd.DataFrame(data_dict.values())
df["date"] = pd.to_datetime(df["date"], format="%Y-%m-%d")
df.set_index("date", inplace=True)

# Create a new DataFrame with all dates between the earliest and latest dates in the original DataFrame
min_date = df.index.min()
max_date = df.index.max()
all_dates = pd.date_range(start=min_date, end=max_date, freq="D")
all_dates_df = pd.DataFrame(index=all_dates)

# Merge the original DataFrame with the new DataFrame containing all dates to find any missing dates
merged_df = pd.merge(all_dates_df, df, how="left", left_index=True, right_index=True)

# Print any missing dates in the dataset
missing_dates = merged_df[merged_df.isnull().any(axis=1)].index.strftime("%Y-%m-%d").tolist()
print(f"Missing dates: {missing_dates}")
