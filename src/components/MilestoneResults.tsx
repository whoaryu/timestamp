"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Copy } from "lucide-react";

interface MilestoneResultsProps {
  dob: string;
}

export default function MilestoneResults({ dob }: MilestoneResultsProps) {
  const [milestones, setMilestones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

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
  }, [dob]);

  const handleCopy = () => {
    const textToCopy = milestones.join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
        <Calendar className="text-blue-500" size={24} /> Your Milestones
      </h2>

      <ul className="mt-4 space-y-3">
  {milestones.map((milestone, index) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="flex items-start gap-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
    >
      <CheckCircle className="text-green-500 mt-1" size={20} />
      <span dangerouslySetInnerHTML={{ __html: milestone.replace(/(\d{1,5}) days old/, "<strong>$1 days old</strong>") }} />
    </motion.li>
  ))}
</ul>


      <button
        onClick={handleCopy}
        className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg hover:opacity-80 transition-all shadow-md"
      >
        <Copy size={20} /> {copied ? "Copied!" : "Copy Milestones"}
      </button>
    </motion.div>
  );
}
