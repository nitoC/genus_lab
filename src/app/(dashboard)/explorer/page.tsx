import { JSX, SVGProps } from "react";

const ExploralPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) => {
  const params = await searchParams;

  const leaderboardRanks = [
    {
      rank: 1,
      title: "Grand Master",
      monthlyPoints: "25,000+",
      dailyPoints: "800+",
      points: "5000+",
      level: "25",
      rewards: "2,500 + 1-month premium",
    },
    {
      rank: 2,
      title: "Master",
      monthlyPoints: "20,000-24,999",
      dailyPoints: "600-799",
      points: "3,751-4,999",
      level: "24",
      rewards: "1,500 + Badge",
    },
    {
      rank: 3,
      title: "Expert",
      monthlyPoints: "15,000-19,999",
      dailyPoints: "500-599",
      points: "2,501-3,750",
      level: "21-23",
      rewards: "1,000 + Badge",
    },
    {
      rank: 4,
      title: "Pro",
      monthlyPoints: "10,000-14,999",
      dailyPoints: "400-499",
      points: "1,751-2,500",
      level: "18-20",
      rewards: "750 + Badge",
    },
    {
      rank: 5,
      title: "Veteran",
      monthlyPoints: "7,500-9,999",
      dailyPoints: "300-399",
      points: "1,151-1,750",
      level: "15-17",
      rewards: "500",
    },
  ];

  const FacebookIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.04c-5.5 0-10 4.49-10 10s4.5 10 10 10 10-4.49 10-10-4.5-10-10-10zm1.6 11.45h-1.3v5.51h-2.3v-5.51h-1.1v-2.04h1.1v-1.5c0-1.07.5-2.79 2.7-2.79h1.8v2.04h-1.2c-.3 0-.7.15-.7.7v1.46h1.9l-.3 2.04z" />
    </svg>
  );

  const StarIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Quizzes */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Upcoming Quizzes
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-yellow-400/20 p-4 rounded-lg flex items-center justify-center text-yellow-800 dark:text-yellow-300">
                <span className="text-5xl font-bold">“?”</span>
              </div>
              <div className="flex-1 bg-blue-400/20 p-4 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-300 gap-2">
                <span className="text-4xl font-bold bg-white/50 dark:bg-black/30 p-2 rounded">
                  Q
                </span>
                <span className="text-4xl font-bold bg-white/50 dark:bg-black/30 p-2 rounded">
                  A
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold dark:text-gray-300">
              History Buffs Challenge & Science Whiz Showdown
            </p>
            <p className="text-xs dark:text-gray-400">
              Engage in thrilling quizzes and expand your knowledge.
            </p>
          </div>

          {/* Project Updates */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Project Updates
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              New Features and Improvements
            </p>
            <div className="mt-auto">
              <img
                src="https://placehold.co/400x200/3b82f6/ffffff?text=New+UI"
                className="rounded-lg object-cover w-full h-24"
                alt="Project Update"
              />
            </div>
          </div>

          {/* Tech News */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Tech News
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              Latest Tech Trends
            </p>
            <div className="mt-auto">
              <img
                src="https://placehold.co/400x200/1e40af/ffffff?text=Tech"
                className="rounded-lg object-cover w-full h-24"
                alt="Tech News"
              />
            </div>
          </div>

          {/* Studio Quiz Winner */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Studio Quiz Winner
            </h3>
            <p className="text-sm mb-4 dark:text-gray-400">
              Congratulations to Evelyn S.
            </p>
            <div className="mt-auto">
              <img
                src="https://placehold.co/400x200/ca8a04/ffffff?text=Winner"
                className="rounded-lg object-cover w-full h-24"
                alt="Winner"
              />
            </div>
          </div>

          {/* Social Media & Announcements */}
          <div className="grid grid-rows-2 gap-6">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-md font-semibold mb-2 dark:text-white">
                Social Media
              </h3>
              <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                <FacebookIcon className="h-8 w-8 hover:text-blue-600 cursor-pointer" />
                <StarIcon className="h-8 w-8 hover:text-yellow-500 cursor-pointer" />
                <StarIcon className="h-8 w-8 hover:text-yellow-500 cursor-pointer" />
                <StarIcon className="h-8 w-8 hover:text-yellow-500 cursor-pointer" />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4">
              <div>
                <h3 className="text-md font-semibold dark:text-white">
                  Latest Announcements
                </h3>
                <p className="text-sm dark:text-gray-400">
                  New Quiz Categories Added!
                </p>
              </div>
              <img
                src="https://placehold.co/100x100/34d399/ffffff?text=Announce"
                className="rounded-lg w-16 h-16 object-cover"
                alt="Announcement"
              />
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Leader board Ranks, Point Ranges & Rewards
          </h3>
          <table className="w-full text-left text-sm">
            <thead className="border-b uppercase dark:border-gray-600">
              <tr className="text-gray-700 dark:text-gray-300">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Point Range</th>
                <th className="py-3 px-4">Monthly Points</th>
                <th className="py-3 px-4">Reward Basic</th>
                <th className="py-3 px-4">Reward Premium</th>
                <th className="py-3 px-4">Non Cash Rewards</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {leaderboardRanks.map((item, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                  <td className="py-3 px-4 font-medium">{item.rank}</td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.monthlyPoints}</td>
                  <td className="py-3 px-4">{item.dailyPoints}</td>
                  <td className="py-3 px-4">{item.points}</td>
                  <td className="py-3 px-4">{item.level}</td>
                  <td className="py-3 px-4">{item.rewards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExploralPage;
