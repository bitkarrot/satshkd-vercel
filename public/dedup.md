##Here's a line-by-line explanation of the Python program called "dedup.py"


Before we review please go through the program in its entirety before breaking out line by line to have the mental reference point: 

![Code Snippet](/Users/tobiasmele/Code_Projects/4 Misc/Code Snippet Dedup Pythom Program.png)

```
import pandas as pd
import json

def get_data_from_file(datafile):
    data = None
    with open(datafile, "+r") as f:
        raw = f.read()
        data = json.loads(raw)
        df = pd.json_normalize(data)
        df = df[~df.index.duplicated(keep="first")]
        return format_df(df)

def format_df(df):    
    df["date"] = pd.to_datetime(df["date"])
    df["btcusd_rate"] = pd.to_numeric(df["btcusd_rate"])
    df["sathkd_rate"] = pd.to_numeric(df["sathkd_rate"])
    df["btchkd_rate"] = pd.to_numeric(df["btchkd_rate"])
    df["usdsat_rate"] = pd.to_numeric(df["usdsat_rate"])

    df = df.set_index("date")
    return df

# Example usage
datafile = "hkd_historical"
formatted_data = get_data_from_file(datafile)
with open("output.txt", "w") as f:
    f.write(str(formatted_data.head()))

```

**Lines 1-2**

```
import pandas as pd
import json
```
This code imports two modules, pandas and json, which are used later in the program for working with data in JSON format and creating and manipulating data in a tabular format.


**Lines 4-11**

```
def get_data_from_file(datafile):
    data = None
    with open(datafile, "+r") as f:
        raw = f.read()
        data = json.loads(raw)
        df = pd.json_normalize(data)
        df = df[~df.index.duplicated(keep="first")]
        return format_df(df)
```

This is a function called **get_data_from_file**, which takes a filename (string) as an argument. 

The function opens the file and reads its contents as a string, which it then loads into a Python object using the **json.loads()** method. This object is then converted to a pandas DataFrame using the **pd.json_normalize()** method. 

The function also removes any duplicate rows in the DataFrame using the **df[~df.index.duplicated(keep="first")]** code, which keeps the first occurrence of each duplicated index. 

Finally, the function calls the **format_df** function (defined later in the code) to format the DataFrame, and returns the formatted DataFrame.

**Lines 13-18**

```
def format_df(df):    
    df["date"] = pd.to_datetime(df["date"])
    df["btcusd_rate"] = pd.to_numeric(df["btcusd_rate"])
    df["sathkd_rate"] = pd.to_numeric(df["sathkd_rate"])
    df["btchkd_rate"] = pd.to_numeric(df["btchkd_rate"])
    df["usdsat_rate"] = pd.to_numeric(df["usdsat_rate"])

    df = df.set_index("date")
    return df
```
This is a function called **format_df**, which takes a DataFrame as an argument. 

The function formats the "date" column of the DataFrame as a datetime using **pd.to_datetime()**. 

It also formats the "btcusd_rate", "sathkd_rate", and "btchkd_rate" columns as numeric using **pd.to_numeric()**. 

Finally, the function sets the "date" column as the index of the DataFrame using **df = df.set_index("date")**, and returns the formatted DataFrame.

**Lines 23-27**

```
# Example usage
datafile = "hkd_historical"
formatted_data = get_data_from_file(datafile)
with open("output.txt", "w") as f:
    f.write(str(formatted_data.head()))
```

This code shows an example of how to use the functions defined earlier. 

It sets the datafile variable to the string **"hkd_historical"**, which is the name of a file containing Bitcoin exchange rate data in JSON format. 

It then calls the **get_data_from_file** function, passing in datafile as an argument, and assigns the result to the formatted_data variable. 

Finally, the program opens a file called **"output.txt"** in write mode using the with open("output.txt", "w") as f: code, writes a string representation of the first 5 rows of formatted_data to the file using f.write(str(formatted_data.head())), and then closes the file.
