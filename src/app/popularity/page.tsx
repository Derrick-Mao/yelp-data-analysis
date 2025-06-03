"use client";

import { useState } from "react";
import PageLayout from "../components/pagelayout";

export default function SeasonalPopularityPage() {
  const [filters, setFilters] = useState({
    year: "",
    season: "",
    region: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    // Fetch data using these filters from your API
  };

  return (
    <PageLayout
      title="Seasonal Popularity Trends"
      description="Explore how business popularity changes with the seasons across different regions."
      titleColor="text-red-500"
      descriptionColor="text-white"
    >
      {/* Filter Section */}
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
            <label className="block text-sm font-medium text-black">Season</label>
            <select
              name="season"
              value={filters.season}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
              <option>Winter</option>
            </select>
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
              placeholder="e.g. Bars, Clothing"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
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

      {/* Graph & Table Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Seasonal Trend Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Seasonal Graph will appear here ]</span>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-4">Seasonal Popularity Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Year</th>
                <th className="px-4 py-2 border-b text-left">Season</th>
                <th className="px-4 py-2 border-b text-left">Business</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">City</th>
                <th className="px-4 py-2 border-b text-left">Popularity Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">2023</td>
                <td className="px-4 py-2 border-b">Winter</td>
                <td className="px-4 py-2 border-b">Maple Cafe</td>
                <td className="px-4 py-2 border-b">Cafes</td>
                <td className="px-4 py-2 border-b">Toronto</td>
                <td className="px-4 py-2 border-b">78</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
