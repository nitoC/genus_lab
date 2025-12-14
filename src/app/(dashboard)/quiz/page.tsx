"use client";
import AllQuizzesSlot from "@/components/AllQuizzesSlot";
import QuizEnrollmentCard from "@/components/QuizEnrollment";
import useCountdown from "@/hooks/useCountdown";
import { useTime } from "@/hooks/useTime";
import { socket } from "@/lib/api/socket";
import { useSocket } from "@/store/useSocket";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// // Custom hook for countdown
// const useCountdown = (targetEpoch: number | null) => {
//   const getTimeLeft = () => {
//     if (!targetEpoch) {
//       return null;
//     }

//     const now = targetEpoch;

//     console.log(targetEpoch, "target ecp");
//     const difference = 1765236179055 - now;

//     if (difference <= 0) {
//       return { days: "00", hours: "00", minutes: "00", seconds: "00" };
//     }

//     return {
//       days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
//         2,
//         "0"
//       ),
//       hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
//         2,
//         "0"
//       ),
//       minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
//         2,
//         "0"
//       ),
//       seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(getTimeLeft());
//   const [isFinished, setIsFinished] = useState(false);

//   useEffect(() => {
//     if (!targetEpoch) return;

//     const interval = setInterval(() => {
//       const updatedTime = getTimeLeft();
//       setTimeLeft(updatedTime);

//       if (
//         updatedTime?.seconds === "00" &&
//         updatedTime?.minutes === "00" &&
//         updatedTime?.hours === "00" &&
//         updatedTime?.days === "00"
//       ) {
//         setIsFinished(true);
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetEpoch]);

//   return { timeLeft, isFinished };
// };
interface Itime {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}
const QuizzesPage = () => {
  const router = useRouter();
  const socketId = useSocket((state: any) => state.socketId);

  const [targetEpoch, setTargetEpoch] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | Itime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  // const { timeLeft, isFinished } = { timeLeft: "0", isFinished: true }; //useCountdown(targetEpoch);
  const [type, setType] = useState("dash");

  const handleTimerUpdate = (data: number) => {
    if (data) {
      setTargetEpoch(data);
    }
  };

  const countdownItems = timeLeft
    ? [
        {
          value: String((timeLeft as Itime)?.days).padStart(2, "0"),
          label: "Days",
        },
        {
          value: String((timeLeft as Itime)?.hours).padStart(2, "0"),
          label: "Hours",
        },
        {
          value: String((timeLeft as Itime)?.minutes).padStart(2, "0"),
          label: "Minutes",
        },
        {
          value: String((timeLeft as Itime)?.seconds).padStart(2, "0"),
          label: "Seconds",
        },
      ]
    : [];
  useTime(socketId, handleTimerUpdate);
  useCountdown(targetEpoch, "quiz", setTimeLeft);
  const isFinished =
    timeLeft === "00" ||
    ((timeLeft as Itime).days === 0 &&
      (timeLeft as Itime).hours === 0 &&
      (timeLeft as Itime).minutes === 0 &&
      (timeLeft as Itime).seconds === 0);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* UI remains the same */}
      <div className="mb-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-blue/50 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-gray-500 text-sm dark:text-white">
            Last week score
          </p>
          <p className="text-5xl font-bold text-gray-800 mt-2 dark:text-white">
            85
          </p>
        </div>
      </div>

      {type !== "enrolled" ? (
        <section>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-blue">
              Upcoming Quizzes
            </h3>
            {timeLeft ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {countdownItems.map((item) => (
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
            ) : (
              <p className="text-gray-500">Waiting for event time…</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="btn-container flex gap-4">
              {isFinished && (
                <button
                  onClick={() => router.push("/quiz-live")}
                  className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-600 transition-all"
                >
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
              View past Quizzes
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </Link>
          </div>
        </section>
      ) : (
        <QuizEnrollmentCard
          text="You Are enrolled in the 'Global Trivia Challenge'. Here are your quiz details:"
          settype={(val) => setType(val)}
        />
      )}
    </div>
  );
};

const QuizzesLayout = () => {
  const query = useSearchParams();
  const queryType = query.get("page");

  return queryType === "all" ? <AllQuizzesSlot /> : <QuizzesPage />;
};

const QuizPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizzesLayout />
    </Suspense>
  );
};

export default QuizPage;
