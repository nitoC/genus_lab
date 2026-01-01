"use client";

import useQuestion from "@/hooks/useQuestion";
import { useUser } from "@/store/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import {
  FaPlayCircle,
  FaLock,
  FaRocket,
  FaTimes,
  FaCrown,
} from "react-icons/fa";

const QuizLivePage = () => {
  const sid = useUser((state: any) => state.socketId);
  const { socketId } = useParams();
  const router = useRouter();
  const quizHandler = useQuestion(socketId, sid);

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);

  if (!quizHandler.isId)
    return (
      <p>
        unauthorized page <Link href="/dashboard"> go back</Link>
      </p>
    );

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:flex-row">
            {/* Left */}
            <div className="relative hidden sm:block sm:h-96 lg:flex-1 lg:min-h-[720px]">
              <Image
                src="/images/human-laptop.png"
                alt="Quiz illustration"
                fill
                className="object-cover"
                priority
              />
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={70}
                height={70}
                className="absolute left-5 top-5"
              />
              <Link
                href="/dashboard"
                className="absolute right-5 top-5 rounded-full bg-blue/80 px-4 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-blue"
              >
                Back to dashboard →
              </Link>
            </div>

            {/* Right */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-14 sm:px-10 lg:px-16">
              <Image src="/images/logo.png" alt="Logo" width={70} height={70} />

              <h1 className="text-center text-4xl font-semibold">Get Ready</h1>

              <p className="max-w-md text-center text-gray-600">
                Prepare yourself before jumping into the live challenge. Try the
                demo or unlock the live quiz experience.
              </p>

              <div className="flex w-full max-w-md flex-col gap-4">
                {/* Demo Button */}
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="flex items-center justify-center gap-3 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 hover:scale-[1.02]"
                >
                  <FaPlayCircle size={18} />
                  Demo Quiz
                </button>

                {/* Live Quiz Button */}
                <button
                  onClick={() => setShowLiveModal(true)}
                  className="flex items-center justify-center gap-3 rounded-xl bg-gray-300 px-4 py-3 font-medium text-gray-500 transition hover:bg-gray-400"
                >
                  <FaLock size={16} />
                  Live Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= DEMO MODAL ================= */}
      {showDemoModal && (
        <Modal onClose={() => setShowDemoModal(false)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FaRocket className="text-yellow-500" size={28} />
              <h2 className="text-2xl font-semibold">Demo Quiz</h2>
            </div>

            <p className="text-gray-600">
              The demo quiz lets you practice the interface, understand question
              timing, and build confidence before entering the live challenge.
            </p>

            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>No pressure — untimed practice</li>
              <li>Same format as live quiz</li>
              <li>Perfect warm-up before going live</li>
            </ul>

            <button
              onClick={() => router.push(`/quiz-online/${socketId}/demo`)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
            >
              Proceed to Demo
            </button>
          </div>
        </Modal>
      )}

      {/* ================= LIVE MODAL ================= */}
      {showLiveModal && (
        <Modal onClose={() => setShowLiveModal(false)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FaCrown className="text-yellow-500" size={28} />
              <h2 className="text-2xl font-semibold">Live Quiz Locked</h2>
            </div>

            <p className="text-gray-600">
              The live quiz is a premium experience. Subscribe to unlock
              real-time competition, leaderboards, and rewards.
            </p>

            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>5-minute timed challenge</li>
              <li>Compete with others live</li>
              <li>Rankings & performance insights</li>
            </ul>

            <button
              onClick={() => router.push("/subscribe")}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Subscribe Now
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

/* ================= MODAL COMPONENT ================= */

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

const QuizLive = () => {
  return (
    <Suspense fallback={<p>...LOADING PAGE</p>}>
      <QuizLivePage />
    </Suspense>
  );
};

export default QuizLive;
