"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IoTimerOutline,
  IoTrophyOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { RiRestartLine, RiInformationLine } from "react-icons/ri";

const MOCK_USERS = [
  {
    id: "101",
    name: "Alexander Wright",
    score: 95,
    time: "12:45:08",
    points: 1200,
    avatar: "https://i.pravatar.cc/150?u=101",
  },
  {
    id: "102",
    name: "Sophia Chen",
    score: 95,
    time: "12:45:08",
    points: 1150,
    avatar: "https://i.pravatar.cc/150?u=102",
  },
  {
    id: "103",
    name: "Marcus Thorne",
    score: 88,
    time: "14:20:42",
    points: 980,
    avatar: "https://i.pravatar.cc/150?u=103",
  },
  {
    id: "104",
    name: "Elena Rodriguez",
    score: 88,
    time: "14:20:42",
    points: 950,
    avatar: "https://i.pravatar.cc/150?u=104",
  },
  {
    id: "105",
    name: "Jordan Smith",
    score: 95,
    time: "12:45:08",
    points: 1100,
    avatar: "https://i.pravatar.cc/150?u=105",
  },
];

const QuizResolutionPage = () => {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-16 text-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Header */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            <IoShieldCheckmarkOutline />
            Quiz Integrity Review
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Quiz{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Tie Resolution
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            All users listed below completed the same quiz. Identical scores and
            completion times require a controlled retake to determine final
            ranking.
          </p>
        </header>

        {/* Eligibility Notice */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex gap-4">
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
              <RiInformationLine className="text-amber-500" />
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Only users with a{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100 underline decoration-indigo-500">
                verified username
              </span>{" "}
              and a{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100 underline decoration-indigo-500">
                valid system ID
              </span>{" "}
              are eligible to join the retake session.
            </p>
          </div>
        </div>

        {/* List */}
        <section className="space-y-4">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_160px] px-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>User</span>
            <span>Score</span>
            <span>Time</span>
            <span>Points</span>
            <span className="text-right">Action</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800">
            {MOCK_USERS.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_160px] items-center gap-4 px-4 py-4 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors"
              >
                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-800"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
                      ID · {user.id}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 font-semibold">
                  <IoTrophyOutline className="text-slate-400" />
                  {user.score}%
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 font-mono text-emerald-500">
                  <IoTimerOutline />
                  {user.time}
                </div>

                {/* Points */}
                <div className="font-semibold">
                  {user.points}{" "}
                  <span className="text-xs text-slate-500">PTS</span>
                </div>

                {/* Action */}
                <div className="flex md:justify-end">
                  <button className="group inline-flex items-center gap-2 rounded-xl border border-indigo-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-600 hover:text-white">
                    <RiRestartLine className="transition-transform duration-500 group-hover:rotate-180" />
                    Join Retake
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizResolutionPage;
