#!/usr/bin/python3
import json
from collections import OrderedDict
import datetime
import math
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from pypfopt.expected_returns import capm_return, returns_from_prices
from pypfopt.risk_models import CovarianceShrinkage
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
from pypfopt import HRPOpt, risk_models, EfficientSemivariance, EfficientCVaR, EfficientCDaR


def get_user_input():
    """
    investment_amount: total value of the portfolio
    year_contributions: how much the user is investing this year
    year_salary: how much the user's salary is this year
    risk_tolerance: scale from 1-10 (1 = low tolerance, 10 = high tolerance)
    age: how old the user is
    target_retirement_year: what year the user expects to retire (0 if retired)
    management_comfort_level = 0 (1 = I don't want to manually allocate my funds; 2 = I am open to manually reallocating my funds; 3 = I can comfortably reallocate my funds)
    brokerage: if the user is using Fidelity or Vanguard as their brokerage

    NOTE ---------------------------
    ask desired amount by retirement?
    """
    filepath = "../backend/investments.json"
    
    # try:
    with open(filepath, 'r') as f:
        investment = json.load(f)
    print(investment)

    investment_amount = investment["totalInvestment"]
    year_contributions = investment["yearlyInvestment"]
    year_salary = investment["annualSalary"]
    risk_tolerance = investment["riskTolerance"]
    age = investment["age"]
    target_retirement_year = investment["retirementYear"]
    management_comfort_level = investment["portfolioManagement"]
    brokerage = investment["investmentPlatform"]

    current_year = datetime.datetime.today().year

    # If the user is investing too much of their salary (>20%), warn them that they may be investing too much
    percentage_of_income = year_contributions / year_salary 

    years_until_retirement = max((target_retirement_year - current_year), 0)
    retirement_age = age + years_until_retirement

    return investment_amount, risk_tolerance, age, target_retirement_year, management_comfort_level, brokerage, percentage_of_income, years_until_retirement, retirement_age

        
    # except FileNotFoundError:
    #     print(f"Error: The file '{f}' was not found.")
    # except json.JSONDecodeError:
    #     print(f"Error: The file '{f}' contains invalid JSON.")
    # except Exception as e:
    #     print(f"An unexpected error occurred: {e}")

    # investment_amount = 100000
    # year_contributions = 7000
    # year_salary = 100000
    # risk_tolerance = 10
    # age = 70
    # target_retirement_year = 2025
    # management_comfort_level = 3
    # brokerage = 'Fidelity'

    # current_year = datetime.datetime.today().year

    # # If the user is investing too much of their salary (>20%), warn them that they may be investing too much
    # percentage_of_income = year_contributions / year_salary 

    # years_until_retirement = max((target_retirement_year - current_year), 0)
    # retirement_age = age + years_until_retirement

    # return investment_amount, risk_tolerance, age, target_retirement_year, management_comfort_level, brokerage, percentage_of_income, years_until_retirement, retirement_age


def get_historical_data(brokerage):
    """
    NOTE: Change to use database when available

    Fidelity-------------------------------------

    Mutual Funds:
    FZROX: Fidelity ZERO Total Market Index Fund
    FZILX: Fidelity ZERO International Index Fund
    FEMKX: Fidelity Emerging Markets Fund

    FNILX: Fidellity ZERO Large Cap Index Fund
    FMSDX: Fideltiy Mid Cap Index Fund
    FSSNX: Fidelity Small Cap Index Fund

    Bonds:
    FXNAX: Fidelity® US Bond Index Fund
    FSHBX: Fidelity Short-Term Bond Fund
    FUAMX: Fidelity Intermediate Treasury Bond Index Fund
    FNBGX: Fideltiy Long-Term Treasury Bond Index Fund

    Target Retirement Funds:
    fidelity_target_retirement_funds = {
    'FQIFX' : '2025',
    'FXIFX' : '2030',
    'FIHFX' : '2035',
    'FBIFX' : '2040',
    'FIOFX' : '2045',
    'FIPFX' : '2050',
    'FDEWX' : '2055',
    'FDKLX' : '2060',
    'FFINX' : '2065',
    'FRBVX' : '2070',
    }

    Vanguard-------------------------------------

    Consider:
    VFIAX
    VTSAX

    Mutual Funds:
    VTI: Vanguard Total Stock Market ETF
    VXUS: Vanguard Total International Stock Index Fund ETF
    VWO: Vanguard FTSE Emerging Markets ETF

    VV: Vanguard Large Cap ETF
    VO: Vanguard Mid Cap ETF
    VB: Vanguard Small Cap ETF

    Bonds:
    BND: Vanguard Total Bond Market ETF
    BSV: Vanguard Short-Term Bond ETF
    VTIP: Vanguard Short-Term Inflation-Protected Securities ETF
    VGIT: Vanguard Intermidiate-Term Treasury ETF
    VGLT: Vanguard Long-Term Treasury ETF

    Target Retirement Funds (0.08% expense ratio, $1,000 minimum investment for all):
    vanguard_target_retirement_funds = {
    'VTTVX' : '2025' 
    'VTHRX' : '2030', 
    'VTTHX' : '2035',
    'VFORX' : '2040',
    'VTIVX' : '2045',
    'VFIFX' : '2050',
    'VFFVX' : '2055',
    'VTTSX' : '2060',
    'VLXVX' : '2065',
    'VSVNX' : '2070',
    }

    Benchmark Indices------------------------------------
    GSPC: S&P 500
    DJI: Dow Jones
    IXIC: NASDAQ
    """

    df = pd.read_csv("final_sample_data.csv", index_col='Date', parse_dates=True)

    # Choose fund options based on the user's brokerage
    if brokerage == 'Vanguard': 
        adj_closing_prices = df.iloc[:, 13:]
    else: 
        adj_closing_prices = df.iloc[:, 3:13]

    # Load benchmark index data
    benchmark_index_data = df.iloc[:, 0:3]

    return adj_closing_prices, benchmark_index_data


def get_allocation_strategy(risk_tolerance, management_comfort_level, percentage_of_income, years_until_retirement):
    """
    Use User input to pick the allocation strategy that best matches the risk the user should take on
    """

    # If the user is investing too much of their salary (>20%), warn them that they may be investing too much
    if percentage_of_income > 0.20:
        print("Warning: you may be investing too much of your income. The suggested range is 10% to 20%.")
        print("Your Portfolio will have reduced risk due to this.")
        input("Hit enter to continue.")

        # Reduce risk because percentage of income is too high
        risk_tolerance = (1-percentage_of_income) * risk_tolerance

    # Suggest target date fund if user does not want to manage their fund
    if management_comfort_level == 1:
        return 'target date fund'
    
    # Go to retirement allocation strategies if user has already retired
    if years_until_retirement == 0:
        return 'retired'
    
    # Slightly reduce risk if management_comfort_level is 2
    # No risk adjustment if management_comfort_level is 3
    if management_comfort_level == 2:
        risk_tolerance = risk_tolerance * 0.9

    # Modern Portfolio Theory strategies assigned from least to most risk
    if risk_tolerance <= 2:
        reccomendation = 'HRP'
    elif risk_tolerance > 2 and risk_tolerance <= 3.6:
        reccomendation = 'MVO'
    elif risk_tolerance > 3.6 and risk_tolerance  <= 5.2:
        reccomendation = 'Efficient Semivariance'
    elif risk_tolerance > 5.2 and risk_tolerance <= 6.8:
        reccomendation = 'mCVAR'
    elif risk_tolerance > 6.8 and risk_tolerance <= 8.4:
        reccomendation = 'Efficient CDaR'
    elif risk_tolerance > 8.4:
        reccomendation = 'Efficient CVaR'

    return reccomendation


def custom_round(number, threshold):
    # Rounds up or down to the nearest multiple of 5
    # This gives the best year/target date fund to choose
    if number < threshold:
        return math.floor(number / 5) * 5 
    else:
        return math.ceil(number / 5) * 5
    
def get_target_date_fund(target_retirement_year, brokerage, investment_amount, age):

    vanguard_target_retirement_funds = {
    'VTTVX' : 2025,
    'VTHRX' : 2030,
    'VTTHX' : 2035,
    'VFORX' : 2040,
    'VTIVX' : 2045,
    'VFIFX' : 2050,
    'VFFVX' : 2055,
    'VTTSX' : 2060,
    'VLXVX' : 2065,
    'VSVNX' : 2070,
    }

    fidelity_target_retirement_funds = {
    'FQIFX' : 2025,
    'FXIFX' : 2030,
    'FIHFX' : 2035,
    'FBIFX' : 2040,
    'FIOFX' : 2045,
    'FIPFX' : 2050,
    'FDEWX' : 2055,
    'FDKLX' : 2060,
    'FFINX' : 2065,
    'FRBVX' : 2070,
    }

    # Determine the target year using custom_round
    target_year = custom_round(target_retirement_year, threshold=target_retirement_year + 2.5)
    print("View https://retirementplans.vanguard.com/VGApp/pe/pubeducation/investing/LTgoals/TargetRetirementFunds.jsf to visualize how your fund will change over time")

    # Select the appropriate fund based on brokerage and target year
    print(f"Due to not wanting to manually allocating funds, your suggested portfolio is a target date fund. This allows you to put all your money in the given fund and the asset allocation will automatically adjust as you age.")
    if brokerage == 'vanguard':
        index = vanguard_target_retirement_funds.get(target_year, "No fund found for this target year")
        if index in vanguard_target_retirement_funds:
            print(f"At the target retirement year of {target_retirement_year}, your suggested index is {index} in {brokerage}.")
        else:
            print(index)
    else:
        index = fidelity_target_retirement_funds.get(target_year, "No fund found for this target year")
        if index in fidelity_target_retirement_funds:
            print(f"At the target retirement year of {target_retirement_year}, your suggested index is {index} in {brokerage}.")
        else:
            print(index) 

    weights = get_estimated_asset_allocation(age, brokerage, investment_amount)

    return weights


def get_retired_fund(mutual_fund_data, investment_amount, brokerage, age):
    """
    According to Charles Schwab (https://www.schwab.com/retirement-portfolio):
    * 60-69: moderate portfolio (60% stock, 35% bonds, 5% cash/cash investments)
    * 70–79: moderately conservative (40% stock, 50% bonds, 10% cash/cash investments)
    * 80 and above, conservative (20% stock, 50% bonds, 30% cash/cash investments).

    Currently using:
    Fidelity Managed Retirement Funds: https://www.fidelity.com/mutual-funds/mutual-fund-spotlights/managed-retirement-funds
    Vanguard Target Retirement Funds: https://investor.vanguard.com/investment-products/mutual-funds/target-retirement-funds
    """

    fidelity_year_to_fund = {
        year: fund 
        for fund, years in {
            'FBIFX': range(1968, 1973),
            'FMRTX': range(1963, 1968),
            'FMRAX': range(1958, 1963),
            'FIXRX': range(1953, 1958),
            'FIRVX': range(1948, 1953),
            'FIRSX': range(1943, 1948),
            'FIRQX': range(1938, 1943),
            'FIRMX': range(1920, 1938)
        }.items()
        for year in years
    }

    vanguard_year_to_fund = {
        year: fund 
        for fund, years in {
            'VTTHX': range(1968, 1973),
            'VTHRX': range(1963, 1968),
            'VTTVX': range(1958, 1963),
            'VTWNX': range(1953, 1958),
            'VTINX': range(1920, 1953)
        }.items()
        for year in years
    }

    current_year = datetime.datetime.now().year
    birth_year = current_year - age

    # Select the appropriate mapping
    year_to_fund = vanguard_year_to_fund if brokerage.lower() == 'vanguard' else fidelity_year_to_fund

    # O(1) lookup
    index = year_to_fund.get(birth_year)

    if index:
        print(f"At your age of {age} (born in {birth_year}), your suggested index is {index} in {brokerage}.")
    else:
        print(f"No fund found for birth year {birth_year}. Consider other strategies.")

    weights = get_estimated_asset_allocation(age, brokerage, investment_amount)
    return weights


# Display asset allocation in a pie chart
def display_asset_allocation(allocation, leftover, investment_amount, allocation_type):
    indices = list(allocation.keys())
    amounts = [round(x * investment_amount, 2) for x in allocation.values()]

    # Show discrete allocation
    print("\nWe suggest putting:",)
    for i in range(len(allocation)):
        print(f"${amounts[i]:,.2f} in {indices[i]}")

    print("Funds remaining: ${:.2f}".format(leftover))

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(amounts, labels=indices, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title(f"Allocation from {allocation_type}")
    plt.show()

    return


def HRP(mutual_fund_data, investment_amount):
    mu = returns_from_prices(mutual_fund_data)
    S = CovarianceShrinkage(mutual_fund_data).ledoit_wolf() # Covariance matrix

    # Run optimization algorithm to get weights
    hrp = HRPOpt(mu, S)
    hrp.optimize()
    hrp_weights = hrp.clean_weights()

    hrp.portfolio_performance(verbose=True)
    #print("\nHierarchial risk parity weights:", hrp_weights)

    # Get exact allocation values
    latest_prices = get_latest_prices(mutual_fund_data)
    da_hrp = DiscreteAllocation(hrp_weights, latest_prices, total_portfolio_value=investment_amount)
    allocation, leftover = da_hrp.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, "Hierarchial Risk Parity (HRP) allocation:")

    return hrp_weights
    

def MVO(mutual_fund_data, investment_amount):
    mu = capm_return(mutual_fund_data)  # Calculated returns
    S = CovarianceShrinkage(mutual_fund_data).ledoit_wolf() # Covariance matrix

    ef = EfficientFrontier(mu, S)
    weights = ef.max_sharpe()

    cleaned_weights = ef.clean_weights()

    #print("Mean variance optimization weights:", dict(cleaned_weights))
    ef.portfolio_performance(verbose=True)

    # Get exact allocation values
    latest_prices = get_latest_prices(mutual_fund_data)
    da = DiscreteAllocation(weights, latest_prices, total_portfolio_value=investment_amount)
    allocation, leftover = da.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, 'Mean Variance Optimization (MVO) allocation:')

    return cleaned_weights


def efficient_semivariance(mutual_fund_data, investment_amount):
    
    mu = capm_return(mutual_fund_data)
    historical_returns = returns_from_prices(mutual_fund_data)

    es = EfficientSemivariance(mu, historical_returns)
    es.efficient_return(0.10) # Looking for a portfolio that minimizes the semivariance for a target annual return of 10%

    weights = es.clean_weights()
    #print("Weights:", weights)
    es.portfolio_performance(verbose=True)

    # Discrete allocation
    latest_prices = get_latest_prices(mutual_fund_data)
    da_sv = DiscreteAllocation(weights, latest_prices, total_portfolio_value=investment_amount)

    allocation, leftover = da_sv.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, "Efficient Semivariance allocation:")

    return weights


def mCVAR(mutual_fund_data, investment_amount):

    mu = capm_return(mutual_fund_data) 
    S = mutual_fund_data.cov()
    ef_cvar = EfficientCVaR(mu, S)
    cvar_weights = ef_cvar.min_cvar()

    cleaned_weights = ef_cvar.clean_weights()
    #print("Weights:", dict(cleaned_weights))
    ef_cvar.portfolio_performance(verbose=True)

    # Discrete allocation
    latest_prices = get_latest_prices(mutual_fund_data)
    da_cvar = DiscreteAllocation(cvar_weights, latest_prices, total_portfolio_value=investment_amount)
    allocation, leftover = da_cvar.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, "Monte Carlo Value at Risk (mCVAR) allocation:")

    return cleaned_weights


def efficient_cdar(mutual_fund_data, investment_amount):
    
    mu = capm_return(mutual_fund_data)
    historical_returns = returns_from_prices(mutual_fund_data)

    es = EfficientCDaR(mu, historical_returns)
    es.efficient_return(0.10) # Looking for a portfolio that minimizes the semivariance for a target annual return of 10%

    weights = es.clean_weights()
    #print("Weights:", weights)
    es.portfolio_performance(verbose=True)

    # Discrete allocation
    latest_prices = get_latest_prices(mutual_fund_data)
    da_cdar = DiscreteAllocation(weights, latest_prices, total_portfolio_value=investment_amount)
    allocation, leftover = da_cdar.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, "Efficeint Conditional Drawdown at Risk (CDaR) allocation:")

    return weights


def efficient_cvar(mutual_fund_data, investment_amount):

    mu = capm_return(mutual_fund_data)
    historical_returns = returns_from_prices(mutual_fund_data)

    es = EfficientCVaR(mu, historical_returns)
    es.efficient_return(0.10) # Looking for a portfolio that minimizes the semivariance for a target annual return of 10%

    # We can use the same helper methods as before
    weights = es.clean_weights()
    #print("Weights:", weights)
    es.portfolio_performance(verbose=True)

    # Discrete allocation
    latest_prices = get_latest_prices(mutual_fund_data)
    da_cvar = DiscreteAllocation(weights, latest_prices, total_portfolio_value=investment_amount)
    allocation, leftover = da_cvar.greedy_portfolio()

    display_asset_allocation(allocation, leftover, investment_amount, "Efficeint Conditional Value at Risk (CVaR) allocation:")

    return weights


# Get the correct index for each asset type in for the right brokerage
# Converts allocation percentages into normalized weights between 0-1
def build_estimated_portfolio(allocation, brokerage, investment_amount):
    # Normalize allocations to sum to 1, handling potential floating-point errors
    total = sum(allocation)
    normalized_allocation = [a/total for a in allocation]

    # Build an ordered dict with the index of each asset for the given brokerage
    # In order from top to bottom: US equity, non-US equity, bonds, short term debt
    portfolio = OrderedDict()
    if brokerage == "Vanguard":
        portfolio["VTI"] = normalized_allocation[0]
        portfolio["VXUS"] = normalized_allocation[1]
        portfolio["BND"] = normalized_allocation[2]
        portfolio["VTIP"] = normalized_allocation[3]
    else:
        portfolio["FZROX"] = normalized_allocation[0]
        portfolio["FZILX"] = normalized_allocation[1]
        portfolio["FXNAX"] = normalized_allocation[2]
        portfolio["FSHBX"] = normalized_allocation[3]    

    display_asset_allocation(portfolio, 0, investment_amount, "Estimated retirement portfolio allocation: ")

    return portfolio

# Getting estimated asset allocation is needed for users who were suggested a target date fund or retired fund strategy
def get_estimated_asset_allocation(age, brokerage, investment_amount):
    """
    Used post-retirement data from Fidelity and target date retirement funds from Vanguard.
    Found that asset allocation did not change between 20-40 years old (target date retirement 2070-2050)
    Got accurate asset allocation estimates from a trendline for the rest of the ages (40+)
    """
    # Initialize allocation values in percentages
    # Asset order: US-stocks, bonds, Non-US stocks, short term debt 

    # If the user is under 40, the asset allocation does not change
    if age < 40:
        asset_allocation = [54, 36, 10, 0]

    # If the user is 40 or older, use linear equations to estimate asset allocation
    else: 
        US_equity = max(0, (-0.976 * age) + 93.6)
        non_US_equity = max(0, (-0.63 * age) + 60.9)
        bonds = max(0, (1.37 * age) - 42.8)

        # No short term debt until over 60 years old
        short_term_debt = max(0, (0.37 * age) - 21.5) if age >0 else 0
        
        # Put all percentages together
        asset_allocation = [US_equity, non_US_equity, bonds, short_term_debt]

    # Get the designated index for each asset
    asset_allocation = build_estimated_portfolio(asset_allocation, brokerage, investment_amount)

    return asset_allocation


# Monte Carlo method to simulate potential forecasts of the portfolio and benchmark indices
# Correlating benchmarks with portfolio for more realistic results (correlated, move together in reality)
def portfolio_monte_carlo_simulation(mutual_fund_data, benchmark_index_data, weights, investment_amount):
    # Set simulation parameters
    simulations = 100
    days = 360 * 5

    # Verify all weight keys exist in mutual fund data
    missing_funds = [f for f in weights.keys() if f not in mutual_fund_data.columns]
    if missing_funds:
        raise ValueError(f"Weight keys not found in mutual fund data: {missing_funds}")
    
    # Filter mutual fund data to only include weighted funds
    filtered_mutual_fund_data = mutual_fund_data[list(weights.keys())]

    # Combine all indices (portfolio + benchmarks) for correlated simulation
    all_returns = pd.concat([
        filtered_mutual_fund_data.pct_change(),
        benchmark_index_data.pct_change()
    ], axis=1).dropna()
    
    # Get combined statistics
    mean_returns = all_returns.mean().values
    cov_matrix = all_returns.cov().values
    n_portfolio = len(weights)
    n_benchmarks = len(benchmark_index_data.columns)

    # Initialize results
    portfolio_sims = np.zeros((days, simulations))
    benchmarks_sims = np.zeros((days, simulations, n_benchmarks))
    weights_array = np.array(list(weights.values()))

    for sim in range(simulations):
        # Generate correlated random numbers for all assets
        Z = np.random.normal(size=(days, n_portfolio + n_benchmarks))
        L = np.linalg.cholesky(cov_matrix)
        correlated_returns = mean_returns + (Z @ L.T)
        
        # Split into portfolio and benchmark returns
        portfolio_daily_returns = correlated_returns[:, :n_portfolio]
        benchmark_daily_returns = correlated_returns[:, n_portfolio:]
        
        # Portfolio simulation
        weighted_returns = portfolio_daily_returns @ weights_array
        portfolio_sims[:, sim] = investment_amount * np.cumprod(1 + weighted_returns)
        
        # Benchmarks simulation
        benchmarks_sims[:, sim, :] = investment_amount * np.cumprod(1 + benchmark_daily_returns, axis=0)

    # Portfolio plot
    plt.figure(figsize=(14, 6))
    plt.plot(portfolio_sims)
    plt.title("Portfolio Simulations")
    plt.ylabel("Value ($)")
    plt.xlabel("Days")
    plt.show()
    
    # Benchmarks plot
    plt.figure(figsize=(14, 6))
    for i in range(n_benchmarks):
        plt.plot(benchmarks_sims[:, :, i], label=benchmark_index_data.columns[i])
    plt.title("Benchmark Simulations")
    plt.show()

    return portfolio_sims, benchmarks_sims


# Visualize the 5th, 25th, 50th, 75th, and 95th percentile outcomes to better understand/visualize risk and return of the portfolio, anc relative to the market
def show_percentiles(portfolio_sims, benchmark_sims, benchmark_index_data, investment_amount):
    # Portfolio Percentiles (Standalone Figure)
    plt.figure(figsize=(16, 8))
    portfolio_percentiles = np.percentile(portfolio_sims, [5, 25, 50, 75, 95], axis=1)
    plt.plot(portfolio_percentiles.T, linewidth=2)
    plt.title(f"Portfolio Value Percentiles (Initial: ${investment_amount:,.0f})", fontsize=14)
    plt.ylabel("Value ($)", fontsize=12)
    plt.xlabel("Days", fontsize=12)
    plt.legend(['5th', '25th', 'Median', '75th', '95th'], fontsize=11)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.show()
    
    # Benchmark Percentiles (Separate Figures)
    for i in range(benchmark_sims.shape[2]):
        plt.figure(figsize=(16, 6))
        benchmark_percentiles = np.percentile(benchmark_sims[:, :, i], [5, 25, 50, 75, 95], axis=1)
        plt.plot(benchmark_percentiles.T, linewidth=2)
        plt.title(f"{benchmark_index_data.columns[i]} Percentiles", fontsize=14)
        plt.ylabel("Value ($)", fontsize=12)
        plt.xlabel("Days", fontsize=12)
        plt.legend(['5th', '25th', 'Median', '75th', '95th'], fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()

    return


def show_combined_percentiles(portfolio_sims, benchmark_sims, benchmark_index_data, investment_amount):
    plt.figure(figsize=(14, 8))
    
    # Calculate portfolio percentiles
    portfolio_percentiles = np.percentile(portfolio_sims, [5, 25, 50, 75, 95], axis=1)
    days = portfolio_sims.shape[0]
    
    # Plot portfolio percentiles
    plt.plot(portfolio_percentiles.T, 
             label=['Portfolio 5th', 'Portfolio 25th', 'Portfolio Median', 
                    'Portfolio 75th', 'Portfolio 95th'],
             linestyle='-', linewidth=2)
    
    # Calculate and plot benchmark percentiles
    n_benchmarks = benchmark_sims.shape[2]
    colors = plt.cm.tab10(np.linspace(0, 1, n_benchmarks))  # Different colors for each benchmark
    
    for i in range(n_benchmarks):
        benchmark_name = benchmark_index_data.columns[i]
        benchmark_percentiles = np.percentile(benchmark_sims[:, :, i], [50], axis=1)  # Just median
        
        plt.plot(benchmark_percentiles.T, 
                 label=f'{benchmark_name} Median',
                 color=colors[i], 
                 linestyle='--', 
                 linewidth=2)
    
    plt.title(f"Projected Portfolio vs Benchmark Percentiles (Initial: ${investment_amount:,.0f})")
    plt.ylabel("Portfolio Value ($)")
    plt.xlabel("Days")
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

    return


def main():
    # Read user input from frontend 

    # Parse user information
    investment_amount, risk_tolerance, age, target_retirement_year, management_comfort_level, brokerage, percentage_of_income, years_until_retirement, retirement_age = get_user_input()

    # Choose allocation strategy
    allocation_strategy = get_allocation_strategy(risk_tolerance, management_comfort_level, percentage_of_income, years_until_retirement)
    print(f"Your suggested allocation strategy is {allocation_strategy}!")

    # Collect Historical Price Data 
    mutual_fund_data, benchmark_index_data = get_historical_data(brokerage)

    # Get portfolio allocation based on suggested allocation strategy
    if allocation_strategy == 'target date fund':
        if (investment_amount < 1000) and (brokerage == "Vanguard"):
            print("DISCLAIMER: Minimum investment for Vanguard retirement funds are $1,000")
        weights = get_target_date_fund(target_retirement_year, brokerage, investment_amount, age)
    elif allocation_strategy == 'retired':
        if (investment_amount < 1000) and (brokerage == "Vanguard"):
            print("DISCLAIMER: Minimum investment for Vanguard retirement funds are $1,000")
        weights = get_retired_fund(mutual_fund_data, investment_amount, brokerage, age)
    elif allocation_strategy == 'HRP':
        weights = HRP(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'MVO':
        weights = MVO(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'Efficient Semivariance':
        weights = efficient_semivariance(mutual_fund_data,investment_amount)
    elif allocation_strategy == 'mCVAR':
        weights = mCVAR(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'Efficient CDaR':
        weights = efficient_cdar(mutual_fund_data,investment_amount)
    else:
        weights = efficient_cvar(mutual_fund_data,investment_amount)

    portfolio_sims, benchmark_sims = portfolio_monte_carlo_simulation(mutual_fund_data, benchmark_index_data, weights, investment_amount)
    show_percentiles(portfolio_sims, benchmark_sims, benchmark_index_data, investment_amount)
    show_combined_percentiles(portfolio_sims, benchmark_sims, benchmark_index_data, investment_amount)
    return


if __name__ == "__main__":
    main()

"""
TODO: 
"""