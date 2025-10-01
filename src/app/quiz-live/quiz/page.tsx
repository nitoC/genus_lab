"use client";
import BellIcon from "@/assets/icons/Bell";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
    correctAnswer: "Harper Lee",
  },
];

const LiveQuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleNext = () => {
    setAnsweredQuestions((prev) => prev + 1);
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handlePrev = () => {
    setAnsweredQuestions((prev) => Math.max(prev - 1, 0));
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    setAnsweredQuestions((prev) => prev + 1);
    setIsSubmitted(true);
    const calculatedScore = Math.floor(Math.random() * 100);
    setScore(calculatedScore);
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-red-500";
    if (timeLeft <= 300) return "text-yellow-500";
    return "text-green-500";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const renderButtons = () => {
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === quizData.length - 1;

    return (
      <div className="flex justify-center mt-6 space-x-4">
        {!isFirstQuestion && (
          <button
            onClick={handlePrev}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Prev
          </button>
        )}
        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const WavyBorder = () => (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg
        className="absolute top-0 left-0 w-full h-4"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <polyline
          points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10"
          stroke="#4299e1"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-4 rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <polyline
          points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10"
          stroke="#4299e1"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );

  const progressBarWidth = (answeredQuestions / quizData.length) * 100;

  return (
    <>
      <header className="bg-[#14223d] p-4">
        <Image
          src="/images/logo_desktop.png"
          alt="logo"
          width={146}
          height={49}
        />
      </header>
      <div className="bg-[#14223d] min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <style>
          {`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotateZ(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotateZ(360deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: white;
          animation: confetti-fall linear infinite;
        }
        .confetti-1 { left: 10%; background-color: #f6ad55; animation-duration: 5s; }
        .confetti-2 { left: 20%; background-color: #63b3ed; animation-duration: 4s; }
        .confetti-3 { left: 30%; background-color: #a0aec0; animation-duration: 6s; }
        .confetti-4 { left: 40%; background-color: #e53e3e; animation-duration: 3s; }
        .confetti-5 { left: 50%; background-color: #48bb78; animation-duration: 7s; }
        .confetti-6 { left: 60%; background-color: #667eea; animation-duration: 5.5s; }
        .confetti-7 { left: 70%; background-color: #e53e3e; animation-duration: 4.5s; }
        .confetti-8 { left: 80%; background-color: #f6ad55; animation-duration: 6.5s; }
        .confetti-9 { left: 90%; background-color: #48bb78; animation-duration: 3.5s; }
        .confetti-10 { left: 5%; background-color: #63b3ed; animation-duration: 4.8s; }
      `}
        </style>

        {isSubmitted && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`confetti-piece confetti-${i + 1}`}></div>
            ))}
          </div>
        )}

        {/* <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Genus Lab</h1>
        </div> */}

        <div className="relative w-full max-w-4xl p-[1rem] bg-[#2d3748] rounded-xl shadow-lg mt-8 overflow-hidden">
          <WavyBorder />

          <div className="relative z-10 mb-6 text-center">
            <div className="bg-yellow-200 text-black px-6 py-2 rounded-full font-bold mb-4 w-full text-center">
              Question {currentQuestionIndex + 1}
            </div>
            <h2 className="text-3xl font-bold mb-6">
              {quizData[currentQuestionIndex].question}
            </h2>
          </div>

          <div className="relative z-10 flex flex-col-reverse p-4 md:p-12 md:flex-row items-center justify-between">
            {!isSubmitted ? (
              <>
                <div className="w-full md:w-2/4">
                  <ul className="space-y-4">
                    {quizData[currentQuestionIndex].options.map(
                      (option, index) => (
                        <li
                          key={index}
                          onClick={() => setSelectedOption(option)}
                          className={`
                        p-4 border-2 rounded-lg cursor-pointer transition
                        ${
                          selectedOption === option
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-transparent border-gray-600 hover:border-blue-500"
                        }
                      `}
                        >
                          {option}
                        </li>
                      )
                    )}
                  </ul>

                  <div className="mt-8">
                    <div className="h-2 bg-gray-600 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${progressBarWidth}%` }}
                      ></div>
                    </div>
                    <div className="text-center text-sm text-gray-300 mt-2">
                      {answeredQuestions} / {quizData.length} answered
                    </div>
                  </div>

                  {renderButtons()}
                </div>

                <div className="flex md:flex-col justify-between w-full md:w-fit items-center mt-8 md:mt-0 md:ml-8">
                  <div className="flex md:flex-col p-4 gap-2 items-center">
                    <img
                      src="/images/woman.png"
                      alt="User avatar"
                      className="rounded-full border-4 border-yellow-300 w-24 h-24 mb-2"
                    />
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Burna
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <BellIcon />
                    </div>
                    <span
                      className={`text-4xl font-bold ml-2 ${getTimerColor()}`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full text-center">
                <div className="bg-yellow-200 text-black px-6 py-2 rounded-full font-bold mb-8 mx-auto w-40">
                  View answers
                </div>
                <h2 className="text-5xl font-bold mb-4">Your score</h2>
                <p className="text-8xl font-bold text-blue-500 mb-8">
                  {score}%
                </p>
                <div className="flex justify-center gap-6">
                  <button
                    className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </button>
                  <Link
                    href={"/quiz"}
                    className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveQuizPage;
