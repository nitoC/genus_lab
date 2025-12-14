"use client";
import React, { useState } from "react";
import BalanceCard from "../Cards/BalanceCard";
import QuizCard from "../Cards/QuizCard";
import { JoinQuizModal } from "../modals/Quiz";

const dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl dark:text-blue font-semibold">
          Welcome back, Nwokolo!
        </h2>
        <p className="text-gray-400">
          Here’s a quick overview of your account and active quizzes.
        </p>
      </section>

      <BalanceCard />

      <section>
        <h3 className="text-xl dark:text-blue font-semibold mt-6">
          Upcoming Quizzes
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* <QuizCard title="General Knowledge Quiz" time="7:00am-9:00am" />
          <QuizCard title="General Knowledge Quiz" time="9:00am-11:00am" />
          <QuizCard title="Genus Quiz Challenge" time="11:00am-1:00pm" />
          <QuizCard title="Genus Quiz Challenge" time="1:00pm-3:00pm" />
          <QuizCard title="Genus Quiz Challenge" time="3:00pm-5:00pm" />
          <QuizCard title="Genus Quiz Challenge" time="5:00pm-7:00pm" />
          <QuizCard title="Genus Quiz Challenge" time="7:00pm-9:00pm" /> */}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              console.log("log");
              setIsModalOpen(true);
            }}
            className="btn-rich btn-green"
          >
            Join Quiz
          </button>
          <button className="btn-rich btn-outline dark:bg-transparent">
            View All Quizzes
          </button>
        </div>
      </section>

      <div className="bg-blue-700 rounded-xl text-center p-4 text-white font-medium animate-pulse">
        Next quiz in <span className="font-bold">5hours 43mins 20secs</span>
      </div>
      <JoinQuizModal
        isOpen={isModalOpen}
        userPlan={{ plan: "free", planCost: 0 }}
        balance={0}
        onClose={(type?: string) => {
          //  if (type === "enrolled") setType("enrolled");
          setIsModalOpen(false);
        }}
      />
    </main>
  );
};

export default dashboard;
