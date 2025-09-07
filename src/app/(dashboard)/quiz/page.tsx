"use client";
import AllQuizzesSlot from "@/components/AllQuizzesSlot";
import QuizEnrollmentCard from "@/components/QuizEnrollment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const QuizzesPage = () => {
  // Target date in the future (e.g., 2 days from now)
  let text =
    "You Are  enrolled in the 'Global Trivia Challenge'. Here are your quiz details:";
  const targetDate =
    new Date().getTime() +
    // 2 * 24 * 60 * 60 * 1000 +
    // 12 * 60 * 60 * 1000 +
    1 * 60 * 1000 +
    45 * 1000;

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [type, setType] = useState("dash");

  // Helper function to calculate the remaining time
  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const days = String(
      Math.floor(difference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    const hours = String(
      Math.floor((difference / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((difference / (1000 * 60)) % 60)
    ).padStart(2, "0");
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
      2,
      "0"
    );

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === "00" &&
        newTimeLeft.hours === "00" &&
        newTimeLeft.minutes === "00" &&
        newTimeLeft.seconds === "00"
      ) {
        setIsCountdownFinished(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-blue">
            Quizzes
          </h2>
          <p className="text-gray-500 mt-1">
            Here's a quick overview of your account and active quizzes.
          </p>
        </div>

        <div className="mb-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-blue/50 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm dark:text-white">
              Last week score
            </p>
            <p className="text-5xl font-bold text-gray-800 mt-2 dark:text-white">
              85
            </p>
          </div>
          <img
            src="https://placehold.co/150x150/2A8CFF/FFFFFF?text=G"
            alt="Quiz background"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-24 w-24 opacity-20 rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r dark:from-blue/80 dark:via-blue/40 from-white via-white to-transparent"></div>
        </div>
        {type !== "enrolled" ? (
          <section>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-blue">
                Upcoming Quizzes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {countdown.map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-100 dark:bg-mygrey/30 p-6 rounded-xl"
                  >
                    <p className="text-4xl font-bold text-blue-500">
                      {item.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-white/50 uppercase tracking-wider mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="btn-container flex gap-4">
                {isCountdownFinished && (
                  <button className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-600 transition-all">
                    Join
                  </button>
                )}
                <button
                  onClick={() => setType("enrolled")}
                  className="w-full sm:w-auto bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  View Details
                </button>
              </div>
              <Link
                href="/quiz?page=all"
                className="font-semibold text-blue-500 hover:underline flex items-center gap-2"
              >
                View all Quizzes
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </Link>
            </div>
          </section>
        ) : (
          <QuizEnrollmentCard text={text} settype={(val) => setType(val)} />
        )}
      </div>
    </div>
  );
};

const QuizzesLayout = () => {
  const query = useSearchParams();
  const queryType = query.get("page");
  if (queryType === "all") {
    return <AllQuizzesSlot />;
  }
  return <QuizzesPage />;
};

export default QuizzesLayout;
