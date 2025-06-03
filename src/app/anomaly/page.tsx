"use client";

import { useState } from "react";
import PageLayout from "../components/pagelayout";

export default function AnomalyPage() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    region: "",
    category: "",
    threshold: "",
    anomalyType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    //fetch data using these filters from your API
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
            <label className="block text-sm font-medium text-black">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">City or Region</label>
            <select
              name="region"
              value={filters.region}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option>Las Vegas</option>
              <option>Toronto</option>
              <option>Phoenix</option>
              <option>Charlotte</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Business Category</label>
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleChange}
              placeholder="e.g. Restaurants"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Review Count Threshold</label>
            <input
              type="number"
              name="threshold"
              value={filters.threshold}
              onChange={handleChange}
              placeholder="e.g. 50"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Anomaly Type</label>
            <select
              name="anomalyType"
              value={filters.anomalyType}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option value="spike">Spike</option>
              <option value="drop">Drop</option>
              <option value="outlier">Outlier</option>
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

      {/* Graph & Table (same as before) */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Anomaly Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Graph will appear here ]</span>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-4">Anomaly Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Date</th>
                <th className="px-4 py-2 border-b text-left">Business</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">City</th>
                <th className="px-4 py-2 border-b text-left">Anomaly Type</th>
                <th className="px-4 py-2 border-b text-left">Review Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">2024-03-15</td>
                <td className="px-4 py-2 border-b">Joe's Pizza</td>
                <td className="px-4 py-2 border-b">Restaurants</td>
                <td className="px-4 py-2 border-b">Las Vegas</td>
                <td className="px-4 py-2 border-b">Spike</td>
                <td className="px-4 py-2 border-b">122</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
