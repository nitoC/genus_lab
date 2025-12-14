"use client";
import React, { useState } from "react";
import { Calendar, HStack } from "rsuite";
import "rsuite/dist/rsuite.css";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";

// Mock data
type QuizPerformance = { grade: string; ranking: string };
const quizData: { [date: string]: QuizPerformance } = {
  "2025-10-05": { grade: "85%", ranking: "12th" },
  "2025-10-06": { grade: "92%", ranking: "8th" },
  "2025-10-07": { grade: "78%", ranking: "25th" },
};

const userRankings = [
  {
    rank: 1,
    username: "Udochukwu",
    state: "OYO",
    score: 140,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦1,000",
    totalEarned: "₦194,500",
    tier: "platinum",
  },
  {
    rank: 2,
    username: "uxBoss",
    state: "Lagos",
    score: 120,
    time: "3m10s",
    accuracy: "95%",
    reward: "₦800",
    totalEarned: "₦183,500",
    tier: "gold",
  },
  {
    rank: 3,
    username: "codeuen",
    state: "Enugu",
    score: 100,
    time: "3m45s",
    accuracy: "93%",
    reward: "₦700",
    totalEarned: "₦170,500",
    tier: "gold",
  },
  {
    rank: 4,
    username: "pixelPilot",
    state: "Oyo",
    score: 80,
    time: "4m00s",
    accuracy: "93%",
    reward: "₦600",
    totalEarned: "₦164,500",
    tier: "silver",
  },
  {
    rank: 5,
    username: "pixelPilot",
    state: "Abuja",
    score: 75,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦500",
    totalEarned: "₦150,500",
    tier: "gold",
  },
  {
    rank: 6,
    username: "pixelPilot",
    state: "Abuja",
    score: 75,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦500",
    totalEarned: "₦150,500",
    tier: "gold",
  },
];

export default function LeaderRanking() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-10-05"));
  const [rankingFilter, setRankingFilter] = useState("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (value: string) => {
    setRankingFilter(value);
    setDropdownOpen(false);
  };

  const getPerformanceForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return quizData[dateStr] || { grade: "-", ranking: "-" };
  };

  const customHeader = (props: any) => {
    const { date, onPrevMonth, onNextMonth } = props;
    return (
      <div className="flex justify-between items-center py-2 px-4 dark:bg-gray-900 text-white">
        <FaChevronLeft onClick={onPrevMonth} className="cursor-pointer" />
        <span className="text-lg font-bold">
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <FaChevronRight onClick={onNextMonth} className="cursor-pointer" />
      </div>
    );
  };

  return (
    <>
      {/* Rankings Table */}
      <div className="overflow-x-auto hori-scroll border border-gray-300/50 rounded-lg">
        <table className="min-w-[700px] w-full text-sm text-left dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase text-xs sm:text-sm">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Username</th>
              <th className="p-3">State</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Score</th>
              <th className="p-3">Time</th>
              <th className="p-3">Accuracy</th>
              <th className="p-3">Reward</th>
              <th className="p-3">Total Earned</th>
            </tr>
          </thead>
          <tbody>
            {userRankings.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <td className="p-3 font-semibold text-center">{user.rank}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/24?img=${index + 10}`}
                    alt={user.username}
                    className="w-6 h-6 rounded-full border border-gray-400 dark:border-gray-600"
                  />
                  {user.username}
                </td>
                <td className="p-3 text-gray-400">{user.state}</td>
                <td className="p-3 text-blue-400 font-bold">{user.tier}</td>
                <td className="p-3">{user.score}</td>
                <td className="p-3">{user.time}</td>
                <td className="p-3">{user.accuracy}</td>
                <td className="p-3 text-green-500 font-bold">{user.reward}</td>
                <td className="p-3 text-gray-400">{user.totalEarned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button className="px-4 py-2 border border-gray-400 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
          Previous
        </button>
        <button className="px-4 py-2 border border-gray-400 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
          Next
        </button>
      </div>
    </>
  );
}
