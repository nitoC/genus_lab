"use client";

import React, { useState, useEffect } from "react";
import BalanceCard from "@/components/Cards/BalanceCard";
import QuizCard from "@/components/Cards/QuizCard";
import { JoinQuizModal } from "@/components/modals/Quiz";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import QuizEnrollmentCard from "@/components/QuizEnrollment";
import getSessionStorage from "@/utils/getSessionStorage";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/store/useUser";
import useCountdown from "@/hooks/useCountdown";
import { useTime } from "@/hooks/useTime";
import { useSocket } from "@/store/useSocket";
import { useRouter } from "next/navigation";
import { useQuizHours } from "@/store/useQuizHours";

/* ================= Quiz Not Started Modal ================= */

const QuizNotStartedModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaRegClock className="text-blue-600 text-3xl" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quiz Not Started
          </h2>
        </div>

        <div className="flex gap-3 text-gray-600 dark:text-gray-300">
          <MdOutlineInfo className="text-xl mt-1" />
          <p>
            This quiz epoch is yet to start.
            <br />
            Please wait until the scheduled start time.
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= Dashboard ================= */

const Dashboard = () => {
  const router = useRouter();
  const socketId = useSocket((state: any) => state.socketId);
  const loggedInUser = useUser((state: any) => state.user);

  const [userData, setUserData] = useState<any>();
  const [targetEpoch, setTargetEpoch] = useState<number | null>(null);
  const [Sid, setSid] = useState("");
  const [countdown, setCountdown] = useState("Next quiz in —");
  const [showNotStartedModal, setShowNotStartedModal] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("dash");

  const loading = !userData;

  useEffect(() => {
    const user = getSessionStorage("user");
    user ? setUserData(JSON.parse(user)) : router.push("/login");
  }, []);

  useEffect(() => {
    setSid(socketId);
  }, [socketId]);

  /* ---------- Socket Epoch ---------- */
  const handleTimerUpdate = (epoch: number) => {
    setTargetEpoch(epoch);
  };

  useTime(socketId, handleTimerUpdate);

  useCountdown(
    targetEpoch,
    "dash",
    (
      val:
        | string
        | { days: number; hours: number; minutes: number; seconds: number }
    ) => {
      setCountdown(typeof val === "string" ? val : `Next quiz in —`);
    }
  );

  /* ---------- Quiz Card Click Logic ---------- */
  const handleQuizClick = (
    e: React.MouseEvent,
    quizHour: number,
    episode: number
  ) => {
    e.preventDefault();
    if (!targetEpoch) return;

    const now = Date.now();
    const quizStart = new Date(targetEpoch);
    quizStart.setHours(quizHour, 0, 0, 0);

    const startEpoch = quizStart.getTime();
    const endEpoch = startEpoch + 2 * 60 * 60 * 1000;

    if (now < startEpoch) {
      setShowNotStartedModal(true);
      return;
    }

    if (now >= startEpoch && now < endEpoch) {
      router.push(`/quiz-online/${Sid}`);
      return;
    }

    router.push(`/quiz/results?episode=${episode}`);
  };

  const handleNoticeModal = () => setIsNoticeModalOpen(!isNoticeModalOpen);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  /* ================= Render ================= */

  return (
    <main className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl dark:text-gray-500 font-semibold">
          Welcome back,{" "}
          <span className="text-blue">
            {userData?.fullname?.split(" ")[0]}!
          </span>
        </h2>
        <p className="text-gray-400 mt-2">
          Here’s a quick overview of your account and active quizzes.
        </p>
      </section>

      <BalanceCard />

      {type === "enrolled" ? (
        <QuizEnrollmentCard
          text="You have successfully enrolled in the quiz."
          settype={(val: string) => setType(val)}
        />
      ) : (
        <section className="flex flex-col gap-6">
          <section>
            <h3 className="text-xl dark:text-gray-500 font-semibold mt-6">
              Upcoming Quizzes
            </h3>

            <div className="flex gap-4 overflow-x-auto py-2 hori-scroll">
              <div
                onClick={(e) => handleQuizClick(e, 7, 1)}
                className="cursor-pointer"
              >
                <QuizCard title="Genus Quiz" time="7:00am-9:00am" episode={1} />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 9, 2)}
                className="cursor-pointer"
              >
                <QuizCard
                  title="Genus Quiz"
                  time="9:00am-11:00am"
                  episode={2}
                />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 11, 3)}
                className="cursor-pointer"
              >
                <QuizCard
                  title="Genus Quiz"
                  time="11:00am-1:00pm"
                  episode={3}
                />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 13, 4)}
                className="cursor-pointer"
              >
                <QuizCard title="Genus Quiz" time="1:00pm-3:00pm" episode={4} />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 15, 5)}
                className="cursor-pointer"
              >
                <QuizCard title="Genus Quiz" time="3:00pm-5:00pm" episode={5} />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 17, 6)}
                className="cursor-pointer"
              >
                <QuizCard title="Genus Quiz" time="5:00pm-7:00pm" episode={6} />
              </div>
              <div
                onClick={(e) => handleQuizClick(e, 19, 7)}
                className="cursor-pointer"
              >
                <QuizCard title="Genus Quiz" time="7:00pm-9:00pm" episode={7} />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Link href={`/quiz-online/${Sid}`} className="btn-rich btn-green">
                Join Quiz
              </Link>
              <Link
                href={"/quiz?page=all"}
                className="btn-rich btn-outline dark:bg-transparent"
              >
                View All Quizzes
              </Link>
            </div>
          </section>

          {/* Countdown + Notifications */}
          <section>
            <div className="rounded-xl text-center p-4 text-white flex justify-between items-center bg-blue-600">
              <div>{countdown}</div>
              <div
                className="relative cursor-pointer"
                onClick={handleNoticeModal}
              >
                <NotificationsDropdown
                  isOpen={isNoticeModalOpen}
                  onClose={handleNoticeModal}
                />
                <IoNotificationsCircleSharp className="h-6 w-6" />
              </div>
            </div>

            <JoinQuizModal
              isOpen={isModalOpen}
              userPlan={{ plan: "free", planCost: 0 }}
              balance={0}
              onClose={(type?: string) => {
                if (type === "enrolled") setType("enrolled");
                setIsModalOpen(false);
              }}
            />
          </section>
        </section>
      )}

      {/* Quiz Not Started Modal */}
      <QuizNotStartedModal
        open={showNotStartedModal}
        onClose={() => setShowNotStartedModal(false)}
      />
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
  ];

  return (
    <div
      className={`fixed text-gray-600 inset-0 z-50 md:absolute md:inset-auto md:w-80 md:h-96 md:top-[-375px] md:right-0 bg-white border rounded-lg shadow-lg ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Notifications</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {notifications.map((n) => (
          <div key={n.id} className="py-2 border-b text-sm">
            {n.text}
            <span className="block text-xs text-gray-400">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
