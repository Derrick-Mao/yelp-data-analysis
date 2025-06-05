"use client";

import { useState } from "react";
import Header from "../components/header";
import PageLayout from "../components/pagelayout";

const TopPhrases = () => {
  const [filters, setFilters] = useState({
    count: "",
    rank: "",
  });


   type FrequentPhrase = {
    category: string;
    phrase?: string;
    count: number;
    rank: number;
  };
  const [phrases, setPhrase] = useState<FrequentPhrase[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    const params = new URLSearchParams();

    if(filters.count) {
      params.append("count_lte", filters.count);
    }
    if(filters.rank) {
      params.append("rank", filters.rank);
    }


    try {
      const response = await fetch(`http://127.0.0.1:5000/api/frequentphrase?${params.toString()}`);
      const data = await response.json();
      // console.log("Fetched anomalies:", data);
      setPhrase(data);
    } catch (error) {
      console.error("Failed to fetch phrases:", error);
    }
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
            <label className="block text-sm font-medium text-black">Count</label>
            <input
              type="number"
              name="count"
              value={filters.count}
              onChange={handleChange}
              placeholder="e.g. 2023"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Rank</label>
            <select
              name="rank"
              value={filters.rank}
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

      {/* Visualization Placeholder */}
      {/* <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Phrase Frequency Visualization</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Word Cloud or Bar Chart of Top Phrases ]</span>
        </div>
      </div> */}

      {/* Table of Top Phrases */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Top Phrases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-black">Category</th>
                <th className="px-4 py-2 border-b text-left text-black">Phrase</th>
                <th className="px-4 py-2 border-b text-left text-black">Count</th>
                <th className="px-4 py-2 border-b text-left text-black">Rank</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {phrases.map((phrase, index) => (
              <tr key = {index}>
                <td className="px-4 py-2 border-b">{phrase.category}</td>
                <td className="px-4 py-2 border-b">{phrase.phrase || "N/A"}</td>
                <td className="px-4 py-2 border-b">{phrase.count}</td>
                <td className="px-4 py-2 border-b">{phrase.rank}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default TopPhrases;
