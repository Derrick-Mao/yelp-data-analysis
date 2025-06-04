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
  const [plotUrl, setPlotUrl] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const dynamicKeys = tableData.length > 0 
    ? Object.keys(tableData[0]).filter(key => key.includes("Count"))
    : [];


  // Map month abbreviations to seasons
  const monthToSeason: Record<string, string> = {
    "Jan Count": "Winter",
    "Feb Count": "Winter",
    "Mar Count": "Spring",
    "Apr Count": "Spring",
    "May Count": "Spring",
    "Jun Count": "Summer",
    "Jul Count": "Summer",
    "Aug Count": "Summer",
    "Sep Count": "Fall",
    "Oct Count": "Fall",
    "Nov Count": "Fall",
    "Dec Count": "Winter",
  };

  // Helper to aggregate monthly counts into seasonal sums
  const aggregateToSeasons = (row: any) => {
    const seasonSums: Record<string, number> = { Fall: 0, Winter: 0, Spring: 0, Summer: 0 };
    Object.entries(row).forEach(([key, value]) => {
      if (key.includes("Count") && monthToSeason[key]) {
        seasonSums[monthToSeason[key]] += Number(value) || 0;
      }
    });
    return seasonSums;
  };

  const staticHeaders = ["Business", "Category", "City"];
  let dynamicHeaders: string[] = [];
  let rows = tableData;

  if (filters.season === "") {
    // All seasons selected: show 4 season columns aggregated
    dynamicHeaders = ["Fall", "Winter", "Spring", "Summer"];
    // Replace each row with seasonal aggregated counts
    rows = tableData.map(row => ({
      ...row,
      ...aggregateToSeasons(row),
    }));
  } else {
    // Specific season selected: show monthly columns that belong to that season only
    dynamicHeaders = dynamicKeys.filter(month => monthToSeason[month] === filters.season);
  }

  const fullHeaders = [...staticHeaders, ...dynamicHeaders, "Total Checkins"];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setPlotUrl(`data:image/png;base64,${data.plot}`);
      setTableData(data.table_data);
    } catch (error) {
      console.error("Error sending filters:", error);
    }
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
            <input
              type="text"
              name="region"
              value={filters.region}
              onChange={handleChange}
              placeholder="e.g. Las Vegas"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
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


      {/* Graph Section */}
      <div className="bg-gray-100 py-4 px-6 border rounded flex items-center justify-center">
        {plotUrl ? (
          <img src={plotUrl} alt="Seasonal Trend Graph" className="w-full h-auto" />
        ) : (
          <span className="text-black-500">[ Graph will appear here after filter is applied ]</span>
        )}
      </div>

      {/* Table Section */}
      <h2 className="text-lg font-semibold mt-8 mb-4 text-black">Seasonal Popularity Data Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              {fullHeaders.map((header, idx) => (
                <th key={idx} className="px-4 py-2 border-b text-left text-black">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-4 py-2 border-b text-black">{row.name}</td>
                  <td className="px-4 py-2 border-b text-black">{row.categories}</td>
                  <td className="px-4 py-2 border-b text-black">{row.city}</td>

                  {/* Dynamic seasonal or monthly columns */}
                  {dynamicHeaders.map((header, i) => (
                    <td key={i} className="px-4 py-2 border-b text-black">
                      {row[header] ?? 0}
                    </td>
                  ))}

                  <td className="px-4 py-2 border-b text-black">{row.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fullHeaders.length} className="px-4 py-2 border-b text-center text-black-500">
                  No data yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}