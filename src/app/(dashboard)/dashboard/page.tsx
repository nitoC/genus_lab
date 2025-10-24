"use client";
import React, { useState, useEffect } from "react";
import BalanceCard from "@/components/Cards/BalanceCard";
import QuizCard from "@/components/Cards/QuizCard";
import { JoinQuizModal } from "@/components/modals/Quiz";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import QuizEnrollmentCard from "@/components/QuizEnrollment";
import getSessionStorage from "@/utils/getSessionStorage";
import Link from "next/link";
import Image from "next/image";

let text =
  "You have successfully enrolled in the 'Global Trivia Challenge'. Here are your quiz details:";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [type, setType] = useState("dash");
  const [countdown, setCountdown] = useState("Next quiz in —");
  const user = getSessionStorage("user");
  const [userData, setUserData] = useState(user ? JSON.parse(user) : null);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          No user data found. Please <Link href={"/login"}>login</Link>.
        </p>
      </div>
    );
  }

  // COUNTDOWN TIMER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();

      let nextQuizHour = null;
      const quizHours = [7, 9, 11, 13, 15, 17, 19]; // Quiz start hours

      if (currentHour >= 21) {
        // After 9 PM → next quiz tomorrow at 7 AM (countdown till 7 AM)
        const nextDay = new Date(now);
        nextDay.setDate(now.getDate() + 1);
        nextDay.setHours(7, 0, 0, 0);
        updateCountdown(nextDay, now);
        return;
      }

      if (currentHour < 5) {
        // Before 5 AM → countdown till 5 AM idle period, then 2-hour till 7 AM
        const nextTarget = new Date(now);
        nextTarget.setHours(7, 0, 0, 0);
        updateCountdown(nextTarget, now);
        return;
      }

      if (currentHour >= 5 && currentHour < 7) {
        // 5 AM → countdown till first quiz at 7 AM
        const nextTarget = new Date(now);
        nextTarget.setHours(7, 0, 0, 0);
        updateCountdown(nextTarget, now);
        return;
      }

      // Between 7 AM and 9 PM
      for (let i = 0; i < quizHours.length; i++) {
        const start = quizHours[i];
        const end = start + 2;
        if (currentHour >= start && currentHour < end) {
          // Currently in a quiz (unavailable)
          const nextTarget = new Date(now);
          nextTarget.setHours(end, 0, 0, 0);
          updateCountdown(nextTarget, now);
          return;
        }
        if (currentHour < start) {
          nextQuizHour = start;
          break;
        }
      }

      if (nextQuizHour === null) {
        // After last quiz before 9 PM
        const nextTarget = new Date(now);
        nextTarget.setHours(21, 0, 0, 0);
        updateCountdown(nextTarget, now);
      } else {
        const nextTarget = new Date(now);
        nextTarget.setHours(nextQuizHour, 0, 0, 0);
        updateCountdown(nextTarget, now);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateCountdown = (target: Date, now: Date) => {
    const diff = target.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setCountdown(`Next quiz in ${hours}hours ${minutes}mins ${seconds}secs`);
  };

  const handleNoticeModal = () => setIsNoticeModalOpen(!isNoticeModalOpen);

  return (
    <main className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl dark:text-blue font-semibold">
          Welcome back,{" "}
          {userData && userData.fullname.split(" ").length > 1
            ? userData.fullname.split(" ")[1]
            : userData.fullname.split(" ")[0]}
          !
        </h2>
        <p className="text-gray-400">
          Here’s a quick overview of your account and active quizzes.
        </p>
      </section>

      <BalanceCard />

      {type === "enrolled" ? (
        <QuizEnrollmentCard
          text={text}
          settype={(val: string) => setType(val)}
        />
      ) : (
        <section className="flex flex-col gap-6">
          <section>
            <h3 className="text-xl dark:text-blue font-semibold mt-6">
              Upcoming Quizzes
            </h3>
            <div
              className={
                true
                  ? "flex gap-4 overflow-x-auto py-2 hori-scroll"
                  : "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
              }
            >
              <QuizCard title="General Knowledge Quiz" time="7:00am-9:00am" />
              <QuizCard title="General Knowledge Quiz" time="9:00am-11:00am" />
              <QuizCard title="Genus Quiz Challenge" time="11:00am-1:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="1:00pm-3:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="3:00pm-5:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="5:00pm-7:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="7:00pm-9:00pm" />
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
              <Link
                href={"/quiz?page=all"}
                className="btn-rich btn-outline dark:bg-transparent"
              >
                View All Quizzes
              </Link>
            </div>
          </section>

          {/* Countdown Display */}
          <section>
            <div className="rounded-xl text-center p-4 text-white font-medium animate-bl flex justify-between items-center bg-blue-600">
              <div className="px-4">{countdown}</div>
              <button className="relative" onClick={handleNoticeModal}>
                <NotificationsDropdown
                  isOpen={isNoticeModalOpen}
                  onClose={handleNoticeModal}
                />
                <IoNotificationsCircleSharp className="mt-2 h-6 w-6" />
              </button>
            </div>
            <JoinQuizModal
              isOpen={isModalOpen}
              onClose={(type?: string) => {
                if (type === "enrolled") setType("enrolled");
                setIsModalOpen(false);
              }}
            />
          </section>
        </section>
      )}
    </main>
  );
};

// ================== NotificationsDropdown =====================
const NotificationsDropdown = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const notifications = [
    {
      id: 1,
      text: "Account top up successful",
      date: "Jun 8th",
      isRead: false,
    },
    {
      id: 2,
      text: "Your account top up failed",
      date: "Feb 10th",
      isRead: true,
    },
    {
      id: 3,
      text: "You've been enrolled. Stay updated",
      date: "Jul 8th",
      isRead: false,
    },
    { id: 4, text: "Upcoming quiz 12.10.2025", date: "Jan 1st", isRead: false },
    {
      id: 5,
      text: "Withdrawal attempt failed",
      date: "Aug 2nd",
      isRead: false,
    },
  ];

  return (
    <div
      className={`
        fixed inset-0 z-50 transform transition-transform duration-300
        md:absolute md:inset-auto md:w-80 md:h-96 md:top-[-375px]
        md:right-0 md:mt-2 md:rounded-lg md:shadow-lg
        md:bg-white md:border md:border-gray-200
        ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full md:translate-x-0 md:scale-0"
        }
      `}
    >
      <div className="bg-white h-full md:rounded-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <style>
          {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: transparent;
            border-radius: 20px;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
          }
        `}
        </style>
        <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                n.isRead ? "text-gray-500" : "text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-3">
                  <Image
                    className="rounded-full w-8 h-8"
                    width={20}
                    height={20}
                    src="/images/woman.png"
                    alt="User"
                  />
                </div>
                <p className="text-sm">{n.text}</p>
              </div>
              <p className="text-xs text-gray-400">{n.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
