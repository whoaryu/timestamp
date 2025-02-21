"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface LifeStatsProps {
  dob: string;
}

export default function LifeStats({ dob }: LifeStatsProps) {
  const birthDate = useMemo(() => new Date(dob), [dob]);
  const age = useMemo(() => {
    const now = new Date();
    return now.getFullYear() - birthDate.getFullYear();
  }, [birthDate]);

  const avgLifespan = 80; // Assume 80 years as average lifespan
  const totalDaysLived = age * 365;
  //const totalDaysInLife = avgLifespan * 365;

  // **Breakdown (approximate averages)**
  const lifeStats = [
    { name: "Sleep", value: totalDaysLived * 0.33, color: "#8B5CF6" }, // 33% of life
    { name: "Work/Study", value: totalDaysLived * 0.25, color: "#EC4899" }, // 25% of life
    { name: "Eating", value: totalDaysLived * 0.07, color: "#FCD34D" }, // 7%
    { name: "Entertainment", value: totalDaysLived * 0.15, color: "#60A5FA" }, // 15%
    { name: "Exercise/Leisure", value: totalDaysLived * 0.1, color: "#34D399" }, // 10%
    { name: "Other (Travel, Chores, etc.)", value: totalDaysLived * 0.1, color: "#F87171" }, // 10%
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-8 p-8 max-w-lg w-full bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-800 dark:from-purple-900 dark:to-indigo-900 rounded-2xl shadow-lg border border-purple-400/30 dark:border-purple-600/50 backdrop-blur-lg text-white"
    >
      <h2 className="text-2xl font-extrabold text-white mb-4 text-center">How Have You Spent Your Life? ⏳</h2>

      {/* PIE CHART */}
      <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={lifeStats}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
    >
      {lifeStats.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
    <Tooltip
      contentStyle={{
        backgroundColor: "rgba(0,0,0,0.8)", // Dark semi-transparent background
        color: "#ffffff", // White text for readability
        borderRadius: "8px",
        padding: "10px",
        border: "1px solid rgba(255,255,255,0.2)", // Soft border
      }}
    />
  </PieChart>
</ResponsiveContainer>


      {/* LIFE INSIGHTS */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">You have lived <span className="text-yellow-300">{totalDaysLived.toLocaleString()}</span> days!</p>
        <p className="mt-2 text-md text-gray-200">
          You've **slept** for <span className="text-pink-300">{Math.floor(lifeStats[0].value)} days</span> so far! 😴  
        </p>
        <p className="mt-2 text-md text-gray-200">
          That's about <span className="text-blue-300">{(lifeStats[0].value / 365).toFixed(1)} years</span> of just sleeping!
        </p>
      </div>
    </motion.div>
  );
}
