


from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from pymongo import MongoClient
from app.popularity.analytics_utils import run_analysis
import pandas as pd
import base64
from io import BytesIO

app = Flask(__name__)  
CORS(app)

import matplotlib
matplotlib.use("Agg")  
import matplotlib.pyplot as plt


client = MongoClient("mongodb://100.105.156.62:27017/")
db = client["yelpdb"]


@app.route("/api/anomalies", methods=["GET"])
def get_anomalies():
    collection = db["anomalies_collection"]
    
    sentiment = request.args.get("sentiment")
    anomaly = request.args.get("anomaly")
    stars = request.args.get("stars")


    query = {}
    if sentiment:
        query["predicted_sentiment"] = sentiment
    if anomaly:
        query["anomaly"] = anomaly
    if stars:
        try:
            query["stars"] = int(stars)
        except ValueError:
            return jsonify({"error": "Invalid stars value"}), 400


    results = list(collection.find(query, {"_id": 0}))
    return jsonify(results)

@app.route("/api/behavior", methods=["GET"])
def get_behaviors():
    collection_map = {
        "all": "elite_review_counts_collection",
        "vote_counter": "vote_counter_collection",
        "avg_review_length": "avg_review_length_collection",
        "avg_stars": "avg_stars_collection",
        "badges": "elite_badge_counts_collection"
    }
    question_key = request.args.get("question")
    collection_name = collection_map.get(question_key)
    
    if not collection_name:
        return jsonify({"error": "Invalid question type"}), 400

    collection = db[collection_name]


    results = list(collection.find({}, {"_id": 0}))
    return jsonify(results)


@app.route("/api/frequentphrase", methods=["GET"])
def get_phrase():
    collection = db["top_phrases_by_category"]
    count_lte = request.args.get("count_lte")
    rank = request.args.get("rank")


    query = {}
    if count_lte:
        try:
            query["count"] = {"$lte": int (count_lte)}
        except ValueError:
            return jsonify({"error": "Invalid stars value"}), 400
    if rank:
        try:
            query["rank"] = int(rank)
        except ValueError:
            return jsonify({"error": "Invalid stars value"}), 400

    
    results = list(collection.find(query, {"_id": 0}))
    return jsonify(results)

@app.route("/api/areapopularity", methods=["GET"])
def get_area():
    collection = db["areapareapopularity_collection"]
    checkin_lte = request.args.get("checkin_lte")
    area_type = request.args.get("area_type")

   
    query = {}
    if checkin_lte:
        try:
            query["average_checkins"] = {"$lte": int (checkin_lte)}
        except ValueError:
            return jsonify({"error": "Invalid stars value"}), 400
    if area_type:
        try:
            query["area_type"] = area_type
        except ValueError:
            return jsonify({"error": "Invalid stars value"}), 400

    results = list(collection.find(query, {"_id": 0}))
    return jsonify(results)



@app.route("/api/analyze", methods=['POST', 'OPTIONS'])
@cross_origin()
def analyze():
    data = request.json
    city = data.get("region")
    category = data.get("category")
    season = data.get("season", "All")
    year = data.get("year", "")

    print(f"[DEBUG] Filters applied - City: {city}, Category: {category}, Season: {season}, Year: {year}")

    try:
        results = run_analysis(city=city, category_keyword=category, season=season, years_back=5, limit=10)
        plot_base64 = generate_plot_base64(results)
        return jsonify({"plot": plot_base64, "table_data": results})
    except Exception as e:
        print("Error during analysis:", e)
        return jsonify({"error": str(e)}), 500

def generate_plot_base64(result_list):
    if not result_list:
        return ""

    df = pd.DataFrame(result_list)
    month_columns = [col for col in df.columns if "Count" in col]
    display_labels = [m.split()[0][:3] + "." for m in month_columns]

    plt.figure(figsize=(12, 6))
    for _, row in df.iterrows():
        checkins = [row.get(m, 0) for m in month_columns]
        plt.plot(range(len(month_columns)), checkins, marker='o', label=row.get('name', '')[:20])

    plt.xlabel("Month")
    plt.ylabel("Check-ins")
    plt.title("Monthly Check-ins for Top Businesses")
    plt.legend(loc="upper right", fontsize="small", ncol=2)
    plt.xticks(ticks=range(len(month_columns)), labels=display_labels, rotation=45)
    plt.grid(True)
    plt.tight_layout()

    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    encoded = base64.b64encode(buffer.read()).decode("utf-8")
    plt.close()
    return encoded



if __name__ == "__main__":  
    app.run(debug=True)