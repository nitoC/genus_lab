import React from "react";
import QuizCard from "@/components/Cards/AllQuizCard";
import Back from "@/components/Buttons/Back";

const QuizPerformanceList = () =>
  // { quizzes }: { quizzes: any }
  {
    const quizzes = [
      {
        title: "Genus Quiz Challenge",
        score: 90,
        status: "Completed",
        image: "/images/quiz-img.png",
      },
      {
        title: "General Knowledge Quiz",
        score: 70,
        status: "Completed",
        image: "/images/box.png",
      },
      {
        title: "History Quiz",
        score: 50,
        status: "Completed",
        image: "/images/doc.png",
      },
    ];
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Back />
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Previous Quiz Performances
          </h2>
        </div>
        <div className="space-y-4">
          {quizzes.map((quiz: any, index: number) => (
            <QuizCard
              key={index}
              title={quiz.title}
              score={quiz.score}
              status={quiz.status}
              image={quiz.image}
            />
          ))}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Prev
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    );
  };

export default QuizPerformanceList;
