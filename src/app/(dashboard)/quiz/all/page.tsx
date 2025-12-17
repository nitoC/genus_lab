"use client";
import React, { useState } from "react";
import Back from "@/components/Buttons/Back";
import QuizCard from "@/components/Cards/AllQuizCard";
import { FaLaptop, FaVideo } from "react-icons/fa";

/* ===================== DATA ===================== */

const onlineQuizzes = [
  {
    title: "Science Weekly",
    episode: "Episode 12",
    score: 90,
    time: "Aug 12, 2024 • 7:00 PM",
    status: "Completed",
    image: "/images/quiz-img.png",
  },
  {
    title: "General Knowledge",
    episode: "Episode 9",
    score: 70,
    time: "Aug 5, 2024 • 6:00 PM",
    status: "Completed",
    image: "/images/box.png",
  },
];

const studioQuizzes = [
  {
    title: "Tech Masters",
    episode: "Episode 4",
    score: 85,
    time: "Jul 29, 2024 • Live Studio",
    status: "Completed",
    image: "/images/doc.png",
  },
];

/* ===================== PAGE ===================== */

export default function QuizPerformanceList() {
  const [activeTab, setActiveTab] = useState<"online" | "studio">("online");

  const quizzes = activeTab === "online" ? onlineQuizzes : studioQuizzes;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Back />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Quiz Performance
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md w-fit">
          <button
            onClick={() => setActiveTab("online")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all
              ${
                activeTab === "online"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <FaLaptop />
            Online Quiz
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all
              ${
                activeTab === "studio"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <FaVideo />
            Studio Quiz
          </button>
        </div>

        {/* Content */}
        <section className="space-y-5 animate-fadeIn">
          {quizzes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No quizzes recorded yet.
            </div>
          ) : (
            quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg
                           border border-gray-200 dark:border-white/10
                           p-5 hover:shadow-xl transition-all"
              >
                <QuizCard
                  title={`${quiz.title} – ${quiz.episode}`}
                  score={quiz.score}
                  status={quiz.status}
                  image={quiz.image}
                />

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  🕒 {quiz.time}
                </p>
              </div>
            ))
          )}
        </section>
      </div>

      {/* Animation */}
      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style> */}
    </main>
  );
}
