import pandas as pd
from pymongo import MongoClient
from functools import reduce

def run_analysis(city=None, category_keyword=None, season="All", years_back=5, limit=10):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["yelp_db"]
    collection = db["monthly_business_checkins"]

    df = pd.DataFrame(list(collection.find()))
    if df.empty:
        return []

    # Basic filters
    if city:
        df = df[df["city"] == city]
    if category_keyword:
        df = df[df["categories"].str.contains(category_keyword, case=False, na=False)]

    # Season filters
    season_months = {
        "All": ["Jan Count", "Feb Count", "Mar Count", "Apr Count", "May Count", "Jun Count",
                "Jul Count", "Aug Count", "Sep Count", "Oct Count", "Nov Count", "Dec Count"],
        "Winter": ["Dec Count", "Jan Count", "Feb Count"],
        "Spring": ["Mar Count", "Apr Count", "May Count"],
        "Summer": ["Jun Count", "Jul Count", "Aug Count"],
        "Fall": ["Sep Count", "Oct Count", "Nov Count"]
    }

    season = season.capitalize() if season else "All"
    months = season_months.get(season, season_months["All"])
    df["Seasonal Total"] = df[months].sum(axis=1)

    df = df.sort_values("Seasonal Total", ascending=False)

    if limit:
        df = df.head(limit)

    df["year"] = "N/A"
    df["season"] = season
    df["score"] = df["Seasonal Total"]

    final_df = df[["year", "season", "name", "categories", "city", "score"] + months]
    return final_df.to_dict(orient="records")
