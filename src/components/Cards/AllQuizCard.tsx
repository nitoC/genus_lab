import React from "react";

const QuizCard = ({
  title,
  score,
  status,
  image,
}: {
  title: any;
  score: any;
  status: any;
  image: any;
}) => {
  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex-1 pr-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-md text-gray-600">Score {score}</p>
        <span
          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
      <div className="w-48 h-32 ml-4 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={`Image for ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default QuizCard;
