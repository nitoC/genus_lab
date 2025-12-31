"use client";

import useQuestion from "@/hooks/useQuestion";
import { useUser } from "@/store/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { IoReturnDownBack } from "react-icons/io5";

const QuizLivePage = () => {
  const sid = useUser((state: any) => state.socketId);
  const { socketId } = useParams();
  const router = useRouter();
  const quizHandler = useQuestion(socketId, sid);

  const [agree, setAgree] = useState(false);
  const [gender, setGender] = useState("");
  const [marketing, setMarketing] = useState("");
  const [dob, setDob] = useState<Date>();
  const [loading, setLoading] = useState(false);

  if (!quizHandler.isId)
    return (
      <p>
        unauthorized page <Link href="/dashboard"> go back</Link>
      </p>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:flex-row">
          {/* Left / Image */}
          <div className="relative hidden sm:block sm:h-96 lg:flex-1 lg:min-h-[720px]">
            <Image
              src="/images/human-laptop.png"
              alt="Signup illustration"
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
              className="absolute right-5 top-5 rounded-full !bg-blue/70 px-4 py-1.5 text-xs font-medium !no-underline !text-white backdrop-blur transition hover:!bg-blue"
            >
              Back to dashboard →
            </Link>
          </div>

          {/* Right / Content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-14 sm:px-10 lg:px-16">
            <div>
              <Image src="/images/logo.png" alt="Logo" width={70} height={70} />
            </div>

            <div className="w-full max-w-md">
              <h1 className="text-center text-4xl font-semibold">Get Ready</h1>
            </div>

            <div className="flex w-full max-w-md flex-col gap-4">
              <p className="text-center">
                Your live quiz starts now and runs for just 5 minutes. Stay
                sharp and move fast — every second counts!
              </p>

              {/* Practice Button */}
              <Link
                href={`/quiz-online/${socketId}/demo`}
                className="w-full rounded-xl bg-green-600 px-4 py-2 text-center text-white transition hover:bg-green-700"
              >
                Practice
              </Link>

              {/* Disabled Take Quiz Button */}
              <button
                disabled={true}
                onClick={() => {
                  // router.push(`/quiz-online/${socketId}/quiz`);
                }}
                className={
                  true
                    ? `w-full cursor-not-allowed rounded-xl bg-gray-300 px-4 py-2 text-gray-500`
                    : `w-full rounded-xl bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700`
                }
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
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
