"use client";
import React, { useState } from "react";
import { Calendar, HStack, Panel } from "rsuite";
import "rsuite/dist/rsuite.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Mock data for demonstration purposes
type QuizPerformance = { grade: string; ranking: string };
const quizData: { [date: string]: QuizPerformance } = {
  "2025-10-05": { grade: "85%", ranking: "12th" },
  "2025-10-06": { grade: "92%", ranking: "8th" },
  "2025-10-07": { grade: "78%", ranking: "25th" },
};

const performanceSummary = {
  daily: 150,
  weekly: 850,
  monthly: 3200,
  yearly: 15000,
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
    tier: "green",
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

// Main App component
export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-10-05"));

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const getPerformanceForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return quizData[dateStr] || { grade: "-", ranking: "-" };
  };

  const selectedDayPerformance = getPerformanceForDate(selectedDate);

  // Custom cell renderer for the calendar
  const renderQuizDateCell = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    const hasData = quizData[dateStr];
    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    if (hasData) {
      return (
        <div className="p-1 rounded-full dark:text-white bg-blue-500 flex items-center justify-center h-full w-full">
          {date.getDate()}
        </div>
      );
    }
    if (isSelected) {
      return (
        <div className="p-1 rounded-full dark:text-white bg-blue-500 flex items-center justify-center h-full w-full">
          {date.getDate()}
        </div>
      );
    }
    return <span>{date.getDate()}</span>;
  };

  // Custom header for the calendar
  const customHeader = (props: any) => {
    const {
      date,
      onPrevMonth,
      onNextMonth,
      onPrevYear,
      onNextYear,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
    } = props;
    return (
      <div className="flex justify-between items-center py-2 px-4 dark:bg-gray-900 text-white">
        <FaChevronLeft onClick={onPrevMonth} className="cursor-pointer" />
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
        </div>
        <FaChevronRight onClick={onNextMonth} className="cursor-pointer" />
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-start min-h-screen dark:bg-black dark:text-gray-200 p-8 font-sans">
      {/* <style>{`
        .rs-calendar {
          background-color: #0d0d0d !important;
          border-radius: 12px !important;
          border: 1px solid #2d2d2d !important;
          box-shadow: none !important;
        }
        .rs-calendar-header {
          border-bottom: 1px solid #2d2d2d !important;
        }
        .rs-calendar-table-row {
          color: #fff !important;
        }
        .rs-calendar-table-row:nth-child(2) td:first-child .rs-calendar-cell {
          color: #a0aec0 !important;
        }
        .rs-calendar-cell {
          color: #a0aec0 !important;
          border-radius: 8px !important;
        }
        .rs-calendar-cell:hover, .rs-calendar-cell-selected .rs-calendar-cell-content {
          background-color: #3b82f6 !important;
          color: #fff !important;
        }
        .rs-calendar-cell-selected .rs-calendar-cell-content {
          background-color: #3b82f6 !important;
          color: #fff !important;
        }
        .rs-calendar-cell-today .rs-calendar-cell-content {
          color: #fff !important;
        }
        .rs-calendar-table-header-cell {
          color: #fff !important;
          font-weight: 500 !important;
        }
        .rs-panel {
          background-color: #0d0d0d !important;
          border: 1px solid #2d2d2d !important;
          border-radius: 12px !important;
          color: #fff !important;
          box-shadow: none !important;
        }
        .rs-panel-heading {
          background-color: transparent !important;
        }
        .rsuite-calendar-nav .rs-btn {
          background-color: transparent !important;
          color: #fff !important;
        }
        .rsuite-calendar-nav .rs-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .rsuite-calendar-nav .rs-btn-group-justified .rs-btn {
          border-left: none !important;
        }
      `}</style> */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center lg:items-start p-4 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* User Rankings Section */}
          <div className="mb-10 w-full">
            <div className="flex flex-col gap-4 mb-[1rem]">
              <h2 className="font-bold mb-2 text-white">User Rankings</h2>
              <p className="text-gray-400 mb-6">
                View the current standings of users based on their performance.
              </p>
            </div>
            <div className="dark:bg-gray-900 rounded-lg border-gray-800 border p-4 lg:p-6">
              <div className="grid grid-cols-8 gap-4 text-gray-400 text-xs md:text-sm font-semibold border-b border-gray-700 pb-2 mb-2">
                <span className="col-span-1">Rank</span>
                <span className="col-span-2">Username</span>
                <span className=" md:block col-span-1">State</span>
                <span className="col-span-1">Score</span>
                <span className=" md:block col-span-1">Time</span>
                <span className="col-span-1">Accuracy</span>
                <span className="col-span-1">Reward</span>
                <span className=" md:block col-span-1">Total Earned</span>
              </div>
              {userRankings.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 gap-4 py-3 border-b border-gray-800 last:border-b-0 items-center"
                >
                  <span className="col-span-1 font-bold text-lg dark:text-white">
                    {user.rank}
                  </span>
                  <span className="col-span-2 dark:text-white font-medium">
                    {user.username}
                  </span>
                  <span className=" md:block col-span-1 text-gray-400">
                    {user.state}
                  </span>
                  <span className="col-span-1 text-gray-400">{user.score}</span>
                  <span className=" md:block col-span-1 text-gray-400">
                    {user.time}
                  </span>
                  <span className="col-span-1 text-gray-400">
                    {user.accuracy}
                  </span>
                  <span className="col-span-1 text-yellow-400 font-bold">
                    {user.reward}
                  </span>
                  <span className=" md:block col-span-1 text-gray-400">
                    {user.totalEarned}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-96 flex flex-col space-y-6 mt-10 lg:mt-0 p-4 lg:p-0">
        <div className="dark:dark:bg-gray-900 rounded-lg p-4 border border-gray-800">
          <h5 className=" font-bold mb-4">Your Quiz Performance</h5>
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 mb-10">
            <div className="w-full">
              <HStack
                spacing={10}
                style={{ height: "100%" }}
                alignItems="flex-start"
                wrap
              >
                <Calendar
                  compact
                  //   renderCell={renderQuizDateCell}
                  onSelect={handleSelect}
                  style={{ width: "100%" }}
                  // disabledDate={(date) => {
                  //   // Disable if earlier than today
                  //   const today = new Date();
                  //   const isPast =
                  //     date.getFullYear() < today.getFullYear() ||
                  //     (date.getFullYear() === today.getFullYear() &&
                  //       date.getMonth() < today.getMonth()) ||
                  //     (date.getFullYear() === today.getFullYear() &&
                  //       date.getMonth() === today.getMonth() &&
                  //       date.getDate() < today.getDate());

                  //   // Disable weekends (optional)
                  //   // const isWeekend =
                  //   //   date.getDay() === 0 || date.getDay() === 6;

                  //   // Disable custom dates
                  //   const isCustomDisabled = unavalble.some(
                  //     (disabledDate) => isSameDay(disabledDate, date)
                  //   );

                  //   return isPast || isCustomDisabled;
                  // }}
                />
                {/* <TodoList date={selectedDate} /> */}
              </HStack>
            </div>
            {/* The second calendar from the original design is now removed to fit the new layout */}
          </div>
        </div>

        {/* Weekly Winner Section */}
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
  );
}
