import React from "react";

// Custom component to handle the specific red/green border and background styling
const OptionBox = ({ option, isSelected, isCorrect, isCorrectAnswer }: any) => {
  let borderColor = "border-gray-300";
  let bgColor = "bg-white hover:bg-gray-50";
  let ringColor = "ring-transparent";

  if (isSelected && isCorrect) {
    // Selected and Correct
    borderColor = "border-green-500";
    bgColor = "bg-green-50";
    ringColor = "ring-green-500";
  } else if (isSelected && !isCorrect) {
    // Selected and Incorrect
    borderColor = "border-red-500";
    bgColor = "bg-red-50";
    ringColor = "ring-red-500";
  } else if (isCorrectAnswer && !isSelected) {
    // Correct but Not Selected
    borderColor = "border-green-400";
    bgColor = "bg-green-100/50";
  }

  // Determine the radio/circle icon color based on the state
  let radioIcon = (
    <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center mr-3">
      {isSelected && (
        <div
          className={`w-2 h-2 rounded-full ${
            isCorrect ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      )}
    </div>
  );

  if (isCorrectAnswer && !isSelected) {
    // Use green circle for the correct answer the user missed
    radioIcon = (
      <div className="w-4 h-4 rounded-full border border-green-500 flex items-center justify-center mr-3">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
    );
  } else if (!isSelected) {
    // Default unselected state
    radioIcon = (
      <div className="w-4 h-4 rounded-full border border-gray-400 mr-3"></div>
    );
  }

  return (
    <div
      className={`flex items-start p-3 md:p-4 rounded-lg shadow-sm border ${borderColor} ${bgColor} transition duration-150 ease-in-out ring-2 ${ringColor} ring-offset-1`}
    >
      {radioIcon}
      <span className="text-gray-800 text-sm md:text-base flex-1">
        {option}
      </span>
    </div>
  );
};

const QuizReviewModal = ({
  reviewData = [],
  onClose,
}: {
  reviewData: any;
  onClose: () => void;
}) => {
  const reviewDataFormated = reviewData.slice(0, reviewData.length - 1);
  // Guard clause to prevent rendering if modal should be closed or data is missing
  if (!reviewData || !reviewData.length) return null;
  console.log(reviewData, "in modal");

  return (
    // Modal Backdrop
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 font-sans">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Quiz Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition duration-150 p-1 -m-1"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="overflow-y-auto p-4 md:p-6 space-y-8">
          {reviewDataFormated.map((reviewItem: any, index: number) => {
            console.log(reviewItem, "review data in mapping");
            const { question, options, answer, explanation, your_answer } =
              reviewItem;

            // Extract the single letter answer key from 'your_answer', defaulting to null if missing
            // Assumes the format is "A" or "A text", so we take the first character.
            const userAnswerKey = your_answer
              ? your_answer.charAt(0).toUpperCase()
              : null;

            const isCorrect = userAnswerKey === answer;
            const optionKeys = Object.keys(options);
            const questionNumber = index + 1; // Use index + 1 for question numbering

            return (
              <div key={index} className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  Question {questionNumber}
                </h3>
                <p className="text-gray-600 font-medium">{question}</p>

                {/* Options List */}
                <div className="space-y-3">
                  {optionKeys.map((key) => {
                    const optionText = options[key];
                    const isUserAnswer = key === userAnswerKey;
                    const isCorrectAnswer = key === answer;

                    return (
                      <OptionBox
                        key={key}
                        option={optionText}
                        isSelected={isUserAnswer}
                        isCorrect={isCorrect}
                        isCorrectAnswer={isCorrectAnswer}
                      />
                    );
                  })}
                </div>

                {/* Answer Summary */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <p className="text-sm md:text-base">
                    <span className="font-bold mr-2">Your Answer:</span>
                    <span
                      className={`${
                        isCorrect ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      {userAnswerKey ? options[userAnswerKey] : "Not Answered"}
                    </span>
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-bold mr-2">Correct Answer:</span>
                    <span className="text-green-600 font-semibold">
                      {options[answer]}
                    </span>
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300">
                    <span className="font-bold text-gray-700 mr-2">
                      Explanation:
                    </span>
                    <span className="text-gray-600">{explanation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizReviewModal;
