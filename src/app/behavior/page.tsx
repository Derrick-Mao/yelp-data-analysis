"use client";

import { useState } from "react";
import Header from "../components/header";
import PageLayout from "../components/pagelayout";

const UserBehavior = () => {
  const [filters, setFilters] = useState({
    startYear: "",
    endYear: "",
    region: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    // Call your API to fetch data from MySQL using these filters
  };

  return (
    <PageLayout
      title="Elite vs Non-Elite Behavior"
      description="Compare Yelp behaviors between elite and non-elite users over time."
      titleColor="text-red-500"
      descriptionColor="text-white"
    >
      {/* Filter Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Start Year</label>
            <input
              type="number"
              name="startYear"
              value={filters.startYear}
              onChange={handleChange}
              placeholder="e.g. 2015"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">End Year</label>
            <input
              type="number"
              name="endYear"
              value={filters.endYear}
              onChange={handleChange}
              placeholder="e.g. 2024"
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

      {/* Chart and Table Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Behavior Comparison Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Graph comparing elite vs non-elite users ]</span>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-4">User Behavior Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Year</th>
                <th className="px-4 py-2 border-b text-left">Region</th>
                <th className="px-4 py-2 border-b text-left">User Type</th>
                <th className="px-4 py-2 border-b text-left">Average Reviews</th>
                <th className="px-4 py-2 border-b text-left">Average Stars Given</th>
                <th className="px-4 py-2 border-b text-left">Average Useful Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">2023</td>
                <td className="px-4 py-2 border-b">Las Vegas</td>
                <td className="px-4 py-2 border-b">Elite</td>
                <td className="px-4 py-2 border-b">36.2</td>
                <td className="px-4 py-2 border-b">4.3</td>
                <td className="px-4 py-2 border-b">120.5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">2023</td>
                <td className="px-4 py-2 border-b">Las Vegas</td>
                <td className="px-4 py-2 border-b">Non-Elite</td>
                <td className="px-4 py-2 border-b">12.4</td>
                <td className="px-4 py-2 border-b">3.8</td>
                <td className="px-4 py-2 border-b">35.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserBehavior;
