"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import DateInput from "@/components/DateInput";
import MilestoneResults from "@/components/MilestoneResults";
// import LifeHeatmap from "@/components/LifeHeatmap";
import BirthdayTwins from "@/components/BirthdayTwins";

export default function Home() {
  const [dob, setDob] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <ThemeToggle />
      <h1 className="text-4xl font-bold mb-6 text-center">TimeStamp</h1>
      <DateInput onCalculate={setDob} />

      {dob && (
        <div className="flex flex-col items-center gap-8 w-full max-w-xl mt-8">
          <MilestoneResults dob={dob} />
          {/* <LifeHeatmap dob={dob} /> */}
          <BirthdayTwins dob={dob} />
        </div>
      )}
    </main>
  );
}
