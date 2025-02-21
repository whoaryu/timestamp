"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface BirthdayTwinsProps {
  dob: string;
}

interface Celebrity {
  name: string;
  profession: string;
  birthYear: number;
  description: string;
}

// Define API response structure
interface ApiResponse {
  births?: {
    text: string;
    year: number;
    pages?: { description?: string; extract?: string }[];
  }[];
}

export default function BirthdayTwins({ dob }: BirthdayTwinsProps) {
  const [twins, setTwins] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (!data.births) throw new Error("No data found.");

        // Extract relevant details, preferring well-known figures
        const famousPeople = data.births
          .filter((person) => person.pages?.[0]?.description)
          .slice(0, 2) // Pick the 2 most notable ones
          .map((person) => ({
            name: person.text,
            profession: person.pages?.[0]?.description || "Notable figure",
            birthYear: person.year,
            description: person.pages?.[0]?.extract || "",
          }));

        setTwins(famousPeople);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch famous birthdays.");
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, [dob]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-6 p-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl max-w-lg w-full"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
        <Users className="text-yellow-500" size={24} />
        Your Birthday Twin 🎂
      </h2>

      {loading ? (
        <p className="mt-4 text-gray-700 dark:text-gray-300">Fetching famous birthdays...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : twins.length > 0 ? (
        <div className="mt-4 space-y-3">
          {twins.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex flex-col"
            >
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {person.name} ({person.birthYear})
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {person.profession}
              </span>
              <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm">
                {person.description}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          No famous birthday twins found! But that makes you unique! 🌟
        </p>
      )}
    </motion.div>
  );
}
