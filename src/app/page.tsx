"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import DateInput from "@/components/DateInput";
import MilestoneResults from "@/components/MilestoneResults";

export default function Home() {
  const [dob, setDob] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <ThemeToggle />
      <h1 className="text-4xl font-bold mb-6">TimeStamp</h1>
      <DateInput onCalculate={setDob} />
      {dob && <MilestoneResults dob={dob} />}
    </main>
  );
}
