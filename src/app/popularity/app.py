from flask import Flask, request, jsonify
from flask_cors import CORS
from analytics import run_analysis
import pandas as pd
import base64
from io import BytesIO

# 🛠️ Fix: use non-interactive backend before importing pyplot
import matplotlib
matplotlib.use("Agg")  # <- ADD THIS LINE
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
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
