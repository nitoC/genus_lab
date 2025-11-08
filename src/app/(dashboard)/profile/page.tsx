"use client";
import Funds from "@/components/Funds";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "react-toastify";
const CompassIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const TrophyIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const ProfileContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const tabs = ["Profile", "Account", "Referral", "Theme"];
  const [activeTab, setActiveTab] = useState(tab ?? "Profile");
  const earningsData = [30, 45, 40, 60, 55, 80, 70, 75, 65, 90, 85, 95];

  type ChartProps = {
    data: number[];
    color: string;
  };

  const Chart: React.FC<ChartProps> = ({ data, color }) => (
    <div className="h-64">
      <svg
        className="w-full h-full"
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
      >
        <path
          d={
            `M 0 ${100 - data[0] / 1.2} ` +
            data
              .map(
                (p, i) => `L ${i * (500 / (data.length - 1))} ${100 - p / 1.2}`
              )
              .join(" ")
          }
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={
            `M 0 100 L 0 ${100 - data[0] / 1.2} ` +
            data
              .map(
                (p, i) => `L ${i * (500 / (data.length - 1))} ${100 - p / 1.2}`
              )
              .join(" ") +
            ` L ${500} 100 Z`
          }
          fill="url(#earningsGradient)"
        />
      </svg>
    </div>
  );
  const referralLink = "https//genuslab.com,2345";
  return (
    <div className="p-4 sm:p-6 lg:p-8 text-white min-h-full">
      {/* Profile Header */}
      {activeTab !== "Referral" ? (
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h2 className="text-3xl font-bold">Chibuike Nwokolo</h2>
            <p className="text-gray-400">@email.com</p>
            <div className="title-container">
              <h3 className="dark:text-white text-gray-900">Rank: 435</h3>
              <p className="text-gray-400">Dev master</p>
            </div>
          </div>
          <Link
            href={"/profile/edit"}
            className="ml-auto bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue">Referrals</h3>
            <p className="text-gray-400 flex-2">
              Invite friends and earn rewards! Share your referral link below:
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              readOnly
              value="https//genuslab.com,2345"
              className="flex-1 p-3 rounded-lg dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-700"
            />
            <button
              onClick={() => {
                toast.success("link copied");
                navigator.clipboard.writeText(referralLink);
              }}
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
      {/* Profile Navigation */}
      <div className="border-b border-white mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                console.log(tab);
                setActiveTab(tab);
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      {/* Profile Content */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 dark:text-blue text-black">
          Profile overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl relative overflow-hidden">
            <h4 className="text-lg font-semibold text-blue-100">
              Total Balance
            </h4>
            <p className="text-4xl font-bold mt-2">N 1600</p>
            <CompassIcon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
          </div>
          <div className="text-black p-6 rounded-2xl dark:text-white border border-mygrey/30 relative overflow-hidden">
            <h4 className="text-lg font-semibold ">
              {activeTab === "Account"
                ? "Earnings"
                : activeTab === "Referral"
                ? "Referrals"
                : "Rewards"}
            </h4>
            <p className="text-4xl font-bold mt-2">
              {activeTab === "Referral" ? 3 : "N5000"}
            </p>
            <TrophyIcon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
          </div>
        </div>
        {activeTab === "Profile" && (
          <>
            <h3 className="text-2xl font-semibold mb-4 dark:text-blue">
              Earnings Analytics
            </h3>
            <div className=" p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-semibold text-black dark:text-mygrey">
                Earnings Over Time
              </h4>
              <p className="text-3xl font-bold mt-2">Total Earnings: N5000</p>
              <p className="text-sm text-green-400">Last 30 Days +15%</p>
              <div className="mt-4">
                <Chart data={earningsData} color="#4ade80" />
                <div className="flex justify-between text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === "Referral" && <Referrals />}
        {activeTab === "Account" && <Funds />}
      </div>
    </div>
  );
};

const Referrals = () => {
  const data = {
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
    <>
      <div className="p-4 sm:p-6 lg:p-8 text-white min-h-full">
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Your Referrals
          </h4>
          <div className="space-y-4">
            <div className="p-4 dark:bg-gray-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Jane Doe
                </p>
                <p className="text-sm text-gray-400">Joined: Jan 15, 2024</p>
              </div>
              <p className="text-green-400 font-semibold">+N500</p>
            </div>
            <div className="p-4 dark:bg-gray-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  John Smith
                </p>
                <p className="text-sm text-gray-400">Joined: Feb 20, 2024</p>
              </div>
              <p className="text-green-400 font-semibold">+N500</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <WalletAnalytics earningsData={data.earningsOverTime} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Rewards Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BreakdownItem
            title="Referral Activities"
            total={data.rewardsBreakdown.activities.total}
            change={data.rewardsBreakdown.activities.change}
            categories={data.rewardsBreakdown.activities.categories}
          />
          <BreakdownItem
            title="Earnings Sources"
            total={data.rewardsBreakdown.earningsSources.total}
            change={data.rewardsBreakdown.earningsSources.change}
            categories={data.rewardsBreakdown.earningsSources.categories}
          />
          <BreakdownItem
            title="Quiz Winnings"
            total={data.rewardsBreakdown.quizWinnings.total}
            change={data.rewardsBreakdown.quizWinnings.change}
            categories={data.rewardsBreakdown.quizWinnings.categories}
          />
        </div>
      </div>
    </>
  );
};

const WalletAnalytics = ({ earningsData }: any) => {
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

      <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
        <h3 className="text-2xl font-bold dark:text-white text-gray-800">
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
const BreakdownItem = ({ title, total, change, categories }: any) => {
  return (
    <div className="p-4 dark:bg-gray-800 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">
      <h3 className="text-base font-medium dark:text-white">{title}</h3>
      <p className="text-xl font-bold dark:text-white text-gray-800">
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
        {categories.map((cat: any) => (
          <div key={cat.name} className="flex flex-col">
            <span className="text-xs dark:text-white text-gray-600 mb-1">
              {cat.name}
            </span>
            <div className="w-full dark:bg-gray-800 bg-gray-200 rounded-full h-2.5">
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

const ProfilePage = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10">Loading profile...</div>}
    >
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
