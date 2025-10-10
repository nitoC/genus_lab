"use client";
import React from "react";
// Import specific icons from react-icons
import { AiOutlineCopy } from "react-icons/ai"; // For the copy button
import {
  MdOutlinePersonPin,
  MdPeopleOutline,
  MdTrendingUp,
} from "react-icons/md"; // For general icons

// --- Sub-Components ---

/**
 * Renders the top section with the referral link and navigation tabs.
 */
const ReferralHeader = () => {
  const referralLink = "https://geniuslab.com/2345";
  const tabs = ["Profile", "Account", "Referral", "Theme"];

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Share your referral link with friends and earn rewards.
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-grow bg-white border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="w-full px-4 py-2 text-sm text-gray-700 bg-transparent focus:outline-none"
          />
        </div>
        <button
          className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-150"
          onClick={() => navigator.clipboard.writeText(referralLink)}
          aria-label="Copy referral link"
        >
          {/* Using AiOutlineCopy from react-icons/ai */}
          <AiOutlineCopy className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-6 border-b border-gray-200 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              tab === "Referral"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Renders the Earnings and Referrals summary cards.
 */
const EarningsSummary = ({ totalBalance, referrals }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Balance Card */}
      <div className="relative p-6 h-36 bg-blue-600 rounded-xl overflow-hidden shadow-lg text-white">
        <h3 className="text-lg font-semibold mb-1">Total Balance</h3>
        <p className="text-4xl font-bold">N {totalBalance.toLocaleString()}</p>
        {/* Placeholder graphic for the balance card */}
        <MdTrendingUp className="absolute top-1/2 right-4 transform -translate-y-1/2 w-16 h-16 opacity-10" />
      </div>

      {/* Referrals Card */}
      <div className="relative p-6 h-36 bg-gray-100 rounded-xl overflow-hidden shadow-md text-gray-800">
        <h3 className="text-lg font-semibold mb-1">Referrals</h3>
        <p className="text-4xl font-bold">{referrals}</p>
        {/* Placeholder graphic for the referrals card */}
        <MdPeopleOutline className="absolute top-1/2 right-4 transform -translate-y-1/2 w-16 h-16 opacity-20" />
      </div>
    </div>
  );
};

/**
 * Renders the table of referred friends.
 */
const ReferredFriends = ({ friends }) => {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Referred Friends</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {friends.map((friend) => (
              <tr key={friend.name} className="text-sm text-gray-800">
                <td className="py-2 pr-4 font-medium flex items-center">
                  <MdOutlinePersonPin className="w-5 h-5 text-gray-400 mr-2 hidden sm:inline" />
                  {friend.name}
                </td>
                <td className="py-2">{friend.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Renders the Wallet Analytics section with tabs and the Earnings Over Time chart.
 */
const WalletAnalytics = ({ earningsData }) => {
  const timeTabs = ["Daily", "Weekly", "Monthly", "Yearly"];
  const currentTab = "Monthly"; // Based on the screenshot

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Wallet Analytics</h2>
      <div className="flex space-x-4 border-b border-gray-200 text-sm mb-6">
        {timeTabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 transition duration-150 ${
              tab === currentTab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">
          N{earningsData.amount.toLocaleString()}
          <span className="text-sm font-normal text-green-500 ml-2">
            Last 30 Days +{earningsData.change}%
          </span>
        </h3>

        {/* Chart Area - Simplification of the area chart */}
        <div className="h-40 w-full relative">
          {/* Placeholder for the line/area chart using a simplified, illustrative path */}
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Base line for the x-axis */}
            <line
              x1="0"
              y1="90"
              x2="100"
              y2="90"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            {/* Illustrative Area Path - This is a rough approximation of the shape */}
            <path
              d="M0 70 L5 50 L10 60 L15 40 L20 60 L25 50 L30 70 L35 40 L40 50 L45 30 L50 60 L55 30 L60 10 L65 70 L70 50 L75 10 L80 30 L85 20 L90 50 L95 40 L100 60"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Illustrative Fill Area Path */}
            <path
              d="M0 90 L0 70 L5 50 L10 60 L15 40 L20 60 L25 50 L30 70 L35 40 L40 50 L45 30 L50 60 L55 30 L60 10 L65 70 L70 50 L75 10 L80 30 L85 20 L90 50 L95 40 L100 60 L100 90 Z"
              fill="url(#chartGradient)"
              opacity="0.6"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
          {/* Simple X-Axis Labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Renders a single bar chart item in the Rewards Breakdown section.
 */
const BreakdownItem = ({ title, total, change, categories }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-xl font-bold text-gray-800">
        {/* Note: I kept the N (Naira symbol) in the data structure, but depending on the component, 
           you might want to format it as a string */}
        {isNaN(total) ? total : `N${total}`}
        <span
          className={`text-sm font-normal ml-2 ${
            change.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          Total {change}
        </span>
      </p>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col">
            <span className="text-xs text-gray-600 mb-1">{cat.name}</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${cat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ... (Rest of the main component body, which handles data, is the same)
const ReferralDashboard = () => {
  // Mock Data based on the screenshot
  const mockData = {
    totalBalance: 1600,
    referralsCount: 3,
    friends: [
      { name: "Sophie Clark", joinedDate: "2023-08-15" },
      { name: "Ethan Miller", joinedDate: "2023-09-22" },
      { name: "Olivia Davis", joinedDate: "2023-10-10" },
    ],
    earningsOverTime: {
      amount: 250,
      change: 15, // Represents +15%
      chartData: [],
    },
    rewardsBreakdown: {
      activities: {
        total: 15,
        change: "+10%",
        categories: [
          { name: "Clicks", percentage: 70 },
          { name: "Sign-ups", percentage: 50 },
          { name: "Subscriptions", percentage: 90 },
        ],
      },
      earningsSources: {
        total: 200,
        change: "+20%",
        categories: [
          { name: "Referrals", percentage: 60 },
          { name: "Bonuses", percentage: 40 },
          { name: "Renewals", percentage: 80 },
        ],
      },
      quizWinnings: {
        total: 50,
        change: "+5%",
        categories: [
          { name: "Quiz 1", percentage: 80 },
          { name: "Quiz 2", percentage: 50 },
          { name: "Quiz 3", percentage: 90 },
        ],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <ReferralHeader />

        <h2 className="text-2xl font-bold text-gray-800 mt-8">Earnings</h2>
        <EarningsSummary
          totalBalance={mockData.totalBalance}
          referrals={mockData.referralsCount}
        />

        <ReferredFriends friends={mockData.friends} />

        <WalletAnalytics earningsData={mockData.earningsOverTime} />

        <h2 className="text-2xl font-bold text-gray-800">Rewards Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BreakdownItem
            title="Referral Activities"
            total={mockData.rewardsBreakdown.activities.total}
            change={mockData.rewardsBreakdown.activities.change}
            categories={mockData.rewardsBreakdown.activities.categories}
          />
          <BreakdownItem
            title="Earnings Sources"
            total={mockData.rewardsBreakdown.earningsSources.total}
            change={mockData.rewardsBreakdown.earningsSources.change}
            categories={mockData.rewardsBreakdown.earningsSources.categories}
          />
          <BreakdownItem
            title="Quiz Winnings"
            total={mockData.rewardsBreakdown.quizWinnings.total}
            change={mockData.rewardsBreakdown.quizWinnings.change}
            categories={mockData.rewardsBreakdown.quizWinnings.categories}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;
