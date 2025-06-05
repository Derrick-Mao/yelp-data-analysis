"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import PageLayout from "../components/pagelayout";

const UserBehavior = () => {
  type QuestionKey = "all" | "vote_counter" | "avg_review_length" | "avg_stars" | "badges";
  const [selectedQuestion, setSelectedQuestion] = useState <QuestionKey>("all");
  const [data, setData] = useState([]);


  const questionMap: Record <QuestionKey, {collection: string; columns: {label: string; key: string } []}> = {
    all: {
      collection: "elite_review_counts_collection",
      columns: [{label: "Elite Status? (Yes or No)", key: "is_elite"},
                {label: "User Count", key: "user_count"},
                {label: "Overall Review Count", key: "total_review_count"},
                {label: "Average Review Count", key: "avg_review_count"}
              ]
    },
    vote_counter: {
      collection: "vote_counter_collection",
      columns: [{label: "Elite Status? (Yes or No)", key: "is_elite"},
                {label: "Overall Useful Vote Count", key: "total_useful_count"},
                {label: "Overall Funny Vote Count", key: "total_funny_count"},
                {label: "Overall Reviews Count", key: "total_reviews"},
                {label: "Useful Vote Percentage", key: "percent_reviews_useful"},
                {label: "Funny Vote Percentage", key: "percent_reviews_funny"}
              ]
    },
    avg_review_length: {
      collection: "avg_review_length_collection",
      columns: [{label: "Elite Status? (Yes or No)", key: "is_elite"},
                {label: "Average Review Length", key: "avg_review_length"}
              ]
    },
    avg_stars: {
      collection: "avg_stars_collection",
      columns: [{label: "Elite Status? (Yes or No)", key: "is_elite"},
                {label: "Average Stars (Out of 5)", key: "average_stars"}
              ]
    },
    badges: {
      collection: "elite_badge_counts_collection",
      columns: [{label: "Elite Status Badge Type", key: "elite_status_badge"},
                {label: "Overall Badge Count", key: "count"}
              ]
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as QuestionKey
    setSelectedQuestion(value);

    const collection = questionMap[value]?.collection || questionMap.all.collection;
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/behavior?question=${value}`);
      // const text = await response.text();
      // console.log("Raw response text:", text);
      const json = await response.json();
      console.log("Fetched data:", json);
      setData(json);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const columns = questionMap[selectedQuestion]?.columns || [];

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
            <label className="block text-sm font-medium text-black">Questions</label>
            <select
              name="question"
              value={selectedQuestion}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="all">Elite Vs Non-Elite Users: Count, Review Count, Average Review Count</option>
              <option value="vote_counter">Vote Counter: Do Elite Users get more votes than Non-Elite Users?</option>
              <option value="avg_review_length">Average Review Length: Do Elite Users write longer reviews than Non-Elite Users?</option>
              <option value="avg_stars">Average Stars: Are Elite Users harsher reviewers than Non-Elite Users?</option>
              <option value="badges">Elite Status Badges: How many Elite Users have each badge? Red(1-4 years), Gold(5-9 years), Black(+10 years)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart and Table Section */}
      {/* <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Behavior Comparison Graph</h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed rounded">
          <span className="text-gray-500">[ Graph comparing elite vs non-elite users ]</span>
        </div> */}

        <h2 className="text-lg font-semibold mt-8 mb-4 text-black">User Behavior Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2 border-b text-left text-black capitalize">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-black">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-2 border-b">
                        {col.key === "is_elite"
                          ? row[col.key] === true
                          ? "Yes"
                          : "No"
                        : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      {/* </div> */}
    </PageLayout>
  );
};

export default UserBehavior;