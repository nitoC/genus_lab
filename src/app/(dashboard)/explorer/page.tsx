"use client";
import React, { useState, useMemo, JSX, SVGProps } from "react";
// Load Tailwind CSS for styling and responsiveness
// import "tailwindcss/tailwind.css";

// --- START REACT ICON IMPORTS ---
import { FaChessKnight, FaCrown } from "react-icons/fa6";
import {
  SiClevercloud,
  SiCoolermaster,
  SiFusionauth,
  SiPrometheus,
} from "react-icons/si";
import { HiMiniCheckBadge } from "react-icons/hi2";
import {
  GiAllSeeingEye,
  GiBlackKnightHelm,
  GiBoxingGlove,
  GiBrainstorm,
  GiExplosionRays,
  GiGiftOfKnowledge,
  GiMiddleArrow,
  GiPsychicWaves,
  GiQuicksand,
  GiSoulVessel,
  GiSparkSpirit,
} from "react-icons/gi";
import { FaCentos, FaFacebookSquare, FaStar, FaTrophy } from "react-icons/fa";
import { FcMindMap } from "react-icons/fc";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For pagination controls
import { IoMdClose } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import RankTable from "@/components/RankTable";
import Link from "next/link";
// --- END REACT ICON IMPORTS ---

// --- HELPER FUNCTIONS ---

/**
 * Converts a number to Roman numerals.
 * @param {number} num The number to convert.
 * @returns {string} The Roman numeral representation.
 */
const toRoman = (num: number) => {
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};

// --- DATA STRUCTURE (REUSING ORIGINAL WITH REACT ICONS) ---

const leaderboardRanks = [
  {
    rank: 1,
    title: "Quiz Overlord",
    Icon: <FaCrown size={20} className="text-green-500" />,
    pointsRange: "2,000,000+",
  },
  {
    rank: 2,
    title: "Mastermind",
    Icon: <SiCoolermaster size={20} className="text-purple-600" />,
    pointsRange: "1,000,000 - 1,999,999",
  },
  {
    rank: 3,
    title: "Brainiac",
    Icon: <GiBrainstorm size={20} className="text-red-600" />,
    pointsRange: "500,000 – 999,999",
  },
  {
    rank: 4,
    title: "Quiz Pro",
    Icon: <SiPrometheus size={20} className="text-blue-500" />,
    pointsRange: "200,000 – 499,999",
  },
  {
    rank: 5,
    title: "Trivia Titan",
    Icon: <GiPsychicWaves size={20} className="text-green-500" />,
    pointsRange: "100,000 – 199,999",
  },
  {
    rank: 6,
    title: "Quiz Ace",
    Icon: <FaCentos size={20} className="text-green-700" />,
    pointsRange: "50,000 - 99,999",
  },
  {
    rank: 7,
    title: "Knowledge Knight",
    Icon: <FaChessKnight size={20} className="text-orange-500" />,
    pointsRange: "20,000 - 49,999",
  },
  {
    rank: 8,
    title: "Smart Cookie",
    Icon: (
      <GiBlackKnightHelm
        size={20}
        className="text-gray-900 dark:text-gray-300"
      />
    ),
    pointsRange: "10,000 - 19,999",
  },
  {
    rank: 9,
    title: "Sharp Thinker",
    Icon: <GiGiftOfKnowledge size={20} className="text-red-700" />,
    pointsRange: "8,000 - 9,999",
  },
  {
    rank: 10,
    title: "Clever Clog",
    Icon: <SiClevercloud size={20} className="text-green-400" />,
    pointsRange: "7,000 - 7,999",
  },
  {
    rank: 11,
    title: "Bright Spark",
    Icon: <GiSparkSpirit size={20} className="text-indigo-500" />,
    pointsRange: "6,000 - 9,999",
  },
  {
    rank: 12,
    title: "Quick Wits",
    Icon: <GiQuicksand size={20} className="text-blue-700" />,
    pointsRange: "5,000 - 5,999",
  },
  {
    rank: 13,
    title: "Keen Mind",
    Icon: <FcMindMap size={20} />,
    pointsRange: "4,000 - 4,999",
  },
  {
    rank: 14,
    title: "Inquisitive Soul",
    Icon: <GiSoulVessel size={20} className="text-purple-500" />,
    pointsRange: "3,600 - 3,999",
  },
  {
    rank: 15,
    title: "Curious Cat",
    Icon: <FaUsers size={20} className="text-pink-600" />,
    pointsRange: "3,200 - 3,599",
  },
  {
    rank: 16,
    title: "Eager Learner",
    Icon: <GiMiddleArrow size={20} className="text-green-600" />,
    pointsRange: "3,000 - 3,199",
  },
  {
    rank: 17,
    title: "Knowledge Seeker",
    Icon: <GiAllSeeingEye size={20} className="text-brown-700" />,
    pointsRange: "2,800 - 2,999",
  },
  {
    rank: 18,
    title: "Aspiring Expert",
    Icon: <GiExplosionRays size={20} className="text-teal-500" />,
    pointsRange: "2,000 - 2,799",
  },
  {
    rank: 19,
    title: "Rising Star",
    Icon: <GiBoxingGlove size={20} className="text-orange-400" />,
    pointsRange: "1,500 - 1,999",
  },
  {
    rank: 20,
    title: "Fresh Mind",
    Icon: <HiMiniCheckBadge size={20} className="text-green-300" />,
    pointsRange: "0 – 1,499",
  },
];

const ITEMS_PER_PAGE = 5;

// --- TABLE ROW COMPONENT ---

const RankTableRow = ({ item, onClick }: any) => {
  const isTopTier = item.rank <= 3;
  const isRankOne = item.rank === 1;

  // Row styling
  const rowClasses = isTopTier
    ? "bg-green-50/70 dark:bg-green-900/40 border-l-0 border-green-500"
    : "bg-white dark:bg-gray-800 border-l-0 border-transparent";

  const rankTextClass = isRankOne
    ? "text-2xl font-extrabold text-green-500"
    : "text-xl font-bold text-gray-600 dark:text-gray-300";

  return (
    <tr
      onClick={() => onClick(item)}
      className={`group ${rowClasses} transition-all duration-200 ease-in-out cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 rounded-lg`}
    >
      <td className="py-4 px-6 text-center w-1/5">
        <div className="flex flex-col items-center">
          <span className={rankTextClass}>{toRoman(item.rank)}</span>
          <span className="text-xs text-gray-400">#{item.rank}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-left w-2/5">
        <div className="flex items-center gap-3">
          {item.Icon}
          <span className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {item.title}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 text-right font-medium text-gray-600 dark:text-gray-300 w-2/5">
        {item.pointsRange}
      </td>
    </tr>
  );
};

// --- MAIN APP COMPONENT (ExploralPage equivalent) ---

const exploral = () => {
  // State for the modal
  const [showRankModal, setShowRankModal] = useState(false);
  const [selectedRankData, setSelectedRankData] = useState<{
    rank: number;
    Icon: any;
    title: string;
  } | null>(null);

  // State for pagination (using the requested startIndex equivalent)
  const [startIndex, setStartIndex] = useState(0);

  // Custom SVG Icons from the original code (retained for dashboard sections)
  const FacebookIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.04c-5.5 0-10 4.49-10 10s4.5 10 10 10 10-4.49 10-10-4.5-10-10-10zm1.6 11.45h-1.3v5.51h-2.3v-5.51h-1.1v-2.04h1.1v-1.5c0-1.07.5-2.79 2.7-2.79h1.8v2.04h-1.2c-.3 0-.7.15-.7.7v1.46h1.9l-.3 2.04z" />
    </svg>
  );

  const StarIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  // Pagination Logic
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRanks = useMemo(() => {
    return leaderboardRanks.slice(startIndex, endIndex);
  }, [startIndex]);

  const totalItems = leaderboardRanks.length;

  const handleRankClick = (item: any) => {
    setSelectedRankData(item);
    setShowRankModal(true);
  };

  const handleCloseModal = () => {
    setShowRankModal(false);
    setSelectedRankData(null);
  };

  const handleNextPage = () => {
    if (startIndex < totalItems - ITEMS_PER_PAGE) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  // Helper classes for pagination buttons
  const baseButtonClasses =
    "p-2 rounded-full transition-all duration-300 flex items-center justify-center";
  const activeClasses =
    "bg-indigo-600 text-white shadow-md hover:bg-indigo-700";
  const disabledClasses = "bg-gray-200 text-gray-400 cursor-not-allowed";

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
        {/* Top Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Quizzes */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Upcoming Quizzes
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-green-400/20 p-6 rounded-lg flex flex-col items-center justify-center text-green-800 dark:text-green-300">
                <span className="text-6xl font-black mb-2">?</span>
                <p className="text-sm font-semibold">History Buffs Challenge</p>
              </div>
              <div className="flex-1 bg-blue-400/20 p-6 rounded-lg flex flex-col items-center justify-center text-blue-800 dark:text-blue-300">
                <div className="text-6xl font-black flex gap-2">
                  <span className="bg-white/50 dark:bg-black/30 p-2 rounded-lg">
                    Q
                  </span>
                  <span className="bg-white/50 dark:bg-black/30 p-2 rounded-lg">
                    A
                  </span>
                </div>
                <p className="text-sm font-semibold mt-2">
                  Science Whiz Showdown
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm dark:text-gray-400">
              Engage in thrilling quizzes and expand your knowledge.
            </p>
          </div>

          {/* Project Updates */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-pink-600 dark:text-pink-400">
              Project Updates
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              New Features and Improvements
            </p>
            <div className="mt-auto overflow-hidden">
              <img
                src="https://placehold.co/400x200/3b82f6/ffffff?text=New+UI+Design"
                className="rounded-lg object-cover w-full h-24 transition-transform duration-500 hover:scale-105"
                alt="Project Update"
              />
            </div>
          </div>

          {/* Previous quizzes */}
          <Link
            href="/quiz/previous"
            className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Previous Quizzes
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-green-400/20 p-6 rounded-lg flex flex-col items-center justify-center text-green-800 dark:text-green-300">
                <span className="text-6xl font-black mb-2">
                  <FaTrophy size={20} />
                </span>
                <p className="text-sm font-semibold">Math Olympiad Results</p>
              </div>
              <div className="flex-1 bg-red-400/20 p-6 rounded-lg flex flex-col items-center justify-center text-red-800 dark:text-red-300">
                <span className="text-6xl font-black mb-2">
                  <SiFusionauth size={20} />
                </span>
                <p className="text-sm font-semibold">Chemistry Championship</p>
              </div>
            </div>
            <p className="mt-4 text-sm dark:text-gray-400">
              Review past performance and learn from top players.
            </p>
          </Link>

          {/* Tech News */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">
              Tech News
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              Latest Tech Trends
            </p>
            <div className="mt-auto overflow-hidden">
              <img
                src="https://placehold.co/400x200/1e40af/ffffff?text=AI+Developments"
                className="rounded-lg object-cover w-full h-24 transition-transform duration-500 hover:scale-105"
                alt="Tech News"
              />
            </div>
          </div>

          {/* Studio Quiz Winner */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
              Studio Quiz Winner
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              Congratulations to Evelyn S.
            </p>
            <div className="mt-auto overflow-hidden">
              <img
                src="https://placehold.co/400x200/ca8a04/ffffff?text=Winner+Announced"
                className="rounded-lg object-cover w-full h-24 transition-transform duration-500 hover:scale-105"
                alt="Winner"
              />
            </div>
          </div>

          {/* Social Media & Announcements */}
          <div className="grid grid-rows-2 gap-6">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center shadow-xl">
              <h3 className="text-md font-semibold mb-2 dark:text-white">
                Social Media
              </h3>
              <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                <FaFacebookSquare className="h-8 w-8 hover:text-blue-600 cursor-pointer transition-colors" />
                <FaStar className="h-8 w-8 hover:text-green-500 cursor-pointer transition-colors" />
                <FaStar className="h-8 w-8 hover:text-green-500 cursor-pointer transition-colors" />
                <FaStar className="h-8 w-8 hover:text-green-500 cursor-pointer transition-colors" />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4 shadow-xl">
              <div className="flex-grow">
                <h3 className="text-md font-semibold dark:text-white">
                  Latest Announcements
                </h3>
                <p className="text-sm dark:text-gray-400">
                  New Quiz Categories Added!
                </p>
              </div>
              <img
                src="https://placehold.co/100x100/34d399/ffffff?text=Announce"
                className="rounded-lg w-16 h-16 object-cover"
                alt="Announcement"
              />
            </div>
          </div>
        </div>

        {/* --- Leaderboard Rank Table (The Replaced Section) --- */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
          {/* Header and Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 w-full gap-4">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Leaderboard Ranks & Points
            </h3>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:inline">
                Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of{" "}
                {totalItems}
              </span>

              <button
                disabled={startIndex === 0}
                onClick={handlePrevPage}
                className={`${baseButtonClasses} ${
                  startIndex === 0 ? disabledClasses : activeClasses
                }`}
                aria-label="Previous Page"
              >
                <FaArrowLeft size={14} />
              </button>

              <button
                disabled={startIndex >= totalItems - ITEMS_PER_PAGE}
                onClick={handleNextPage}
                className={`${baseButtonClasses} ${
                  startIndex >= totalItems - ITEMS_PER_PAGE
                    ? disabledClasses
                    : activeClasses
                }`}
                aria-label="Next Page"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Rank Table Structure */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm table-fixed border-collapse">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-t-xl">
                <tr>
                  <th className="py-3 px-6 w-1/5 text-center">Rank</th>
                  <th className="py-3 px-4 w-2/5 text-left">Title & Icon</th>
                  <th className="py-3 px-4 w-2/5 text-right">Points Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentRanks.map((item) => (
                  <RankTableRow
                    key={item.rank}
                    item={item}
                    onClick={handleRankClick} // Implements rankItem click logic
                  />
                ))}
              </tbody>
            </table>
            {currentRanks.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                No ranks available to display on this page.
              </p>
            )}
          </div>
        </div>

        {/* Render the Rank Detail Modal */}
        {showRankModal && selectedRankData && (
          <RankTable
            rank={`${toRoman(selectedRankData?.rank)} ${
              selectedRankData?.title
            }`}
            rankIcon={selectedRankData?.Icon}
            dtheme={() => {}}
            // rankData={selectedRankData}
            handleClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default exploral;
