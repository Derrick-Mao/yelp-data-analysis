"use client";

import { useState } from "react";
import PageLayout from "../components/pagelayout";

export default function AreaPopularityPage() {
  const [filters, setFilters] = useState({
    area_type: "",
    average_checkins: "",
  });

  type Areapop = {
    category: string;
    area_type: string;
    business_count: number;
    average_rating: number;
    average_checkins: number;
  }

  const [areapopularity, setArea] = useState<Areapop[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

   const handleApplyFilters = async () => {
    const params = new URLSearchParams();

    if(filters.average_checkins) {
      params.append("checkin_lte", filters.average_checkins);
    }
    if(filters.area_type) {
      params.append("area_type", filters.area_type);
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/areapopularity?${params.toString()}`);
      const data = await response.json();
      // console.log("Fetched anomalies:", data);
      setArea(data);
    } catch (error) {
      console.error("Failed to fetch area:", error);
    }
  };

  return (
    <PageLayout
      title="Area Popularity Trends"
      description="Analyze popularity trends across different cities and categories."
      titleColor="text-red-500"
      descriptionColor="text-white"
    >
      {/* Filter Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Area Type</label>
            <select
              name="area_type"
              value={filters.area_type}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="">All</option>
              <option>rural</option>
              <option>urban</option>
              <option>suburban</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Average Check-Ins</label>
            <input
              type="number"
              name="average_checkins"
              value={filters.average_checkins}
              onChange={handleChange}
              placeholder="e.g. 50"
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
      {/* <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Popularity Trend Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Graph will appear here ]</span>
        </div> */}

        <h2 className="text-lg font-semibold mt-8 mb-4 text-black">Popularity Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-black">Category</th>
                <th className="px-4 py-2 border-b text-left text-black">Area Type</th>
                <th className="px-4 py-2 border-b text-left text-black">Business Count</th>
                <th className="px-4 py-2 border-b text-left text-black">Average Rating</th>
                <th className="px-4 py-2 border-b text-left text-black">Average Check-Ins</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {areapopularity.map((area, index) => (
              <tr key = {index}>
                <td className="px-4 py-2 border-b">{area.category}</td>
                <td className="px-4 py-2 border-b">{area.area_type || "N/A"}</td>
                <td className="px-4 py-2 border-b">{area.business_count}</td>
                <td className="px-4 py-2 border-b">{area.average_rating}</td>
                <td className="px-4 py-2 border-b">{area.average_checkins}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* </div> */}
    </PageLayout>
  );
}
