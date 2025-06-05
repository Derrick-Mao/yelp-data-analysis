"use client";

import { useState } from "react";
import PageLayout from "../../components/pagelayout";

export default function AnomalyPage() {
  const [filters, setFilters] = useState({
    sentiment: "",
    anomaly: "",
    stars: "",
  });

    type Anomaly = {
    anomaly: string;
    predicted_sentiment?: string;
    stars: number;
    text: string;
  };

  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/anomalies?${params.toString()}`);
      const data = await response.json();
      console.log("Fetched anomalies:", data);
      setAnomalies(data);
    } catch (error) {
      console.error("Failed to fetch anomalies:", error);
    }
  };

    return (
    <PageLayout
      title="Anomaly Detection"
      description="Explore anomalies detected in Yelp review patterns."
      titleColor="text-red-500"
      descriptionColor="text-white"
    >
      {/* Filter Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Predicted Sentiment</label>
            <select
              name="sentiment"
              value={filters.sentiment}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option>negative</option>
              <option>positive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Anomaly</label>
            <select
              name="anomaly"
              value={filters.anomaly}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option>high_star_negative_sentiment</option>
              <option>low_star_positive_sentiment</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-black">Stars</label>
            <select
              name="stars"
              value={filters.stars}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            > 
              <option value="">All</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleApplyFilters}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Graph & Table */}
      {/* <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Anomaly Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Graph will appear here ]</span>
        </div> */}

      <div className="text-lg font-semibold mt-8 mb-4 text-black">Anomaly Data Table</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-black">Anomaly</th>
              <th className="px-4 py-2 border-b text-left text-black">Predicted Sentiment</th>
              <th className="px-4 py-2 border-b text-left text-black">Stars</th>
              <th className="px-4 py-2 border-b text-left text-black">Text</th>
            </tr>
          </thead>
          <tbody className= "text-black">
            {anomalies.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No data found. Apply filters to see results.
                </td>
              </tr>
            ) : (
              anomalies.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{item.anomaly}</td>
                  <td className="px-4 py-2 border-b">{item.predicted_sentiment || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{item.stars}</td>
                  <td className="px-4 py-2 border-b">{item.text}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}

