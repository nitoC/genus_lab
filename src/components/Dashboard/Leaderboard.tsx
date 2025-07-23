"use client";
const LeaderboardPage = () => {
  const weeklyScoreData = [50, 65, 60, 75, 70, 85, 80];
  const yourScoreData = [60, 55, 70, 65, 80, 75, 78];
  const leaderboardData = [
    { name: "bobby", score: 92, color: "bg-yellow-400" },
    { name: "Emma", score: 88, color: "bg-purple-400" },
    { name: "Udred", score: 85, color: "bg-green-400" },
    { name: "chibyk", score: 82, color: "bg-red-400" },
    { name: "User 5", score: 79, color: "bg-indigo-400" },
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  type ChartProps = {
    data: number[];
    color: string;
  };

  const Chart: React.FC<ChartProps> = ({ data, color }) => (
    <div className="h-40 flex items-end justify-between">
      <svg
        className="w-full h-full"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
      >
        <path
          d={
            `M 0 ${100 - data[0]} ` +
            data
              .map((p, i) => `L ${i * (300 / (data.length - 1))} ${100 - p}`)
              .join(" ")
          }
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-white min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Scores */}
        <div className="bg-[#1a2634] p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300">Weekly Scores</h3>
          <p className="text-4xl font-bold mt-2">Average: 85</p>
          <p className="text-sm text-green-400">Last 7 Days +5%</p>
          <div className="mt-4">
            <Chart data={weeklyScoreData} color="#4ade80" />
            <div className="flex justify-between text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
              {days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Quiz Winners */}
        <div className="bg-[#1a2634] p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300">
            Top Quiz Winners (Last Week)
          </h3>
          <p className="text-4xl font-bold mt-2">Top Score: 98</p>
          <p className="text-sm text-green-400">Last Week +10%</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Winner 1</span>
              <div className="w-2/3 h-4 bg-gray-700 rounded-full">
                <div
                  className="h-4 bg-blue-500 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Winner 2</span>
              <div className="w-2/3 h-4 bg-gray-700 rounded-full">
                <div
                  className="h-4 bg-blue-500 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Winner 3</span>
              <div className="w-2/3 h-4 bg-gray-700 rounded-full">
                <div
                  className="h-4 bg-blue-500 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Scores */}
        <div className="bg-[#1a2634] p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300">
            Your Scores (Last Week)
          </h3>
          <p className="text-4xl font-bold mt-2">Your Average: 78</p>
          <p className="text-sm text-red-400">Last 7 Days -2%</p>
          <div className="mt-4">
            <Chart data={yourScoreData} color="#3b82f6" />
            <div className="flex justify-between text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
              {days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#1a2634] p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300">Leaderboard</h3>
          <p className="text-4xl font-bold mt-2">Top Score: 95</p>
          <p className="text-sm text-green-400">All Time +8%</p>
          <div className="mt-6 h-48 flex items-end justify-around gap-2">
            {leaderboardData.map((user, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div
                  className="w-full bg-blue-500 rounded-t-md"
                  style={{ height: `${user.score}%` }}
                ></div>
                <span className="text-xs mt-2 text-gray-300">{user.name}</span>
                <img
                  src={`https://i.pravatar.cc/24?img=${i + 10}`}
                  alt={user.name}
                  className="w-6 h-6 rounded-full mt-1 border-2 border-gray-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeaderboardPage;
