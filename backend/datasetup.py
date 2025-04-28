import boto3 
import pandas as pd
from io import StringIO

# AWS S3 Configuration


import os
os.environ['AWS_ACCESS_KEY_ID'] = ''
os.environ['AWS_SECRET_ACCESS_KEY'] = ''

# Initialize S3 client
s3 = boto3.client('s3')
BUCKET_NAME = 'financialplannerapp881'
FILE_KEY = 's3://financialplannerapp881/final_sample_data.csv'

def read_csv_from_s3(BUCKET_NAME, file_key):
    """Reads a CSV file from S3 and returns a Pandas DataFrame."""
    obj = s3.get_object(Bucket=BUCKET_NAME, Key=file_key)
    csv_content = obj['Body'].read().decode('utf-8')
    return pd.read_csv(StringIO(csv_content))

# Fetch and display data from each file
dataframes = {}
for file in FILES:
    try:
        df = read_csv_from_s3('financialplannerapp881', file)
        dataframes[file] = df
        print(f"Data from {file}:")
        print(df.head(), "\n")
    except Exception as e:
        print(f"Error reading {file}: {e}")


# AWS S3 Configuration
BUCKET_NAME = "financialplannerapp881"

# Initialize S3 client
s3 = boto3.client('s3')

def list_files_in_s3(bucket_name):
    """Lists all file keys in the specified S3 bucket."""
    response = s3.list_objects_v2(Bucket=bucket_name)
    if "Contents" in response:
        return [item["Key"] for item in response["Contents"]]
    return []

# Get all file keys
file_keys = list_files_in_s3(BUCKET_NAME)
print("Files in S3 Bucket:", file_keys)