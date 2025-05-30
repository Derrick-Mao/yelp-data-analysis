"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Clickable Title */}
        <Link href="/" className="text-red-600 text-2xl font-bold hover:text-red-700 cursor-pointer">
          Yelp Data Analysis
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/anomaly" className="text-gray-700 hover:text-red-600">
            Anomalies
          </Link>
          <Link href="/popularity" className="text-gray-700 hover:text-red-600">
            Season Popularity
          </Link>
          <Link href="/area" className="text-gray-700 hover:text-red-600">
            Area Popularity
          </Link>
          <Link href="/behavior" className="text-gray-700 hover:text-red-600">
            Elite vs Non-Elite
          </Link>
          <Link href="/phrase" className="text-gray-700 hover:text-red-600">
            Top Phrases
          </Link>
        </nav>
      </div>
    </header>
  );
}
