"use client";
import React, { useEffect, useState } from "react";
import Back from "@/components/Buttons/Back";
import { FaLaptop, FaVideo, FaTrophy } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getScoreHistory } from "@/lib/api/apis";
import { useRouter } from "next/navigation";
import { get } from "http";
import getSessionStorage from "@/utils/getSessionStorage";
import { is } from "date-fns/locale";

/* ===================== DATA ===================== */

// const onlineQuizzes = [
//   {
//     id: 1,
//     quizName: "Genus Quiz",
//     episode: "Episode 20",
//     score: 95,
//     time: "Dec 15, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 2,
//     quizName: "Genus Quiz",
//     episode: "Episode 19",
//     score: 88,
//     time: "Dec 10, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 3,
//     quizName: "Genus Quiz",
//     episode: "Episode 18",
//     score: 92,
//     time: "Dec 5, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 4,
//     quizName: "Genus Quiz",
//     episode: "Episode 17",
//     score: 76,
//     time: "Nov 28, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 5,
//     quizName: "Genus Quiz",
//     episode: "Episode 16",
//     score: 85,
//     time: "Nov 20, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 6,
//     quizName: "Genus Quiz",
//     episode: "Episode 15",
//     score: 90,
//     time: "Nov 15, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 7,
//     quizName: "Genus Quiz",
//     episode: "Episode 14",
//     score: 82,
//     time: "Nov 8, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 8,
//     quizName: "Genus Quiz",
//     episode: "Episode 13",
//     score: 78,
//     time: "Nov 1, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 9,
//     quizName: "Genus Quiz",
//     episode: "Episode 12",
//     score: 90,
//     time: "Aug 12, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 10,
//     quizName: "Genus Quiz",
//     episode: "Episode 11",
//     score: 94,
//     time: "Aug 8, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 11,
//     quizName: "Genus Quiz",
//     episode: "Episode 10",
//     score: 87,
//     time: "Aug 6, 2024 • 7:00 PM",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 12,
//     quizName: "Genus Quiz",
//     episode: "Episode 9",
//     score: 70,
//     time: "Aug 5, 2024 • 6:00 PM",
//     image: "/images/quiz-img.png",
//   },
// ];

// const studioQuizzes = [
//   {
//     id: 13,
//     quizName: "Studio Quiz",
//     episode: "Episode 15",
//     score: 96,
//     time: "Dec 12, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 14,
//     quizName: "Studio Quiz",
//     episode: "Episode 14",
//     score: 89,
//     time: "Dec 8, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 15,
//     quizName: "Studio Quiz",
//     episode: "Episode 13",
//     score: 93,
//     time: "Dec 1, 2024 • Live Studio",
//     image: "/images/quiz-book.png",
//   },
//   {
//     id: 16,
//     quizName: "Studio Quiz",
//     episode: "Episode 12",
//     score: 81,
//     time: "Nov 25, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 17,
//     quizName: "Studio Quiz",
//     episode: "Episode 11",
//     score: 90,
//     time: "Nov 18, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 18,
//     quizName: "Studio Quiz",
//     episode: "Episode 10",
//     score: 88,
//     time: "Aug 15, 2024 • Live Studio",
//     image: "/images/quiz-book.png",
//   },
//   {
//     id: 19,
//     quizName: "Studio Quiz",
//     episode: "Episode 9",
//     score: 75,
//     time: "Aug 12, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 20,
//     quizName: "Studio Quiz",
//     episode: "Episode 8",
//     score: 94,
//     time: "Aug 10, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 21,
//     quizName: "Studio Quiz",
//     episode: "Episode 7",
//     score: 92,
//     time: "Aug 2, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 22,
//     quizName: "Studio Quiz",
//     episode: "Episode 6",
//     score: 95,
//     time: "Aug 21, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 23,
//     quizName: "Studio Quiz",
//     episode: "Episode 5",
//     score: 86,
//     time: "Jul 31, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 24,
//     quizName: "Studio Quiz",
//     episode: "Episode 4",
//     score: 85,
//     time: "Jul 29, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
//   {
//     id: 25,
//     quizName: "Studio Quiz",
//     episode: "Episode 3",
//     score: 78,
//     time: "Aug 8, 2024 • Live Studio",
//     image: "/images/quiz-img.png",
//   },
// ];

/* ===================== CARD ===================== */

const QuizPerformanceCard = ({ quiz }: { quiz: any }) => {
  // const [onlineQuizzes, setonlineQuizzes] = useState([]);
  // const [studioQuizzes, setstudioQuizzes] = useState([]);

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-blue-100/50 dark:border-blue-900/20 p-6 flex flex-col md:flex-row gap-6 hover:border-blue-400/60 dark:hover:border-blue-600/40 hover:bg-blue-50/30 dark:hover:bg-slate-700/50 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full md:w-52 h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-700 dark:to-slate-600">
        <img
          src={quiz.image}
          alt={quiz.quizName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
            {quiz.episode}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          {quiz.quizName}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {quiz.time}
        </p>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {quiz.score}%
            </span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Score
            </span>
          </div>

          {quiz.score >= 90 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-blue-400/40 dark:border-blue-600/40 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-400">
              <FaTrophy className="text-blue-500 dark:text-blue-400" />
              Top Performer
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===================== PAGE ===================== */

export default function QuizPerformancePage() {
  const [activeTab, setActiveTab] = useState<"online" | "studio">("online");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["scoreHistory"],
    queryFn: async () => {
      try {
        const user = getSessionStorage("user") as string;

        console.log(user);
        console.log(JSON.parse(user).email);
        // if (!email) throw new Error("user not logged in");
        const email = JSON.parse(user).email;
        const response = await getScoreHistory(email);
        console.log(response.data, "score history data");
        return response.data;
      } catch (err) {
        toast.error("user not logged in");
        router.push("/login");
      }
    },
  });
  if (isLoading) return <div>Loading...</div>;
  const allQuizzes = activeTab === "online" ? data : [];
  console.log(data, "data in quiz performance page");
  // Calculate pagination
  const totalPages = Math.ceil(allQuizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const quizzes = allQuizzes.slice(startIndex, endIndex);

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab: "online" | "studio") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const avScore = isNaN(
    allQuizzes.reduce((acc: number, q: any) => acc + q.score, 0)
  )
    ? 0
    : allQuizzes.reduce((acc: number, q: any) => acc + q.score, 0);
  console.log(avScore, "average score");
  console.log(
    allQuizzes.reduce((acc: number, q: any) => acc + q.score, 0),
    "total score"
  );
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <Back />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
              Previous Quiz Performance
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Track your progress and achievements across all quiz sessions
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="inline-flex gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => handleTabChange("online")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${
                activeTab === "online"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
          >
            <FaLaptop className="text-base" />
            <span>Online Quiz</span>
          </button>

          <button
            onClick={() => handleTabChange("studio")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${
                activeTab === "studio"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
          >
            <FaVideo className="text-base" />
            <span>Studio Quiz</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Total Quizzes
            </p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {allQuizzes.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Average Score
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {avScore === 0 || allQuizzes.length === 0
                ? 0
                : Math.round(avScore / allQuizzes.length)}
              %
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Top Performances
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {allQuizzes.filter((q: any) => q.score >= 90).length}
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="space-y-4">
          {quizzes.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-lg font-medium">No quiz records found</p>
              <p className="text-sm mt-2">
                Start taking quizzes to see your performance here
              </p>
            </div>
          ) : (
            quizzes.map((quiz: any) => (
              <QuizPerformanceCard key={quiz.id} quiz={quiz} />
            ))
          )}
        </section>

        {/* Pagination */}
        {allQuizzes.length > itemsPerPage && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border transition-all duration-300
                ${
                  currentPage === 1
                    ? "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                    : "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-600"
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-500">
                {allQuizzes.length} total quizzes
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border transition-all duration-300
                ${
                  currentPage === totalPages
                    ? "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                    : "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-600"
                }`}
            >
              <span>Next</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
