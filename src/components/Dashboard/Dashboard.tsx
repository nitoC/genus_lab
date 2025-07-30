import React from "react";
import BalanceCard from "../Cards/BalanceCard";
import QuizCard from "../Cards/QuizCard";

const dashboard = () => {
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
          <QuizCard title="General Knowledge Quiz" time="7:00am-9:00am" />
          <QuizCard title="General Knowledge Quiz" time="9:00am-11:00am" />
          <QuizCard title="Genus Quiz Challenge" time="11:00am-1:00pm" />
          <QuizCard title="Genus Quiz Challenge" time="1:00pm-3:00pm" />
        </div>
        <div className="flex gap-4 mt-4">
          <button className="bg-green-500 text-black dark:text-white px-4 py-2 rounded-full">
            Join Quiz
          </button>
          <button className=" text-black dark:text-blue px-4 py-2 rounded-full">
            View All Quizzes
          </button>
        </div>
      </section>

      <div className="bg-blue-700 rounded-xl text-center p-4 text-black dark:text-white font-medium animate-pulse">
        Next quiz in <span className="font-bold">5hours 43mins 20secs</span>
      </div>
    </main>
  );
};

export default dashboard;
