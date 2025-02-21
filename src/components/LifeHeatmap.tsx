"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

interface LifeHeatmapProps {
  dob: string;
}

const TOTAL_WEEKS = 80 * 52; // Approximate number of weeks in an 80-year lifespan

export default function LifeHeatmap({ dob }: LifeHeatmapProps) {
  const [weeksLived, setWeeksLived] = useState(0);

  useEffect(() => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    const diffWeeks = Math.floor(
      (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );

    setWeeksLived(diffWeeks);
  }, [dob]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
        <CalendarDays className="text-purple-500" size={24} />
        Weekly Life Heatmap
      </h2>

      <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
        Each square represents **one week** of an average 80-year life.
      </p>

      {/* HEATMAP CONTAINER WITH SCROLL SUPPORT */}
      <div className="mt-5 overflow-x-auto w-full">
        <div className="grid grid-cols-[repeat(52,minmax(5px,1fr))] gap-0.5 min-w-[280px]">
          {[...Array(TOTAL_WEEKS)].map((_, index) => {
            let bgColor = "bg-gray-300 dark:bg-gray-700"; // Future weeks (default gray)
            if (index < weeksLived) bgColor = "bg-green-500"; // Weeks already lived
            if (index === weeksLived) bgColor = "bg-red-500"; // Current week (red)

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.002 }}
                className={`w-2 h-2 rounded-sm ${bgColor}`}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        ⏳ You have lived **{weeksLived} weeks**. Around **{TOTAL_WEEKS - weeksLived} weeks** remain.
      </p>
    </motion.div>
  );
}
