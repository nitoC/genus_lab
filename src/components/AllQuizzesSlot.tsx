import React from "react";

// This is a reusable component for each quiz performance card
const QuizPerformanceCard = ({ quizData }: { quizData: any }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg my-4">
      <div className="flex flex-col items-start space-y-2">
        <p className="text-gray-500 dark:text-blue text-sm">
          Quiz {quizData.id}
        </p>
        <h3 className="text-xl dark:text-gray-400 font-semibold">
          {quizData.quizName}
        </h3>
        <p className="text-gray-700">Score {quizData.score}</p>
        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
          Completed
        </span>
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4 relative">
        <img
          src={quizData.image}
          alt={`Image for ${quizData.quizName}`}
          className="rounded-lg object-cover w-48 h-32 md:w-64 md:h-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white text-3xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// This is the main component that renders the list of quiz performances
const PreviousQuizPerformance = () => {
  const quizzes = [
    {
      id: 1,
      quizName: "Genus Quiz Challenge",
      score: 90,
      image: "https://placehold.co/600x400/000000/FFFFFF/png?text=Quiz+1",
    },
    {
      id: 2,
      quizName: "General Knowledge Quiz",
      score: 70,
      image: "https://placehold.co/600x400/000000/FFFFFF/png?text=Quiz+2",
    },
    {
      id: 3,
      quizName: "History Quiz",
      score: 50,
      image: "https://placehold.co/600x400/000000/FFFFFF/png?text=Quiz+3",
    },
    {
      id: 4,
      quizName: "History Quiz",
      score: 50,
      image: "https://placehold.co/600x400/000000/FFFFFF/png?text=Quiz+4",
    },
  ];

  return (
    <div className=" p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold dark:text-blue text-gray-800 mb-6">
          Previous Quiz Performances
        </h2>
        {quizzes.map((quiz) => (
          <QuizPerformanceCard key={quiz.id} quizData={quiz} />
        ))}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-200 transition-colors">
            Prev
          </button>
          <button className="px-6 py-2 rounded-full border border-blue-500 text-white bg-blue-500 hover:bg-blue-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousQuizPerformance;
