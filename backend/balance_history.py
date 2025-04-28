
import pandas as pd
import matplotlib.pyplot as plt

# Sample data loading (replace with your CSV or DataFrame loading)
data = {
    "Account No": ["409000611074'"] * 14,
    "DATE": [
        "29-Jun-17", "5-Jul-17", "18-Jul-17", "1-Aug-17", "16-Aug-17",
        "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17",
        "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17"
    ],
    "TRANSACTION DETAILS": [
        "TRF FROM Indiaforensic SERVICES", "TRF FROM Indiaforensic SERVICES", "FDRL/INTERNAL FUND TRANSFE",
        "TRF FRM Indiaforensic SERVICES", "FDRL/INTERNAL FUND TRANSFE",
        "FDRL/INTERNAL FUND TRANSFE", "FDRL/INTERNAL FUND TRANSFE", "FDRL/INTERNAL FUND TRANSFE",
        "FDRL/INTERNAL FUND TRANSFE", "FDRL/INTERNAL FUND TRANSFE",
        "INDO GIBL Indiaforensic STL01071", "INDO GIBL Indiaforensic STL02071",
        "INDO GIBL Indiaforensic STL03071", "INDO GIBL Indiaforensic STL04071"
    ],
    "VALUE DATE": [
        "29-Jun-17", "5-Jul-17", "18-Jul-17", "1-Aug-17", "16-Aug-17",
        "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17",
        "16-Aug-17", "16-Aug-17", "16-Aug-17", "16-Aug-17"
    ],
    "WITHDRAWAL AMT": [
        None, None, None, None, None,
        None, None, None, None, None,
        133900.00, 18000.00, 5000.00, 195800.00
    ],
    "DEPOSIT AMT": [
        1000000.00, 1000000.00, 500000.00, 3000000.00, 500000.00,
        500000.00, 500000.00, 500000.00, 500000.00, 500000.00,
        None, None, None, None
    ],
    "BALANCE AMT": [
        1000000.00, 2000000.00, 2500000.00, 5500000.00, 6000000.00,
        6500000.00, 7000000.00, 7500000.00, 8000000.00, 8500000.00,
        8366100.00, 8348100.00, 8343100.00, 8147300.00
    ]
}

# Create DataFrame
df = pd.DataFrame(data)

# Convert 'VALUE DATE' to datetime
df['VALUE DATE'] = pd.to_datetime(df['VALUE DATE'], format='%d-%b-%y')

# Set it as the DataFrame index
df.set_index('VALUE DATE', inplace=True)

# Resample monthly (taking the LAST balance of each month)
monthly_balance = df['BALANCE AMT'].resample('M').last()

# Plot
plt.figure(figsize=(10,6))
plt.plot(monthly_balance.index, monthly_balance.values, marker='o')
plt.title('Monthly Balance Summary Over Time')
plt.xlabel('Month')
plt.ylabel('Balance Amount')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
