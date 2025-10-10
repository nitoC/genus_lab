const QuizCard = ({ title, time }: { title: string; time: string }) => (
  <div className="bg-white min-w-[240px] dark:bg-zinc-800/20 dark:text-white text-black rounded-xl shadow-lg p-4 transition-transform hover:scale-105 duration-300 ease-in-out">
    <img
      src="/images/quiz-img.png"
      alt="Quiz"
      className="w-full mb-2 rounded"
    />
    <h4 className="font-bold text-md">{title}</h4>
    <p className="text-mygrey font-medium dark:text-primary">{time}</p>
  </div>
);

export default QuizCard;
