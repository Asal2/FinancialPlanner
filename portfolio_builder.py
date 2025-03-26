#!/usr/bin/python3

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

    investment_amount = 14000
    year_contributions = 7000
    year_salary = 100000
    risk_tolerance = 1
    age = 21
    target_retirement_year = 2065
    management_comfort_level = 3
    brokerage = 'Fidelity'

    current_year = datetime.datetime.today().year

    # If the user is investing too much of their salary (>20%), warn them that they may be investing too much
    percentage_of_income = year_contributions / year_salary 

    years_until_retirement = max((target_retirement_year - current_year), 0)
    retirement_age = age + years_until_retirement

    return investment_amount, risk_tolerance, age, target_retirement_year, management_comfort_level, brokerage, percentage_of_income, years_until_retirement, retirement_age


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

    df = pd.read_csv("final_sample_data.txt", index_col='Date', parse_dates=True)

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
    
def get_target_date_fund(target_retirement_year, brokerage):

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

    return


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

    fidelity_retired_funds = {
        'FBIFX' : [1972, 1971, 1970, 1969, 1968],
        'FMRTX' : [1967, 1966, 1965, 1964, 1963],
        'FMRAX' : [1962, 1961, 1960, 1959, 1958],
        'FIXRX' : [1957, 1956, 1955, 1954, 1953],
        'FIRVX' : [1952, 1951, 1950, 1949, 1948],
        'FIRSX' : [1947, 1946, 1945, 1944, 1943],
        'FIRQX' : [1942, 1941, 1940, 1939, 1938],
        'FIRMX' : [year for year in range(1920, 1938)],
    }

    vanguard_retired_funds = {
        'VTTHX' : [1972, 1971, 1970, 1969, 1968],
        'VTHRX' : [1967, 1966, 1965, 1964, 1963],
        'VTTVX' : [1962, 1961, 1960, 1959, 1958],
        'VTWNX' : [1957, 1956, 1955, 1954, 1953],
        'VTINX' : [year for year in range(1920, 1952)],
    }

    current_year = datetime.datetime.today().year
    birth_year = current_year - age

    # Select the appropriate fund based on brokerage and target year
    print("Your managed retirement fund allows you to put all your money in the given fund and the asset allocation will automatically adjust as you age.")
    if brokerage == 'vanguard':
        index = vanguard_retired_funds.get(birth_year, "No fund found for your birth year. As a younger person, other strategies such as target date funds may be better for you.")
        if index in vanguard_retired_funds:
            print(f" At your age of {age}, your suggested index is {index} in {brokerage}.")
        else:
            print(index)
    else:
        index = fidelity_retired_funds.get(birth_year, "No fund found for your birth year. As a younger person, other strategies such as target date funds may be better for you.")
        if index in fidelity_retired_funds:
            print(f" At your age of {age}, your suggested index is {index} in {brokerage}.")
        else:
            print(index)
    return


# Display asset allocation in a pie chart
def display_asset_allocation(allocation, leftover, allocation_type):
    indices = list(allocation.keys())
    amounts = list(allocation.values())

    print("\nWe suggest putting:",)
    for i in range(len(allocation)):
        print(f"${amounts[i]} in {indices[i]}")

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

    display_asset_allocation(allocation, leftover, "Hierarchial Risk Parity (HRP) allocation:")

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

    display_asset_allocation(allocation, leftover, 'Mean Variance Optimization (MVO) allocation:')

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

    display_asset_allocation(allocation, leftover, "Efficient Semivariance allocation:")

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

    display_asset_allocation(allocation, leftover, "Monte Carlo Value at Risk (mCVAR) allocation:")

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

    display_asset_allocation(allocation, leftover, "Efficeint Conditional Drawdown at Risk (CDaR) allocation:")

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

    display_asset_allocation(allocation, leftover, "Efficeint Conditional Value at Risk (CVaR) allocation:")

    return weights


# Get the correct index for each asset type in for the right brokerage
def build_estimated_portfolio(allocation, brokerage, investment_amount):

    # Build an ordered dict with the index of each asset for the given brokerage
    # In order from top to bottom: US equity, non-US equity, bonds, short term debt
    portfolio = OrderedDict()
    if brokerage == "Vanguard":
        portfolio["VTI"] = allocation[0]
        portfolio["VXUS"] = allocation[1]
        portfolio["BND"] = allocation[2]
        portfolio["VTIP"] = allocation[3]
    else:
        portfolio["FZROX"] = allocation[0]
        portfolio["FZILX"] = allocation[1]
        portfolio["FXNAX"] = allocation[2]
        portfolio["FSHBX"] = allocation[3]    

    # Show discrete allocation
    print("We suggest putting:")
    print(f"${allocation[0] * investment_amount} in {portfolio[0]}")
    print(f"${allocation[1] * investment_amount} in {portfolio[1]}")
    print(f"${allocation[2] * investment_amount} in {portfolio[2]}")
    print(f"${allocation[3] * investment_amount} in {portfolio[3]}")

    display_asset_allocation(allocation, 0, "Estimated retirement portfolio allocation: ")

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
    asset_allocation = [0, 0, 0, 0]

    # If the user is under 40, the asset allocation does not change
    if age < 40:
        asset_allocation = [54, 36, 10, 0]

    # If the user is 40 or older, use linear equations to estimate asset allocation
    else: 
        US_equity = (-0.976 * age) + 93.6
        non_US_equity = (-0.63 * age) + 60.9
        bonds = (1.37 * age) - 42.8

        # No short term debt until over 60 years old
        if age > 60:
            short_term_debt = (0.37 * age) - 21.5
        else:
            short_term_debt = 0
        
        # Put all percentages together
        asset_allocation = [US_equity, non_US_equity, bonds, short_term_debt]

    # Get the designated index for each asset
    asset_allocation = build_estimated_portfolio(asset_allocation, brokerage, investment_amount)

    return asset_allocation


# Monte Carlo method to simulate potential forecasts of the portfolio and benchmark indices
def monte_carlo_simulation(mutual_fund_data, benchmark_index_data, weights, investment_amount):
    simulations = 10
    days = 100

    # Get mean returns matrix and covariance matrix
    mean_returns = mutual_fund_data.pct_change().mean()
    mean_matrix = np.full(shape=(days, len(weights)), fill_value=mean_returns)
    mean_matrix = mean_matrix.T
    cov_matrix = mean_returns.cov()

    portfolio_sims = np.full(shape=(days, simulations), fill_value=mean_returns)

    for sim in range(simulations):
        # sample uncorrelated variables
        Z = np.random.normal(size=(days, len(weights)))

        # Calculate lower triangle of Cholesky Decomposition
        L = np.linalg.cholesky(cov_matrix)
        daily_returns = mean_matrix + np.inner(L, Z)

        # Keep track of each simulation
        portfolio_sims[:, sim] = np.cumprod(np.inner(weights, daily_returns.T)+ 1) * investment_amount

    # Display the portfolio simulations
    plt.plot(portfolio_sims)
    plt.ylabel("Portfolio Value ($)")
    plt.xlabel("Days")
    plt.title("Monte Carlo simulation of potential portfolio value over time")
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
        weights = get_target_date_fund(target_retirement_year, brokerage)
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

    monte_carlo_simulation(mutual_fund_data, benchmark_index_data, weights, investment_amount)
    return

if __name__ == "__main__":
    main()

"""
TODO: 
^ Get weights for target date funds and retired funds (could do estimates based on age)
Display monte carlo simulations for benchmark indices (could do just S&P 500)
^ Check weights and if all should be cleaned with strat.clean_weights()
^ Add disclaimers for minimum investment amounts
* Replace VTSNX ($5 million min investment) with VXUS ($1 min investment)
"""
