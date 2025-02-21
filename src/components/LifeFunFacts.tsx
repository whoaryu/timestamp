"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNowStrict } from "date-fns";

interface LifeFunFactsProps {
  dob: string;
}

export default function LifeFunFacts({ dob }: LifeFunFactsProps) {
  const birthDate = useMemo(() => new Date(dob), [dob]);
  const now = new Date();
  const ageInDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const ageInYears = Math.floor(ageInDays / 365);

  // Fun Facts
  const funFacts = useMemo(
    () => [
      { fact: "Your heart has beaten approximately", value: ageInDays * 100000, unit: "times ❤️" },
      { fact: "You've blinked around", value: ageInDays * 14400, unit: "times 👀" },
      { fact: "You've spent about", value: Math.floor(ageInDays * 0.33), unit: "days sleeping 😴" },
      { fact: "You've eaten approximately", value: ageInDays * 3, unit: "meals 🍕" },
      { fact: "You've walked around", value: ageInDays * 8000, unit: "steps 🚶‍♂️" },
    ],
    [ageInDays]
  );

  // Countdown to next milestones
  const milestones = [5000, 10000, 25000];
  const upcomingMilestone = milestones.find((milestone) => milestone > ageInDays);
  const milestoneDate = upcomingMilestone ? new Date(birthDate.getTime() + upcomingMilestone * 86400000) : null;
  const timeUntilMilestone = milestoneDate ? formatDistanceToNowStrict(milestoneDate) : null;

  // Countdown to next birthday
  const currentYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const nextBirthday = now > currentYearBirthday
    ? new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
    : currentYearBirthday;
  const timeUntilNextBday = formatDistanceToNowStrict(nextBirthday);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-8 p-8 w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 relative overflow-hidden"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-center tracking-wide bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text"
      >
        Your Life in Numbers ✨
      </motion.h2>
      
      <div className="space-y-4">
        {funFacts.map((fact, index) => (
          <motion.p 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-lg font-medium"
          >
            {fact.fact} <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{fact.value.toLocaleString()}</span> {fact.unit}
          </motion.p>
        ))}
      </div>
      
      {/* Countdown to Next Milestone */}
      {upcomingMilestone && timeUntilMilestone && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">⏳ Countdown to {upcomingMilestone} Days Old:</h3>
          <motion.p 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
            className="text-lg text-indigo-600 dark:text-indigo-400 font-bold mt-2"
          >
            {timeUntilMilestone} left!
          </motion.p>
        </div>
      )}
      
      {/* Countdown to Next Birthday */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-semibold">🎂 Next Birthday Countdown:</h3>
        <motion.p 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
          className="text-lg text-indigo-600 dark:text-indigo-400 font-bold mt-2"
        >
          {timeUntilNextBday} left!
        </motion.p>
      </div>
    </motion.div>
  );
}