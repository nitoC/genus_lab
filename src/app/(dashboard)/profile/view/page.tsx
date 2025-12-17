"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaTrophy,
  FaUsers,
  FaStar,
  FaChartLine,
  FaMoneyBillWave,
  FaVideo,
} from "react-icons/fa";
import Back from "@/components/Buttons/Back";

/* ================== DATA ================== */
const userData = {
  name: "John Doe",
  avatarUrl: "/avatar.png",
  generalRanking: 341,
  rankTitle: "Quiz Overlord",
  totalReferrals: 18,
  referralEarnings: 7200,
  totalQuizzesCompleted: 42,
  quizzesWon: 6,
  winningQuizzes: [
    "Genus Quiz – Episode 12",
    "Genus Quiz – Episode 9",
    "Genus Quiz – Episode 4",
  ],
  totalPoints: 12480,
  totalCashEarned: 38500,
  studioParticipation: true,
  studioAppearances: 2,
  bestFinish: "Top 5",
  averageScore: 87,
};

/* ================== AVATAR ================== */
const Avatar = ({ name, src }: { name: string; src?: string | null }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative w-[clamp(72px,18vw,112px)] h-[clamp(72px,18vw,112px)]
                    rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-xl"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center">
        {src ? (
          <Image src={src} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-[clamp(18px,5vw,28px)] font-extrabold text-indigo-600 dark:text-indigo-400">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
};

/* ================== STAT CARD ================== */
const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;
}) => (
  <div
    className="relative bg-white/80 dark:bg-gray-800/70 backdrop-blur
               border border-gray-200 dark:border-white/10 rounded-2xl
               p-4 sm:p-5 shadow-md hover:shadow-xl transition"
  >
    <div
      className={`absolute -top-3 -right-3 sm:-top-4 sm:-right-4
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center
                  justify-center ${accent}`}
    >
      {icon}
    </div>

    <p className="text-[clamp(12px,2.8vw,14px)] text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-1 text-[clamp(18px,5vw,28px)] font-extrabold text-gray-900 dark:text-white break-all">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

/* ================== PAGE ================== */
export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="p-4 sm:p-8">
        <Back />
      </div>

      <main
        className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100
        dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
        px-4 sm:px-6 py-6 sm:py-10 transition-opacity duration-700
        ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          {/* ================= HEADER ================= */}
          <section
            className="relative overflow-hidden rounded-3xl
                              bg-gradient-to-r from-indigo-600 to-purple-600
                              p-6 sm:p-8 lg:p-10 text-white shadow-2xl"
          >
            <div
              className="relative z-10 flex flex-col lg:flex-row
                            lg:items-center lg:justify-between gap-6"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <Avatar name={userData.name} src={userData.avatarUrl} />

                <div className="text-center sm:text-left">
                  <h1 className="font-black tracking-tight text-[clamp(22px,6vw,40px)]">
                    {userData.name}
                  </h1>

                  <p className="mt-1 text-indigo-100 text-[clamp(14px,3.5vw,18px)]">
                    Global Rank{" "}
                    <span className="font-bold">
                      #{userData.generalRanking}
                    </span>
                  </p>

                  <span
                    className="inline-block mt-3 px-4 py-2 rounded-full
                                   bg-white/20 backdrop-blur text-sm sm:text-base font-bold"
                  >
                    {userData.rankTitle}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="bg-white/15 rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-xs opacity-80">Total Points</p>
                  <p className="text-[clamp(16px,4vw,24px)] font-extrabold">
                    {userData.totalPoints.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/15 rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-xs opacity-80">Cash Earned</p>
                  <p className="text-[clamp(16px,4vw,24px)] font-extrabold">
                    ₦{userData.totalCashEarned.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              icon={<FaUsers />}
              label="Total Referrals"
              value={userData.totalReferrals}
              accent="bg-green-500 text-white"
            />
            <StatCard
              icon={<FaMoneyBillWave />}
              label="Referral Earnings"
              value={`₦${userData.referralEarnings}`}
              accent="bg-emerald-500 text-white"
            />
            <StatCard
              icon={<FaChartLine />}
              label="Quizzes Completed"
              value={userData.totalQuizzesCompleted}
              accent="bg-blue-500 text-white"
            />
            <StatCard
              icon={<FaTrophy />}
              label="Quizzes Won"
              value={userData.quizzesWon}
              accent="bg-yellow-500 text-white"
            />
          </section>

          {/* ================= MAIN ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* PERFORMANCE */}
            <div
              className="lg:col-span-2 bg-white dark:bg-gray-800/70 backdrop-blur
                            rounded-3xl p-6 sm:p-8 shadow-xl border
                            border-gray-200 dark:border-white/10"
            >
              <h2 className="text-[clamp(18px,4vw,24px)] font-extrabold mb-6 text-gray-900 dark:text-white">
                Quiz Performance
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <StatCard
                  icon={<FaStar />}
                  label="Total Points Accumulated"
                  value={`${userData.totalPoints} pts`}
                  accent="bg-indigo-500 text-white"
                />
                <StatCard
                  icon={<FaMoneyBillWave />}
                  label="Cash Rewards"
                  value={`₦${userData.totalCashEarned}`}
                  accent="bg-teal-500 text-white"
                />
              </div>

              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Winning Quizzes
              </h3>

              <ul className="space-y-3">
                {userData.winningQuizzes.map((quiz, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl
                               bg-gray-100 dark:bg-gray-700/50
                               hover:translate-x-1 transition break-words"
                  >
                    <FaTrophy className="text-yellow-500 shrink-0 mt-1" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {quiz}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* STUDIO */}
            <div
              className="bg-white dark:bg-gray-800/70 backdrop-blur rounded-3xl
                            p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-white/10"
            >
              <h2 className="text-[clamp(16px,3.5vw,20px)] font-extrabold mb-6 flex items-center gap-3">
                <FaVideo className="text-indigo-500" />
                Studio Appearance
              </h2>

              <div className="space-y-3 text-[clamp(14px,3.2vw,16px)] text-gray-800 dark:text-gray-200">
                <p>
                  <strong>Participation:</strong>{" "}
                  <span className="text-green-500 font-bold">Yes</span>
                </p>
                <p>
                  <strong>Appearances:</strong> {userData.studioAppearances}
                </p>
                <p>
                  <strong>Best Finish:</strong>{" "}
                  <span className="text-purple-500 font-bold">
                    {userData.bestFinish}
                  </span>
                </p>
                <p>
                  <strong>Average Score:</strong> {userData.averageScore}%
                </p>
              </div>

              <div
                className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/20
                              text-sm text-indigo-800 dark:text-indigo-200 border
                              border-indigo-300 dark:border-indigo-400/30"
              >
                <strong>Status:</strong> Performance qualifies you for future
                live studio competitions.
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
