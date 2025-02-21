"use client";

import { useState } from "react";

interface DateInputProps {
  onCalculate: (dob: string) => void;
}

export default function DateInput({ onCalculate }: DateInputProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !month || !year) {
      setError("⚠️ Please select a valid date.");
      return;
    }
    setError("");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    onCalculate(formattedDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md transition-all"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Enter Your Date of Birth</h2>

      <div className="flex gap-4 w-full justify-center">
        {/* Day Dropdown */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-1/3 p-3 text-lg font-semibold rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Day</option>
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-1/3 p-3 text-lg font-semibold rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-1/3 p-3 text-lg font-semibold rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Year</option>
          {[...Array(100)].map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={String(y)}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <button
        type="submit"
        className="mt-4 w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-md"
      >
        Calculate
      </button>
    </form>
  );
}
