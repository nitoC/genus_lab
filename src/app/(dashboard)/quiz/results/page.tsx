"use client";
import React, { Suspense, useState } from "react";

import LeaderboardTable from "@/components/LeaderboardTable";
import Back from "@/components/Buttons/Back";
import { Calendar, HStack } from "rsuite";
import "rsuite/dist/rsuite.css";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useParams, useSearchParams } from "next/navigation";

// Mock data
type QuizPerformance = { grade: string; ranking: string };

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
    username: "encodedMax",
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
    username: "codegenius",
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
    score: 70,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦500",
    totalEarned: "₦150,500",
    tier: "gold",
  },

  {
    rank: 7,
    username: "tarrantaula",
    state: "Abuja",
    score: 65,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦500",
    totalEarned: "₦120,500",
    tier: "gold",
  },
  {
    rank: 8,
    username: "uranium",
    state: "Edo",
    score: 60,
    time: "1m35s",
    accuracy: "60%",
    reward: "₦500",
    totalEarned: "₦150,500",
    tier: "gold",
  },
  {
    rank: 9,
    username: "sagatius",
    state: "Akure",
    score: 55,
    time: "2m35s",
    accuracy: "100%",
    reward: "₦500",
    totalEarned: "₦150,500",
    tier: "gold",
  },

  {
    rank: 5,
    username: "Geny",
    state: "Makurdi",
    score: 50,
    time: "2m35s",
    accuracy: "40%",
    reward: "₦500",
    totalEarned: "₦80,500",
    tier: "gold",
  },
];

const Results = () => {
  const episode = useSearchParams().get("episode");
  const [rankingFilter, setRankingFilter] = useState("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
                  Results Ranking for Episode {episode}
                </h2>
                <p className="text-gray-400 text-sm">
                  View the current standings based on performance.
                </p>
              </div>

              {/* Custom Dropdown */}
              {/* <div className="relative w-44">
                <h6 className="absolute z-10 w-full mt-2  border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                 
                </h6>
              </div> */}
            </div>

            {/* Rankings Table */}
            <LeaderboardTable max={10} />
          </div>
        </div>
      </div>
    </>
  );
};
const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
};
export default page;
