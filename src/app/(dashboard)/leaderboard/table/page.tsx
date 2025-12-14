"use client";
import React, { useState } from "react";

import LeaderboardTable from "@/components/LeaderboardTable";
import Back from "@/components/Buttons/Back";
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

const page = () => {
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
      <Back />
      <div className="flex flex-col lg:flex-row items-start min-h-screen dark:bg-black/40 dark:text-gray-200 p-4 sm:p-6 lg:p-8 gap-6">
        {/* Left/Main Section */}
        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start">
          {/* User Rankings Header */}
          <div className="w-full mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white">
                  User Rankings
                </h2>
                <p className="text-gray-400 text-sm">
                  View the current standings based on performance.
                </p>
              </div>

              {/* Custom Dropdown */}
              <div className="relative w-44">
                <button
                  onClick={toggleDropdown}
                  className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200"
                >
                  {rankingFilter}
                  <FaChevronDown
                    className={`ml-2 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    {["Daily", "Weekly", "Monthly"].map((item) => (
                      <div
                        key={item}
                        onClick={() => selectFilter(item)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          rankingFilter === item
                            ? "font-bold text-blue-500"
                            : "text-gray-600 dark:text-gray-200"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rankings Table */}
            <LeaderboardTable />
          </div>
        </div>
        {/* Sidebar Section */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          {/* Performance Calendar */}
          <div className="dark:bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h5 className="font-bold mb-4">Your Quiz Performance</h5>
            <HStack spacing={10} alignItems="flex-start">
              <Calendar compact onSelect={(d: Date) => setSelectedDate(d)} />
            </HStack>
          </div>

          {/* Weekly Winner */}
          <div className="dark:bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h5 className="font-bold mb-4">Weekly Winner</h5>
            <div className="mb-4">
              <span className="text-green-500 font-bold text-lg">bobby l</span>
              <p className="dark:text-white">
                Score: <span className="font-bold text-lg">95%</span>
              </p>
              <p className="dark:text-white">
                Accuracy: <span className="font-bold text-lg">+99%</span>
              </p>
            </div>
            <div className="flex justify-around items-end h-32 space-x-2">
              <div className="w-1/4 h-full bg-blue-500 rounded-t-full"></div>
              <div className="w-1/4 h-3/4 bg-blue-500 rounded-t-full"></div>
              <div className="w-1/4 h-1/2 bg-blue-500 rounded-t-full"></div>
              <div className="w-1/4 h-1/4 bg-blue-500 rounded-t-full"></div>
            </div>
            <div className="flex justify-around mt-2">
              <span className="text-xs text-gray-400">bobby l</span>
              <span className="text-xs text-gray-400">Emma</span>
              <span className="text-xs text-gray-400">Udred</span>
              <span className="text-xs text-gray-400">chilbyk</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
