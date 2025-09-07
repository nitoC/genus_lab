import { FaListAlt, FaQuestionCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const QuizEnrollmentCard = ({
  settype,
  text,
}: {
  settype: (type: string) => void;
  text: string;
}) => {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-lime-200/10">
      <div className="text-center mb-6">
        <h1 className="text-3xl dark:text-white font-bold text-gray-800 mb-2">
          Congratulations! You're Enrolled
        </h1>
        <p className="text-gray-600">{text}</p>
      </div>

      <div
        className="relative rounded-lg shadow-xl overflow-hidden max-w-2xl w-full p-6"
        style={{
          backgroundImage: `url('/path/to/your/circuit-board-image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="/images/woman.png"
                alt="Contestant"
              />
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-blue">123456</p>
              <p className="text-sm text-gray-500">Contestant Number</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <FaQuestionCircle className="text-blue-500" size={24} />
            <div>
              <p className="font-bold text-gray-800 dark:text-blue">
                Genus Quiz Challenge
              </p>
              <p className="text-sm text-gray-500">Quiz Name</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <FaClock className="text-green-500" size={24} />
            <div>
              <p className="font-bold text-gray-800 dark:text-blue">
                July 15, 2025, 11:00 AM
              </p>
              <p className="text-sm text-gray-500">Start Time</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 mb-4">
            <FaListAlt className="text-gray-500 mt-1" size={24} />
            <div>
              <p className="text-sm text-gray-600">
                Please be ready 15 minutes before the start time. Ensure a
                stable internet connection.
              </p>
              <p className="text-sm text-blue-500 font-semibold mt-1 cursor-pointer hover:underline">
                Instructions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          Upcoming
        </button>
        <button
          onClick={() => settype("dash")}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
export default QuizEnrollmentCard;
