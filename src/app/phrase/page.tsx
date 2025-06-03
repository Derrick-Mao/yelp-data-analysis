"use client";

import { useState } from "react";
import Header from "../components/header";
import PageLayout from "../components/pagelayout";

const TopPhrases = () => {
  const [filters, setFilters] = useState({
    year: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    // Fetch and update data here
  };

  return (
    <PageLayout
      title="Top Phrases in Reviews"
      description="Explore the most frequently used phrases in Yelp reviews, with sentiment analysis."
      titleColor="text-red-500"
      descriptionColor="text-white"
    >
      {/* Filter Panel */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Year</label>
            <input
              type="number"
              name="year"
              value={filters.year}
              onChange={handleChange}
              placeholder="e.g. 2023"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">City</label>
            <select
              name="city"
              value={filters.city}
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

      {/* Visualization Placeholder */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Phrase Frequency Visualization</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Word Cloud or Bar Chart of Top Phrases ]</span>
        </div>
      </div>

      {/* Table of Top Phrases */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Top Phrases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-black">Phrase</th>
                <th className="px-4 py-2 border-b text-left text-black">Frequency</th>
                <th className="px-4 py-2 border-b text-left text-black">Avg Sentiment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b text-black">"great service"</td>
                <td className="px-4 py-2 border-b text-black">452</td>
                <td className="px-4 py-2 border-b text-green-600">0.87</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b text-black">"would not recommend"</td>
                <td className="px-4 py-2 border-b text-black">311</td>
                <td className="px-4 py-2 border-b text-red-600">-0.65</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b text-black">"highly recommend"</td>
                <td className="px-4 py-2 border-b text-black">289</td>
                <td className="px-4 py-2 border-b text-green-600">0.92</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b text-black">"waited too long"</td>
                <td className="px-4 py-2 border-b text-black">198</td>
                <td className="px-4 py-2 border-b text-red-600">-0.48</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default TopPhrases;
