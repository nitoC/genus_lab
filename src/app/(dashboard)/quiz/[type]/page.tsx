"use client";

import { useParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { Calendar, Button, Message, toaster } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { isSameDay } from "date-fns";
import Back from "@/components/Buttons/Back";
import { toast } from "react-toastify";

/* ------------------ Helpers ------------------ */

// Format date to YYYY-MM-DD
const formatDate = (date: any) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

// Today (start of day) – prevents time issues
const today = new Date();
today.setHours(0, 0, 0, 0);

// Disable future dates
const disableFutureDates = (date: any) => date > today;

/* ------------------ Component ------------------ */

const Quizzes = () => {
  const type = useParams().type;
  const router = useRouter();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  /* ------------------ Date Handlers ------------------ */

  const handleStartDateSelect = (date: any) => {
    if (date > today) return;

    setStartDate(date);

    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateSelect = (date: any) => {
    if (date > today) return;

    if (startDate && date < startDate) {
      toast.warn(
        " End date cannot be before the start date. Please select a valid end date."
      );
      setEndDate(null);
      return;
    }

    setEndDate(date);
  };

  const handleNextClick = () => {
    if (startDate && endDate) {
      const start = formatDate(startDate);
      const end = formatDate(endDate);

      const nextUrl = `/quiz?page=all&start_date=${start}&end_date=${end}`;

      console.log(`Simulating navigation to: ${nextUrl}`);
      router.push(nextUrl);
    } else {
      toast.warn("Please select both a start date and an end date.");
    }
  };

  const handleBackClick = () => {
    router.back();
    toast.warn("Navigating back...");
  };

  /* ------------------ Calendar Cell Renderer ------------------ */

  const renderCell = useMemo(
    () => (date: any) => {
      const isStart = startDate && isSameDay(date, startDate);
      const isEnd = endDate && isSameDay(date, endDate);
      const isInRange =
        startDate && endDate && date > startDate && date < endDate;

      let classes =
        "flex items-center justify-center w-full h-full rounded-md transition-all duration-100 cursor-pointer text-sm font-medium";

      if (isStart) {
        classes += " bg-blue-500 text-white font-bold shadow-md";
      } else if (isEnd) {
        classes += " bg-green-500 text-white font-bold shadow-md";
      } else if (isInRange) {
        classes +=
          " bg-blue-100 hidden dark:bg-blue-900/50 rounded-none text-gray-800 dark:text-gray-200";
      } else {
        classes +=
          " text-gray-700 hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
      }

      return <div className={classes}>{date.getDate()}</div>;
    },
    [startDate, endDate]
  );

  const isNextDisabled = !startDate || !endDate;
  if (type !== "previous" && type !== "upcoming")
    return <div>Invalid quiz parameter.</div>;

  /* ------------------ Render ------------------ */

  return (
    <>
      <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Back />
        {/* Global Styles */}
        <style jsx global>{`
          .rs-calendar-header-title,
          .rs-calendar-table-header-cell {
            color: #4b5563;
          }
          .dark .rs-calendar-header-title,
          .dark .rs-calendar-table-header-cell {
            color: #f3f4f6 !important;
          }
          .dark .rs-calendar-header-backward button,
          .dark .rs-calendar-header-forward button,
          .dark .rs-calendar-header-backward .rs-icon,
          .dark .rs-calendar-header-forward .rs-icon {
            color: #f3f4f6 !important;
          }
          .rs-calendar-table-cell .rs-calendar-table-cell-content {
            display: none;
          }
          .dark .rs-calendar {
            color: #f3f4f6;
          }
          .dark .rs-calendar-header-btn-today {
            background-color: #4b5563 !important;
            color: #f3f4f6 !important;
          }
        `}</style>

        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <button onClick={handleBackClick}>Back</button>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          {type} Quiz History
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Select a date range to view previous quiz results.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Start Date */}
          <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Start Date
            </h2>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Current Selection:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {startDate ? formatDate(startDate) : "Not Selected"}
              </span>
            </p>
            <Calendar
              compact
              onSelect={handleStartDateSelect}
              renderCell={renderCell}
              disabledDate={disableFutureDates}
              style={{ width: "100%" }}
            />
          </div>

          {/* End Date */}
          <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              End Date
            </h2>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Current Selection:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {endDate ? formatDate(endDate) : "Not Selected"}
              </span>
            </p>
            <Calendar
              compact
              onSelect={handleEndDateSelect}
              renderCell={renderCell}
              disabledDate={disableFutureDates}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-8">
          <Button
            appearance="primary"
            size="lg"
            onClick={handleNextClick}
            disabled={isNextDisabled}
            style={{
              borderRadius: "9999px",
              padding: "12px 32px",
              fontSize: "1rem",
              backgroundColor: isNextDisabled ? "#9ca3af" : "#2563eb",
            }}
          >
            {isNextDisabled ? "Select Date Range" : "View Quiz Results"}
          </Button>
        </div>
      </div>
    </>
  );
};

/* ------------------ Page Wrapper ------------------ */

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Quizzes />
    </Suspense>
  );
};

export default page;
