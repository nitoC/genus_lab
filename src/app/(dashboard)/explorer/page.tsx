"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

/* -------------------------------- ICONS -------------------------------- */
import {
  FaChessKnight,
  FaCrown,
  FaArrowLeft,
  FaArrowRight,
  FaUsers,
  FaFacebookSquare,
  FaStar,
  FaTrophy,
  FaCentos,
} from "react-icons/fa";
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
import { FcMindMap } from "react-icons/fc";
import { IoMdLock } from "react-icons/io";
import {
  SiClevercloud,
  SiCoolermaster,
  SiFusionauth,
  SiPrometheus,
} from "react-icons/si";

import RankTable from "@/components/RankTable";
import { LockedRankModal } from "@/components/modals/RankModal";

/* -------------------------------- HELPERS -------------------------------- */
export const toRoman = (num: number) => {
  const map = [
    { v: 1000, s: "M" },
    { v: 900, s: "CM" },
    { v: 500, s: "D" },
    { v: 400, s: "CD" },
    { v: 100, s: "C" },
    { v: 90, s: "XC" },
    { v: 50, s: "L" },
    { v: 40, s: "XL" },
    { v: 10, s: "X" },
    { v: 9, s: "IX" },
    { v: 5, s: "V" },
    { v: 4, s: "IV" },
    { v: 1, s: "I" },
  ];
  let r = "";
  for (const { v, s } of map) while (num >= v) (r += s), (num -= v);
  return r;
};

/* -------------------------------- DATA -------------------------------- */
const leaderboardRanks = [
  {
    rank: 20,
    title: "Fresh Mind",
    pointsToUnlock: 21_000,
    cashReward: 100_000,
    Icon: <HiMiniCheckBadge size={23} className="text-green-300" />,
  },
  {
    rank: 19,
    title: "Rising Star",
    pointsToUnlock: 63_000,
    cashReward: 200_000,
    Icon: <GiBoxingGlove size={23} className="text-orange-400" />,
  },
  {
    rank: 18,
    title: "Aspiring Expert",
    pointsToUnlock: 126_000,
    cashReward: 400_000,
    Icon: <GiExplosionRays size={23} className="text-teal-500" />,
  },
  {
    rank: 17,
    title: "Knowledge Seeker",
    pointsToUnlock: 210_000,
    cashReward: 600_000,
    Icon: <GiAllSeeingEye size={23} className="text-brown-700" />,
  },
  {
    rank: 16,
    title: "Eager Learner",
    pointsToUnlock: 315_000,
    cashReward: 900_000,
    Icon: <GiMiddleArrow size={23} className="text-green-600" />,
  },
  {
    rank: 15,
    title: "Curious Cat",
    pointsToUnlock: 450_000,
    cashReward: 1_200_000,
    Icon: <FaUsers size={23} className="text-pink-600" />,
  },
  {
    rank: 14,
    title: "Inquisitive Soul",
    pointsToUnlock: 630_000,
    cashReward: 1_500_000,
    Icon: <GiSoulVessel size={23} className="text-purple-500" />,
  },
  {
    rank: 13,
    title: "Keen Mind",
    pointsToUnlock: 840_000,
    cashReward: 1_800_000,
    Icon: <FcMindMap size={23} />,
  },
  {
    rank: 12,
    title: "Quick Wits",
    pointsToUnlock: 1_050_000,
    cashReward: 2_200_000,
    Icon: <GiQuicksand size={23} className="text-blue-700" />,
  },
  {
    rank: 11,
    title: "Bright Spark",
    pointsToUnlock: 1_260_000,
    cashReward: 2_500_000,
    Icon: <GiSparkSpirit size={23} className="text-indigo-500" />,
  },
  {
    rank: 10,
    title: "Clever Clog",
    pointsToUnlock: 1_500_000,
    cashReward: 2_800_000,
    Icon: <SiClevercloud size={23} className="text-green-400" />,
  },
  {
    rank: 9,
    title: "Sharp Thinker",
    pointsToUnlock: 1_800_000,
    cashReward: 3_200_000,
    Icon: <GiGiftOfKnowledge size={23} className="text-red-700" />,
  },
  {
    rank: 8,
    title: "Smart Cookie",
    pointsToUnlock: 2_100_000,
    cashReward: 3_600_000,
    Icon: (
      <GiBlackKnightHelm
        size={23}
        className="text-gray-900 dark:text-gray-300"
      />
    ),
  },
  {
    rank: 7,
    title: "Knowledge Knight",
    pointsToUnlock: 2_400_000,
    cashReward: 4_000_000,
    Icon: <FaChessKnight size={23} className="text-orange-500" />,
  },
  {
    rank: 6,
    title: "Quiz Ace",
    pointsToUnlock: 2_700_000,
    cashReward: 4_400_000,
    Icon: <FaCentos size={23} className="text-green-700" />,
  },
  {
    rank: 5,
    title: "Trivia Titan",
    pointsToUnlock: 3_000_000,
    cashReward: 4_800_000,
    Icon: <GiPsychicWaves size={23} className="text-green-500" />,
  },
  {
    rank: 4,
    title: "Quiz Pro",
    pointsToUnlock: 3_300_000,
    cashReward: 5_200_000,
    Icon: <SiPrometheus size={23} className="text-blue-500" />,
  },
  {
    rank: 3,
    title: "Brainiac",
    pointsToUnlock: 3_600_000,
    cashReward: 5_600_000,
    Icon: <GiBrainstorm size={23} className="text-red-600" />,
  },
  {
    rank: 2,
    title: "Mastermind",
    pointsToUnlock: 4_000_000,
    cashReward: 6_500_000,
    Icon: <SiCoolermaster size={23} className="text-purple-600" />,
  },
  {
    rank: 1,
    title: "Quiz Overlord",
    pointsToUnlock: 5_000_000,
    cashReward: 10_000_000,
    Icon: <FaCrown size={23} className="text-green-500" />,
  },
];

const ITEMS_PER_PAGE = 5;

/* ----------------------------- ROW ----------------------------- */
const RankTableRow = ({ item, onClick }: any) => {
  const locked = item.rank !== 20;
  return (
    <tr
      onClick={() => onClick(item)}
      className={`transition text-[1.2rem] ${
        locked
          ? "opacity-50 cursor-not-allowed hover:bg-red-50/40"
          : "cursor-pointer hover:bg-indigo-50/50"
      }`}
    >
      <td className="py-4 px-6 text-center font-bold">{toRoman(item.rank)}</td>
      <td className="py-4 px-4 flex items-center gap-3">
        {item.Icon}
        <span className="font-semibold">{item.title}</span>
        {locked && <IoMdLock className="text-red-500" />}
      </td>
      <td className="py-4 px-4 text-right font-semibold">
        {item.pointsToUnlock.toLocaleString()}
      </td>
    </tr>
  );
};

/* -------------------------------- PAGE -------------------------------- */
const exploral = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedRank, setSelectedRank] = useState<any>(null);
  const [showLocked, setShowLocked] = useState(false);
  const [showRank, setShowRank] = useState(false);

  const totalItems = leaderboardRanks.length;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentRanks = useMemo(
    () => leaderboardRanks.slice(startIndex, endIndex),
    [startIndex]
  );

  const handleRankClick = (item: any) => {
    setSelectedRank(item);
    item.rank === 20 ? setShowRank(true) : setShowLocked(true);
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

  const baseButtonClasses =
    "p-2 rounded-full transition-all duration-300 flex items-center justify-center";
  const activeClasses =
    "bg-indigo-600 text-white shadow-md hover:bg-indigo-700";
  const disabledClasses = "bg-gray-200 text-gray-400 cursor-not-allowed";

  return (
    <>
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
          {/* ================= DASHBOARD CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Quizzes */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                Upcoming Quizzes
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 bg-green-400/20 p-6 rounded-lg text-center">
                  <span className="text-6xl font-black">?</span>
                  <p className="text-sm font-semibold mt-2">
                    Genuslab Quiz Challenge
                  </p>
                </div>
                <div className="flex-1 bg-blue-400/20 p-6 rounded-lg text-center">
                  <span className="text-6xl font-black">Q A</span>
                  <p className="text-sm font-semibold mt-2">
                    Genuslab Tech Championship
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Four winners per week compete in a cyclic championship format.
              </p>
            </div>

            {/* Tech News */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-teal-600 mb-2">
                Tech News
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Latest trends in technology
              </p>
              <img
                src="https://placehold.co/64x64"
                className="rounded-lg w-full h-24 object-cover"
                alt="Tech News"
              />
            </div>

            {/* Previous Quizzes */}
            <Link
              href="/quiz/previous"
              className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                Previous Quizzes
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={"/quiz?page=all"}
                  className="flex-1 bg-green-400/20 p-6 rounded-lg text-center"
                >
                  <FaTrophy className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">All Episode Results</p>
                </Link>
                <Link
                  href={"/quiz/retake"}
                  className="flex-1 bg-red-400/20 p-6 rounded-lg text-center"
                >
                  <SiFusionauth className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">Cycle Championship</p>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Cyclic grouping of users who achieved the same outcome.
              </p>
            </Link>

            {/* Studio Winner */}
            <Link
              href={"/profile/view"}
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/30 dark:to-gray-800 border border-emerald-100 dark:border-emerald-800/40"
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                Studio Quiz Winner
              </h3>
              <div className="flex items-center flex-col xmd:flex-row gap-4 mb-4">
                <div className="relative">
                  <img
                    src="/avatar.png"
                    className="w-16 h-16 rounded-full ring-2 ring-emerald-400/60"
                    alt="Winner"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-xs font-bold px-2 rounded-full">
                    #1
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-center xmd:text-start text-lg">
                    Evelyn S.
                  </p>
                  <p className="text-sm text-center xmd:text-start text-gray-500">
                    Studio Championship
                  </p>
                </div>
              </div>
              <div className="h-px bg-emerald-100 mb-4" />
              <div className="flex flex-wrap justify-center xmd:justify-start gap-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">
                    Winning Points
                  </p>
                  <p className="text-lg font-bold">48,750 pts</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase text-gray-500">Amount Won</p>
                  <p className="text-lg font-bold text-emerald-600">
                    ₦1,200,000
                  </p>
                </div>
              </div>
            </Link>

            {/* Social Media */}
            {/* <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">Social Media</h3>
              <div className="flex gap-4 text-gray-500">
                <FaFacebookSquare size={28} />
                <FaStar size={28} />
                <FaStar size={28} />
                <FaStar size={28} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
          {/* ================= LEADERBOARD ================= */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex flex-wrap gap-6 justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold">Leaderboard Ranks</h3>

              <div className="flex items-center gap-4">
                <button
                  disabled={startIndex === 0}
                  onClick={handlePrevPage}
                  className={`${baseButtonClasses} ${
                    startIndex === 0 ? disabledClasses : activeClasses
                  }`}
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
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>
            <div className="hori-scroll overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                  <tr>
                    <th className="py-3 px-6 text-center">Rank</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-right">Unlock Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentRanks.map((item) => (
                    <RankTableRow
                      key={item.rank}
                      item={item}
                      onClick={handleRankClick}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {showRank && selectedRank && (
              <RankTable
                rank={`${toRoman(selectedRank.rank)} ${selectedRank.title}`}
                rankIcon={selectedRank.Icon}
                dtheme={() => {}}
                handleClose={() => setShowRank(false)}
              />
            )}

            {showLocked && selectedRank && (
              <LockedRankModal
                rankData={selectedRank}
                handleClose={() => setShowLocked(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default exploral;
