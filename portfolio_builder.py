#!/usr/bin/python3

import datetime
import math
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
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
    risk_tolerance = 3
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
    VTSNX: Vanguard Total International Stock Index Fund Institutional Shares
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

    Target Retirement Funds (0.08% expense ratio for all):
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


def HRP(mutual_fund_data, investment_amount):

    # Calculate returns
    returns = mutual_fund_data.pct_change().dropna()

    # Run optimization algorithm to get weights
    hrp = HRPOpt(returns)
    hrp_weights = hrp.optimize()

    hrp.portfolio_performance(verbose=True)
    #print("\nHierarchial risk parity weights:", dict(hrp_weights))

    # Get exact allocation values
    latest_prices = get_latest_prices(mutual_fund_data)
    da_hrp = DiscreteAllocation(hrp_weights, latest_prices, total_portfolio_value=investment_amount)

    allocation, leftover = da_hrp.greedy_portfolio()
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from Hierarchial Risk Parity")
    plt.show()
    return 
    

def MVO(mutual_fund_data, investment_amount):
    mu = capm_return(mutual_fund_data)  # Covariance matrix
    S = CovarianceShrinkage(mutual_fund_data).ledoit_wolf() # Calculated returns

    ef = EfficientFrontier(mu, S)
    weights = ef.max_sharpe()

    cleaned_weights = ef.clean_weights()

    #print("Mean variance optimization weights:", dict(cleaned_weights))
    #print()
    ef.portfolio_performance(verbose=True)

    # Get exact allocation values
    latest_prices = get_latest_prices(mutual_fund_data)
    da = DiscreteAllocation(weights, latest_prices, total_portfolio_value=investment_amount)

    allocation, leftover = da.greedy_portfolio()
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from mean variance optimization:")
    plt.show()    
    return

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
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from Efficient Semivariance:")
    plt.show()
    return

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
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from Mean Conditional Value At Risk (mCVAR):")
    plt.show()
    return

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
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from Efficient CDaR:")
    plt.show()
    return

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
    print("\nDiscrete allocation:", allocation)
    print("Funds remaining: ${:.2f}".format(leftover))

    labels = list(allocation.keys())
    sizes = list(allocation.values())

    # Create pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title("Allocation from Efficient CVaR:")
    plt.show()
    return


def main():
    # Read user input from frontend 

    # Parse user information
    investment_amount, risk_tolerance, age, target_retirement_year, management_comfort_level, brokerage, percentage_of_income, years_until_retirement, retirement_age = get_user_input()

    # Choose allocation strategy
    allocation_strategy = get_allocation_strategy(risk_tolerance, management_comfort_level, percentage_of_income, years_until_retirement)

    # Collect Historical Price Data 
    mutual_fund_data, benchmark_index_data = get_historical_data(brokerage)

    # Get portfolio allocation based on suggested allocation strategy
    if allocation_strategy == 'target date fund':
        get_target_date_fund(target_retirement_year, brokerage)
    elif allocation_strategy == 'retired':
        get_retired_fund(mutual_fund_data, investment_amount, brokerage, age)
    elif allocation_strategy == 'HRP':
        HRP(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'MVO':
        MVO(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'Efficient Semivariance':
        efficient_semivariance(mutual_fund_data,investment_amount)
    elif allocation_strategy == 'mCVAR':
        mCVAR(mutual_fund_data, investment_amount)
    elif allocation_strategy == 'Efficient CDaR':
        efficient_cdar(mutual_fund_data,investment_amount)
    else:
        efficient_cvar(mutual_fund_data,investment_amount)
    return

if __name__ == "__main__":
    main()
