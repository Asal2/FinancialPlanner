import matplotlib.pyplot as plt

# Aggregated spending data
categories = [
    'Food and Drink', 
    'Entertainment', 
    'Travel', 
    'Transportation', 
    'General Merchandise', 
    'Loan Payments'
]

amounts = [179.61, 179.61, 179.61, 64.94, 2578.5, 62.25]

# Plotting the pie chart
plt.figure(figsize=(9, 9))
plt.pie(
    amounts, 
    labels=categories, 
    autopct='%1.1f%%', 
    startangle=90, 
    shadow=True,
    wedgeprops={'edgecolor': 'black'}
)
plt.title('Aggregated Spending by Category')
plt.axis('equal')  # Ensures the pie chart is circular
plt.tight_layout()
plt.show()