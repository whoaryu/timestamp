"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Copy, Star } from "lucide-react";

interface MilestoneResultsProps {
  dob: string;
}

export default function MilestoneResults({ dob }: MilestoneResultsProps) {
  const [milestones, setMilestones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [zodiacSign, setZodiacSign] = useState<string | null>(null);

  useEffect(() => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    const milestoneDays = [1000, 5000, 10000, 25000];
    const results = [];

    results.push(`🎉 You were born on ${birthDate.toDateString()}.`);

    milestoneDays.forEach((days) => {
      const milestoneDate = new Date(birthDate.getTime() + days * 24 * 60 * 60 * 1000);
      if (milestoneDate < today) {
        results.push(`✅ You turned ${days} days old on ${milestoneDate.toDateString()}.`);
      } else {
        results.push(`🔜 You will turn ${days} days old on ${milestoneDate.toDateString()}.`);
      }
    });

    results.push(`📅 You are currently ${diffDays} days old.`);

    setMilestones(results);
    setZodiacSign(getZodiacSign(birthDate));
  }, [dob]);

  const handleCopy = () => {
    const textToCopy = milestones.join("\n") + `\nYour Zodiac Sign: ${zodiacSign}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function getZodiacSign(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based in JS

    const zodiacSigns = [
      { sign: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20] },
      { sign: "Aries", symbol: "♈", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22] },
      { sign: "Leo", symbol: "♌", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22] },
      { sign: "Libra", symbol: "♎", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] },
    ];

    for (const { sign, symbol, start, end } of zodiacSigns) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return `${sign} ${symbol}`;
      }
    }

    return "Unknown";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-8 bg-white dark:bg-gray-900 backdrop-blur-md bg-opacity-80 dark:bg-opacity-75 shadow-2xl rounded-3xl max-w-lg w-full border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
        <Calendar className="text-blue-500" size={28} /> Your Milestones
      </h2>

      {/* Zodiac Sign */}
      {zodiacSign && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex items-center gap-3 bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-lg"
        >
          <Star className="text-yellow-500" size={24} />
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Your Zodiac Sign: <span className="font-bold">{zodiacSign}</span>
          </span>
        </motion.div>
      )}

      {/* Milestones List */}
      <ul className="mt-6 space-y-3">
        {milestones.map((milestone, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-start gap-3 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
          >
            <CheckCircle className="text-green-500 mt-1" size={22} />
            <span dangerouslySetInnerHTML={{ __html: milestone.replace(/(\d{1,5}) days old/, "<strong>$1 days old</strong>") }} />
          </motion.li>
        ))}
      </ul>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="mt-6 flex items-center justify-center gap-2 w-full px-5 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg hover:scale-105 transition-all shadow-md"
      >
        <Copy size={22} /> {copied ? "Copied!" : "Copy Milestones"}
      </button>
    </motion.div>
  );
}
