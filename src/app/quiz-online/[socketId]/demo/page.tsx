"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import BellIcon from "@/assets/icons/Bell";
import AnimatedVoiceButton from "@/components/Buttons/Audio";
import useQuestion from "@/hooks/useQuestion";
import useScore from "@/hooks/useScore";
import { useUser } from "@/store/useUser";
import QuizReviewModal from "@/components/modals/ViewAnswers";
import getSessionStorage from "@/utils/getSessionStorage";
import { toast } from "react-toastify";
import { useSocketError } from "@/hooks/useErrorSocket";

type OptionTuple = [string, string];

const Loader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center p-8">
    <svg
      className="animate-spin h-6 w-6 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
      />
    </svg>
    <span className="text-sm text-gray-300">{text}</span>
  </div>
);

const QuizHeader: React.FC = () => (
  <header className="bg-[#14223d] p-4">
    <Image src="/images/logo_desktop.png" alt="logo" width={146} height={49} />
  </header>
);

const Timer: React.FC<{ seconds: number }> = ({ seconds }) => {
  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const colorClass = useMemo(() => {
    if (seconds <= 60) return "text-red-500";
    if (seconds <= 300) return "text-yellow-500";
    return "text-green-500";
  }, [seconds]);

  return (
    <div className="flex items-center">
      <div className="w-8 h-8 flex items-center justify-center">
        <BellIcon />
      </div>
      <span className={`text-4xl font-bold ml-2 ${colorClass}`}>
        {formatTime(seconds)}
      </span>
    </div>
  );
};

const OptionsList: React.FC<{
  options: Record<string, string> | OptionTuple[] | undefined;
  selected?: string | null;
  disabled?: boolean;
  onSelect: (value: string) => void;
  answeredForThisQuestion?: string | null;
}> = ({ options, selected, disabled, onSelect, answeredForThisQuestion }) => {
  // normalize options to array of tuples [key, label]
  const entries: OptionTuple[] = useMemo(() => {
    if (!options) return [];
    if (Array.isArray(options)) return options as OptionTuple[];
    return Object.entries(options) as OptionTuple[];
  }, [options]);

  if (!entries.length) return <p className="text-gray-300">No options</p>;

  return (
    <ul className="space-y-4">
      {entries.map((option, idx) => {
        const value = option[1];
        const isSelected = selected === value;
        const isAnswered = answeredForThisQuestion === option[0];

        return (
          <li
            key={idx}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(value);
            }}
            onClick={() => !disabled && onSelect(value)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition select-none focus:outline-none
              ${
                isSelected || isAnswered
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-transparent border-gray-600 hover:border-blue-500"
              }`}
            aria-pressed={isSelected}
            aria-disabled={disabled}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};

const ProgressBar: React.FC<{ answered: number; total: number }> = ({
  answered,
  total,
}) => {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  return (
    <div className="mt-8">
      <div className="h-2 bg-gray-600 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-center text-sm text-gray-300 mt-2">
        {answered} / {total} answered
      </div>
    </div>
  );
};

const ScoreScreen: React.FC<{
  score: number;
  onRetry: () => void;
  handleReview: () => void;
}> = ({ score, onRetry, handleReview }) => (
  <>
    <div className="w-full text-center">
      <button
        onClick={handleReview}
        className="bg-yellow-200 cursor-pointer text-black px-6 py-2 rounded-full font-bold mb-8 mx-auto w-40"
      >
        View answers
      </button>
      <h2 className="text-5xl font-bold mb-4">Your score</h2>
      <p className="text-8xl font-bold text-blue-500 mb-8">{score}%</p>

      <div className="flex justify-center items-center gap-6 flex-col md:flex-row">
        <button
          onClick={onRetry}
          className="px-8 py-3 text-xs md:text-[1rem] bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          Try Again
        </button>
        <Link
          href="/quiz"
          className="px-8 py-3 text-xs  md:text-[1rem] bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  </>
);

export default function LiveQuiz() {
  const router = useRouter();
  const sid = useUser((s: any) => s.socketId);
  const { socketId } = useParams();

  const [quizHandler, setQuizHandler] = useState<any | null>(null);
  const [scoreHandler, setScoreHandler] = useState<any | null>(null);
  const [quizData, setQuizData] = useState<any[] | null>(null);
  const [scoreData, setScoreData] = useState<any[] | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [review, setreview] = useState(false);

  // answers map: questionNumber -> optionKey (the first value from option tuple)
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const answeredCount = answers.size;
  const totalQuestions = quizData ? quizData.length : 0;

  const selectedForCurrentQuestion = useMemo(() => {
    const q = quizData?.[currentQuestionIndex];
    if (!q) return null;
    const key = answers.get(q.number);
    if (!key) return null;
    // find label for key
    const optEntries = Array.isArray(q.options)
      ? q.options
      : Object.entries(q.options || {});
    const found = optEntries.find((o: any[]) => o[0] === key || o[1] === key);
    return found ? (found[1] as string) : null;
  }, [answers, quizData, currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    if (!scoreHandler) return;
    setSubmitting(true);
    try {
      const payload = Array.from(answers.entries()).map(([number, key]) => ({
        number,
        answer: key,
      }));
      const userData = getSessionStorage("user");
      if (!userData) {
        toast.error("You must be logged in to submit answers");
        return setTimeout(() => router.push("/login"), 2000);
      }
      const user = JSON.parse(userData);
      console.log("Submitting answers for user:", user);
      // call handler (assumed to be sync or promise)
      await scoreHandler.handleScore(payload, user?.email, user?.api_key);
      // try to set score from scoreData if available
      const latest =
        scoreData && scoreData.length ? scoreData[scoreData.length - 1] : null;
      if (latest?.your_score !== undefined) {
        // show score from latest
      }
      setIsSubmitted(true);
    } catch (err) {
      // handle gracefully
      // eslint-disable-next-line no-console
      console.error(err);
      // eslint-disable-next-line no-alert
      alert("Failed to submit answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [scoreHandler, answers, router, scoreData]);

  // timer effect
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          // Automatically submit!
          handleSubmit();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, handleSubmit]);

  //get error with socket
  useSocketError(socketId as string);
  // get logged in user data
  useEffect(() => {
    const user = getSessionStorage("user");
    user ? setUserData(JSON.parse(user)) : router.push("/login");
  }, []);

  // setup handlers
  useEffect(() => {
    const qHandler = useQuestion(socketId, sid);
    const sHandler = useScore(socketId);
    setQuizHandler(qHandler);
    setScoreHandler(sHandler);

    // cleanup on unmount
    return () => {
      try {
        const qAny = qHandler as any;
        const sAny = sHandler as any;
        if (typeof qAny?.disconnect === "function") qAny.disconnect();
        if (typeof sAny?.disconnect === "function") sAny.disconnect();
      } catch (e) {
        // ignore
        toast.error("Error during cleanup of socket connections");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId, sid]);

  // connect quiz handler
  useEffect(() => {
    if (!quizHandler) return;
    quizHandler.handleConnection((val: any) => setQuizData(val));
    quizHandler.handleEvent?.();
    return () => {
      quizHandler.handleDisconnect();
    };
  }, [quizHandler]);
  let scoreCleanup: (() => void) | null = null;
  // connect score handler
  useEffect(() => {
    if (!scoreHandler) return;
    scoreCleanup = scoreHandler.handleConnection((val: any) => {
      setScoreData(val);
      const latest =
        Array.isArray(val) && val.length ? val[val.length - 1] : null;
      if (latest?.your_score !== undefined) {
        // keep numeric
      }
    });
    return () => {
      scoreCleanup?.();
    };
  }, [scoreHandler]);

  // guard: not authorized
  if (!quizHandler) return <Loader text="Connecting to quiz..." />;
  if (!quizHandler.isId)
    return (
      <div className="p-8 text-center text-white">
        <p>Unauthorized page.</p>
        <Link href="/dashboard" className="text-blue-300 underline">
          Go back
        </Link>
      </div>
    );

  const currentQuestion = quizData?.[currentQuestionIndex];

  const handleSelect = (value: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const next = new Map(prev);
      // Try to find option key corresponding to value
      const entries = Array.isArray(currentQuestion.options)
        ? currentQuestion.options
        : Object.entries(currentQuestion.options || {});
      const found = entries.find(
        (e: any[]) => e[1] === value || e[0] === value
      );
      const key = found ? found[0] : value;
      next.set(currentQuestion.number, key);
      return next;
    });
  };

  const goNext = () => {
    if (!currentQuestion) return;
    // require an answer before moving
    if (!answers.has(currentQuestion.number)) {
      // friendly inline feedback
      // eslint-disable-next-line no-alert
      alert("Please select an option before moving to the next question.");
      return;
    }
    setCurrentQuestionIndex((p) =>
      Math.min(p + 1, Math.max(0, (quizData?.length ?? 1) - 1))
    );
  };

  const goPrev = () => setCurrentQuestionIndex((p) => Math.max(p - 1, 0));

  const retry = () => {
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setSubmitting(false);
    setTimeLeft(300); // correct quiz time
  };

  return (
    <>
      {review && (
        <QuizReviewModal
          reviewData={scoreData && scoreData.length && [...scoreData]}
          // userAnswers={answers}
          onClose={() => setreview(false)}
        />
      )}
      <div className="min-h-screen bg-[#14223d] text-white">
        <QuizHeader />

        <main className="flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-4xl p-6 lg:bg-[url(/quiz_background.png)] bg-[url(/sm_quiz_background.png)] bg-cover lg:bg-contain aspect bg-no-repeat rounded-xl shadow-lg mt-8 bg-center">
            {/* celebration confetti when submitted */}
            {isSubmitted && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`confetti-piece confetti-${i + 1}`} />
                ))}
              </div>
            )}

            <div className="relative z-10 mb-6 text-center">
              <div className="bg-yellow-200 text-black px-6 max-w-2xs m-auto relative bottom-7.5 py-2 rounded-full font-bold mb-4 w-full text-center">
                Question {currentQuestionIndex + 1}
              </div>
              <h2 className="md:text-3xl text-xl  font-bold mb-6">
                {currentQuestion ? (
                  currentQuestion.question
                ) : (
                  <span className="text-gray-300">Waiting for question...</span>
                )}
              </h2>
            </div>

            <div className="relative z-10 flex flex-col-reverse p-4 md:p-12 md:flex-row items-center justify-between">
              {!isSubmitted ? (
                <>
                  <div className="w-full md:w-2/4">
                    {!currentQuestion ? (
                      <Loader text="Loading question..." />
                    ) : (
                      <>
                        <OptionsList
                          options={currentQuestion.options}
                          selected={selectedForCurrentQuestion}
                          onSelect={handleSelect}
                          disabled={submitting}
                          answeredForThisQuestion={
                            answers.get(currentQuestion.number) ?? null
                          }
                        />

                        <ProgressBar
                          answered={answeredCount}
                          total={totalQuestions}
                        />

                        <div className="flex justify-center items-center mt-6 space-x-4">
                          <button className="w-[100px] overflow-hidden">
                            <AnimatedVoiceButton />
                          </button>

                          {currentQuestionIndex > 0 && (
                            <button
                              onClick={goPrev}
                              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            >
                              Prev
                            </button>
                          )}

                          {currentQuestionIndex >=
                          (quizData?.length ?? 1) - 1 ? (
                            <button
                              onClick={handleSubmit}
                              disabled={submitting}
                              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition disabled:opacity-60"
                            >
                              {submitting ? "Submitting..." : "Submit"}
                            </button>
                          ) : (
                            <button
                              onClick={goNext}
                              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex md:flex-row flex-col-reverse gap-4 md:gap-0 justify-between w-full md:w-fit items-center mb-8 md:mt-0 md:ml-8">
                    <div className="flex flex-col text-xm md:text-base p-4 gap-2 items-center">
                      <Image
                        src="/images/woman.png"
                        alt="User avatar"
                        width={96}
                        height={96}
                        className="rounded-full border-4 border-yellow-300"
                      />
                      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                        Burna
                      </div>
                    </div>

                    <div className="flex items-center mt-4">
                      <Timer seconds={timeLeft} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full text-center">
                  <ScoreScreen
                    handleReview={() => {
                      // console.log(scoreData, "review");
                      // console.log([...scoreData], "score data review");
                      setreview(true);
                    }}
                    score={
                      scoreData && scoreData.length
                        ? scoreData[scoreData.length - 1].your_score ?? 0
                        : 0
                    }
                    onRetry={retry}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
