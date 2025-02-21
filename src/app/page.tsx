"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import DateInput from "@/components/DateInput";
import MilestoneResults from "@/components/MilestoneResults";
// import LifeHeatmap from "@/components/LifeHeatmap";
import BirthdayTwins from "@/components/BirthdayTwins";
import { motion } from "framer-motion";
import LifeStats from "@/components/LifeStats";

export default function Home() {
  const [dob, setDob] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white">
      <ThemeToggle />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-400"
      >
        TimeStamp ⏳
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 backdrop-blur-md bg-opacity-80 dark:bg-opacity-75 shadow-2xl rounded-3xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <DateInput onCalculate={setDob} />
      </motion.div>

      {dob && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-8 w-full max-w-xl mt-10"
        >
          <MilestoneResults dob={dob} />
          {/* <LifeHeatmap dob={dob} /> */}
          <BirthdayTwins dob={dob} />
          {/* <LifeStats dob={dob} /> */}

        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-10 text-gray-600 dark:text-gray-400 text-sm text-center"
      >
        Built with ❤️ by Aryan Shah
      </motion.p>
    </main>
  );
}
