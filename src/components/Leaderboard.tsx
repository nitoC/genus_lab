"use client";
import React, { useState } from "react";
import { DatePicker, Calendar, Badge, List, HStack } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Panel } from "rsuite";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Type for quiz data
type QuizDataType = {
  [key: string]: { grade: string; ranking: string };
};

// Mock data for demonstration purposes
const quizData: QuizDataType = {
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

// Main App component
export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-10-05"));
  const getPerformanceForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return quizData[dateStr] || { grade: "-", ranking: "-" };
  };

  const selectedDayPerformance = getPerformanceForDate(selectedDate);

  // Handler for selecting a date in the calendar
  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Custom cell renderer for the calendar
  const renderQuizDateCell = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    const hasData = quizData[dateStr];
    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth();

    if (hasData) {
      return (
        <div className="p-1 rounded-full text-white bg-blue-500 flex items-center justify-center h-full w-full">
          {date.getDate()}
        </div>
      );
    }
    if (isSelected) {
      return (
        <div className="p-1 rounded-full text-white bg-blue-500 flex items-center justify-center h-full w-full">
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
      <div className="flex justify-between items-center py-2 px-4 dark:text-white">
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
    <div className="flex flex-col items-center min-h-screen  dark:text-gray-200 p-8 font-sans">
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

      {/* Title */}
      <h1 className="text-3xl font-bold mb-10 text-white">
        Your Quiz Performance
      </h1>

      {/* Calendars Section */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 mb-10">
        <div className="w-full lg:w-1/2">
          <HStack
            spacing={10}
            style={{ height: "100%" }}
            alignItems="flex-start"
            wrap
          >
            <Calendar
              compact
              // renderCell={renderCell}
              onSelect={() => console.log("calender")}
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
          {/* <Calendar
            value={selectedDate}
            onSelect={handleSelect}
            renderCell={renderQuizDateCell}
            renderTitle={() => "October 2025"}
            renderToolbar={() => null}
            bordered
            className="w-full"
            renderHeader={customHeader}
            onChangeMonth={() => {}}
            onChangeYear={() => {}}
          /> */}
        </div>
        <div className="w-full lg:w-1/2">
          <HStack
            spacing={10}
            style={{ height: "100%" }}
            alignItems="flex-start"
            wrap
          >
            <Calendar
              compact
              // renderCell={renderCell}
              onSelect={() => console.log("calender")}
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
          {/* <Calendar
            value={new Date("2025-11-01")}
            onSelect={handleSelect}
            renderCell={renderQuizDateCell}
            renderTitle={() => "November 2025"}
            renderToolbar={() => null}
            bordered
            className="w-full"
            renderHeader={customHeader}
            onChangeMonth={() => {}}
            onChangeYear={() => {}}
          /> */}
        </div>
      </div>

      {/* Selected Day's Performance Section */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold mb-4 self-start pl-4 lg:pl-0">
          Selected Day's Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-10">
          <Panel
            header="Quiz Grade"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-5xl font-extrabold dark:text-white">
              {selectedDayPerformance.grade}
            </p>
          </Panel>
          <Panel
            header="Ranking"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-5xl font-extrabold dark:text-white">
              {selectedDayPerformance.ranking}
            </p>
          </Panel>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {/* Performance Summary Section */}
        <h2 className="text-xl font-bold mb-4 self-start pl-4 lg:pl-0">
          Performance Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          <Panel
            header="Daily Points"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-2xl font-extrabold dark:text-white">
              {performanceSummary.daily}
            </p>
          </Panel>
          <Panel
            header="Weekly Points"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-2xl font-extrabold dark:text-white">
              {performanceSummary.weekly}
            </p>
          </Panel>
          <Panel
            header="Monthly Points"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-2xl font-extrabold dark:text-white">
              {performanceSummary.monthly}
            </p>
          </Panel>
          <Panel
            header="Yearly Points"
            bordered
            className="p-4 rounded-lg dark:bg-gray-900 border border-gray-800"
          >
            <p className="text-2xl font-extrabold dark:text-white">
              {performanceSummary.yearly}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
