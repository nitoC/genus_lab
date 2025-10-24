"use client";
import RankTable from "@/components/RankTable";
import { JSX, SVGProps, useState } from "react";
import { FaChessKnight, FaCrown, FaPhabricator } from "react-icons/fa6";
import { SiClevercloud, SiCoolermaster, SiPrometheus } from "react-icons/si";
import { HiMiniCheckBadge } from "react-icons/hi2";
import {
  GiAllSeeingEye,
  GiBlackKnightHelm,
  GiBoxingGlove,
  GiBrainstorm,
  GiExplosionRays,
  GiGiftOfKnowledge,
  GiMiddleArrow,
  GiPsychicWaves,
  GiQuicksand,
  GiSoulVessel,
  GiSparkSpirit,
} from "react-icons/gi";
import { FaCentos } from "react-icons/fa";
import { FcMindMap } from "react-icons/fc";

function toRoman(num: number) {
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

const ExploralPage = () => {
  const [ranktable, setranktable] = useState(false);
  const [rankData, setrankData] = useState<any>({});
  const [startIndex, setstartIndex] = useState(0);
  const leaderboardRanks = [
    {
      rank: 1,
      title: "Quiz overloard",
      Icon: <FaCrown size={20} color="gold" />,
      pointsRange: "2,000,000+",
      monthlyPoints: "700,000+",
      basic: "7000+",
      premium: "17500+",
      rewards: "GenusLab Trophy + Exclusive Crown Badge + VIP Access",
    },
    {
      rank: 2,
      title: "Mastermind",
      Icon: <SiCoolermaster size={20} color="purple" />,
      pointsRange: "1,000,000-999,999",
      monthlyPoints: "350,000-699,999",
      basic: "3,500-6,999",
      premium: "8750-17,499",
      rewards: "Exclusive Hoodie + Mastermind Badge + Early Quiz Access",
    },
    {
      rank: 3,
      title: "Brainiac",
      pointsRange: "500,000–999,999",
      Icon: <GiBrainstorm size={20} color="crimson" />,
      monthlyPoints: "175,000 – 349,999",
      basic: "1,750 – 3,499",
      premium: "4,375 – 8,749",
      rewards: "Premium Badge + Access to Bonus Quiz Packs",
    },
    {
      rank: 4,
      title: "Quiz Pro",
      pointsRange: "200,000–499,999",
      Icon: <SiPrometheus size={20} color="blue" />,
      monthlyPoints: "70,000 – 174,999",
      basic: "700 – 1,749",
      premium: "1,750 – 4,375",
      rewards: "Quiz Boost Pack + Certificate of Excellence",
    },
    {
      rank: 5,
      title: "Trivia titan",
      pointsRange: "100,000–199,999",
      Icon: <GiPsychicWaves size={20} color="green" />,
      monthlyPoints: "35,000 – 69,999",
      basic: "350 – 699",
      premium: "875 – 1,749",
      rewards: "1 Month Free Premium + Trivia Titan Badge",
    },

    {
      rank: 6,
      title: "Quiz Ace",
      pointsRange: "7,500-9,999",
      Icon: <FaCentos size={20} color="brown" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Achievement Badge + XP Booster",
    },
    {
      rank: 7,
      title: "Knowledge Knight",
      pointsRange: "7,500-9,999",
      Icon: <FaChessKnight size={20} color="orange" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Exclusive Notebook + Knowledge Knight Badge",
    },
    {
      rank: 8,
      title: "Smart Cookie",
      pointsRange: "7,500-9,999",
      Icon: <GiBlackKnightHelm size={20} color="#14213d" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "5XP Booster + Smart Cookie Badge",
    },
    {
      rank: 9,
      title: "Sharp Thinker",
      pointsRange: "7,500-9,999",
      Icon: <GiGiftOfKnowledge size={20} color="#ae2012" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Free Merchandise (Sticker Pack or T-Shirt)",
    },
    {
      rank: 10,
      title: "Clever Clog",
      pointsRange: "7,500-9,999",
      Icon: <SiClevercloud size={20} color="#76c893" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "7 Days Free Premium Subscription",
    },
    {
      rank: 11,
      title: "Bright Spark",
      pointsRange: "7,500-9,999",
      Icon: <GiSparkSpirit size={20} color="#14213d" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "5,000 Bonus Points + Bright Spark Bad",
    },
    {
      rank: 12,
      title: "Quick Wits",
      pointsRange: "7,500-9,999",
      monthlyPoints: "300-399",
      Icon: <GiQuicksand size={20} color="#14213d" />,
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "3 Extra Lives + Quick Wits Badge",
    },
    {
      rank: 13,
      title: "Keen Mind",
      pointsRange: "7,500-9,999",
      Icon: <FcMindMap size={20} color="#b5e48c" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Special Badge + Quiz Booster",
    },
    {
      rank: 14,
      title: "Inquisitive Soul",
      pointsRange: "7,500-9,999",
      Icon: <GiSoulVessel size={20} color="purple" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "3 Quiz Boosters + Inquisitive Soul Badge",
    },
    {
      rank: 15,
      title: "Curious Cat",
      pointsRange: "7,500-9,999",
      Icon: <FaPhabricator size={20} color="crimson" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "2 Power-Ups + Curious Cat Badge",
    },
    {
      rank: 16,
      title: "Eager Learner",
      pointsRange: "7,500-9,999",
      Icon: <GiMiddleArrow size={20} color="orange" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Double Points Weekend Access + Eager Learner Badge",
    },
    {
      rank: 17,
      title: "Knowledge Seeker",
      pointsRange: "7,500-9,999",
      Icon: <GiAllSeeingEye size={20} color="brown" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Free Entry to Next Quiz Contest + Knowledge Seeker Badge",
    },
    {
      rank: 18,
      title: "Aspiring Expert",
      pointsRange: "7,500-9,999",
      Icon: <GiExplosionRays size={20} color="lilac" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "50% Discount on Next Quiz + Aspiring Expert Badge",
    },
    {
      rank: 19,
      title: "Rising Star",
      pointsRange: "7,500-9,999",
      Icon: <GiBoxingGlove size={20} color="teal" />,
      monthlyPoints: "300-399",
      basic: "1,151-1,750",
      premium: "15-17",
      rewards: "Welcome Gift (Badge + Booster) + Rising Star Badge",
    },
    {
      rank: 20,
      title: "Fresh Mind",
      pointsRange: "0–1,499",
      Icon: <HiMiniCheckBadge size={20} color="#b5e48c" />,
      monthlyPoints: "0 – 524",
      basic: "0 – 5.24",
      premium: "0 – 13.10",
      rewards: "Encouragement Badge + Keep Learning Message",
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
        <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
          <div className=" flex justify-between flex-wrap items-center mb-4 w-full">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Leader board Ranks, Point Ranges & Rewards
            </h3>
            <div className=" flex  gap-10">
              <button
                disabled={startIndex <= 0}
                onClick={() => {
                  if (startIndex > 0) setstartIndex(startIndex - 5);
                }}
              >
                <span
                  className={`text bold ${
                    startIndex > 0 ? "text-blue-500" : "text-gray-400"
                  } capitalize cursor-pointer`}
                >
                  prev
                </span>
              </button>
              <button
                disabled={startIndex >= leaderboardRanks.length - 5}
                onClick={() => {
                  if (startIndex < leaderboardRanks.length - 5)
                    setstartIndex(startIndex + 5);
                }}
              >
                <span
                  className={`text bold ${
                    startIndex < leaderboardRanks.length - 5
                      ? "text-blue-500"
                      : "text-gray-400"
                  } capitalize cursor-pointer`}
                >
                  next
                </span>
              </button>
            </div>
          </div>
          <div className="hori-scroll overflow-x-auto w-full">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b uppercase dark:border-gray-600">
                <tr className="rank grid grid-cols-8 items-center text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Point Range</th>
                  <th className="py-3 px-4">Monthly Points</th>
                  <th className="py-3 px-4">Reward Basic</th>
                  <th className="py-3 px-4">Reward Premium</th>
                  <th className="py-3 px-4 col-span-2">Non Cash Rewards</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                {leaderboardRanks.map(
                  (item, index) =>
                    index < startIndex + 5 &&
                    index >= startIndex && (
                      <tr
                        key={index}
                        onClick={() => {
                          setrankData(item);
                          setranktable(true);
                          console.log(item);
                        }}
                        className="rank border-b grid grid-cols-8 items-center cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40"
                      >
                        <td className="py-3 px-4 flex items-center gap-5 font-medium">
                          {item.rank} {item.Icon}
                        </td>
                        <td className="py-3 px-4 font-bold">{item.title}</td>
                        <td className="py-3 px-4">{item.pointsRange}</td>
                        <td className="py-3 px-4">{item.monthlyPoints}</td>
                        <td className="py-3 px-4">{item.basic}</td>
                        <td className="py-3 px-4">{item.premium}</td>
                        <td className="py-3 px-4 col-span-2">{item.rewards}</td>
                        {ranktable && (
                          <RankTable
                            handleClose={(e: any) => {
                              e.stopPropagation();
                              console.log("clicked", ranktable);
                              setranktable(false);
                            }}
                            rank={`${toRoman(rankData.rank)} ${rankData.title}`}
                            rankIcon={rankData.Icon}
                            dtheme={() => {}}
                          />
                        )}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploralPage;
