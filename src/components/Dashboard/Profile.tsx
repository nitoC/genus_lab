import React, { useState } from "react";
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
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile", "Account", "Referral", "Theme"];
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-white min-h-full">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">Chibuike Nwokolo</h2>
          <p className="text-gray-400">@email.com</p>
          <p className="text-gray-400">09094883903</p>
        </div>
        <button className="ml-auto bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
          Edit
        </button>
      </div>

      {/* Profile Navigation */}
      <div className="border-b border-white mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
        <h3 className="text-2xl font-semibold mb-4">Profile overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl relative overflow-hidden">
            <h4 className="text-lg font-semibold text-blue-100">
              Total Balance
            </h4>
            <p className="text-4xl font-bold mt-2">N 1600</p>
            <CompassIcon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
          </div>
          <div className="text-black p-6 rounded-2xl border border-gray-700 relative overflow-hidden">
            <h4 className="text-lg font-semibold text-gray">Rewards</h4>
            <p className="text-4xl font-bold mt-2">N5000</p>
            <TrophyIcon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Earnings Analytics</h3>
        <div className=" p-6 rounded-2xl border border-gray-700">
          <h4 className="text-lg font-semibold text-black">
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
      </div>
    </div>
  );
};
export default ProfilePage;
