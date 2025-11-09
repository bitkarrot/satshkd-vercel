# Import the pandas and json libraries
import pandas as pd
import json

# Define a function that reads in data from a JSON file, converts it to a DataFrame, removes duplicates, and saves the deduplicated data to a new file
def get_data_from_file(datafile):
    # Open the specified JSON file and load its contents into a Python object
    with open(datafile, 'r') as f:
        data = json.load(f)
    # Convert the Python object to a pandas DataFrame
    df = pd.DataFrame(data)

    # Check for duplicate rows in the DataFrame
    duplicates = df.duplicated(keep="first")
    
    # Remove the duplicate rows from the DataFrame
    dedup_df = df[~duplicates]
    
    # Print the original and deduplicated DataFrame sizes
    print("Original DataFrame contains {} rows".format(len(df)))
    print("Deduplicated DataFrame contains {} rows".format(len(dedup_df)))
    
    # Identify the dates that were duplicated and removed
    duplicated_dates = df[duplicates]['date'].unique()
    print("Dates that were duplicated and removed:")
    print(duplicated_dates)
    
    # Save the deduplicated data to a new JSON file
    dedup_file = "historical_dedup"
    dedup_df.to_json(dedup_file, orient="records")

# If this script is run directly, call the get_data_from_file function with the specified file name
if __name__ == "__main__":
    datafile = "historical"
    get_data_from_file(datafile)
