const QuizzesPage = () => {
  const countdown = [
    { value: "02", label: "Days" },
    { value: "12", label: "Hours" },
    { value: "30", label: "Minutes" },
    { value: "45", label: "Seconds" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Quizzes</h2>
          <p className="text-gray-500 mt-1">
            Here's a quick overview of your account and active quizzes.
          </p>
        </div>

        <div className="mb-10 p-6 rounded-2xl shadow-lg bg-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm">Last week score</p>
            <p className="text-5xl font-bold text-gray-800 mt-2">85</p>
          </div>
          <img
            src="https://placehold.co/150x150/2A8CFF/FFFFFF?text=G"
            alt="Quiz background"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-24 w-24 opacity-20 rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Quizzes
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {countdown.map((item) => (
              <div key={item.label} className="bg-gray-100 p-6 rounded-xl">
                <p className="text-4xl font-bold text-blue-500">{item.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button className="w-full sm:w-auto bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            View Details
          </button>
          <a
            href="#"
            className="font-semibold text-blue-500 hover:underline flex items-center gap-2"
          >
            View all Quizzes
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default QuizzesPage;
