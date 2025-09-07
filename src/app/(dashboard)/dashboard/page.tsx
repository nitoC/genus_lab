"use client";
import React, { useState } from "react";
import BalanceCard from "@/components/Cards/BalanceCard";
import QuizCard from "@/components/Cards/QuizCard";
import { JoinQuizModal } from "@/components/modals/Quiz";
import { IoClose, IoNotificationsCircleSharp } from "react-icons/io5";
import { FaUser, FaQuestionCircle, FaClock, FaListAlt } from "react-icons/fa";
import QuizEnrollmentCard from "@/components/QuizEnrollment";
import getSessionStorage from "@/utils/getSessionStorage";
import Link from "next/link";

let text =
  "You have successfully enrolled in the 'Global Trivia Challenge'. Here are your quiz details:";

const dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [type, setType] = useState("dash"); // Change to "upcoming" to test the other view
  const user = getSessionStorage("user");
  const [userData, setuserData] = useState(user ? JSON.parse(user) : null);
  console.log(user, "user from session storage");
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          No user data found. Please <Link href={"/login"}>login</Link>.
        </p>
      </div>
    );
  }
  const handleNoticeModal = () => {
    setIsNoticeModalOpen(!isNoticeModalOpen);
  };
  return (
    <main className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl dark:text-blue font-semibold">
          Welcome back, {userData && userData.fullname.split(" ")[1]}!
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <QuizCard title="General Knowledge Quiz" time="7:00am-9:00am" />
              <QuizCard title="General Knowledge Quiz" time="9:00am-11:00am" />
              <QuizCard title="Genus Quiz Challenge" time="11:00am-1:00pm" />
              <QuizCard title="Genus Quiz Challenge" time="1:00pm-3:00pm" />
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
          <section>
            <div className="bg-blue-700 rounded-xl text-center p-4 text-white font-medium animate-pulse flex justify-between items-center">
              <div className="px-4">
                Next quiz in{" "}
                <span className="font-bold">5hours 43mins 20secs</span>
              </div>
              <button className="relative" onClick={handleNoticeModal}>
                <NotificationsDropdown
                  isOpen={isNoticeModalOpen}
                  onClose={handleNoticeModal}
                />
                <IoNotificationsCircleSharp className=" mt-2 h-6 w-6" />
              </button>
            </div>
            <JoinQuizModal
              isOpen={isModalOpen}
              onClose={(type?: string) => {
                type === "enrolled" && setType("enrolled");

                setIsModalOpen(false);
              }}
            />
          </section>
        </section>
      )}
    </main>
  );
};

const NotificationsDropdown = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Logic to be implemented by the user
  const notifications = [
    {
      id: 1,
      text: "Account top up successfull",
      date: "Jun 8th",
      isRead: false,
    },
    {
      id: 2,
      text: "your account top up failed",
      date: "Feb 10th",
      isRead: true,
    },
    {
      id: 3,
      text: "Youv been enrolled stay updated",
      date: "Jul 8th",
      isRead: false,
    },
    {
      id: 4,
      text: "Upcoming quiz 12.10.12025",
      date: "Jan 1st",
      isRead: false,
    },
    {
      id: 5,
      text: "Account top up successfull",
      date: "Jun 8th",
      isRead: true,
    },
    {
      id: 6,
      text: "Withdrawal attempt failed",
      date: "Aug 2nd",
      isRead: false,
    },
    {
      id: 7,
      text: "Account top up successfull",
      date: "Jun 8th",
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Custom styles to hide scrollbar and show on hover */}
        <style>
          {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: transparent;
            border-radius: 20px;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #d1d5db; /* A light gray color */
          }
          .custom-scrollbar {
            scrollbar-width: thin; /* For Firefox */
            scrollbar-color: transparent transparent;
          }
          .custom-scrollbar:hover {
            scrollbar-color: #d1d5db transparent;
          }
        `}
        </style>
        <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                notification.isRead ? "text-gray-500" : "text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-3">
                  <img
                    className="w-full h-full rounded-full"
                    src="/images/woman.png"
                    alt="User"
                  />
                </div>
                <p className="text-sm">{notification.text}</p>
              </div>
              <p className="text-xs text-gray-400">{notification.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default dashboard;
