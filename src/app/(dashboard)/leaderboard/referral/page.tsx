"use client";
import Back from "@/components/Buttons/Back";
import CustomDropdown from "@/components/CustomDrop/CustomDropdown";
import React, { useState, useMemo, useRef, useEffect } from "react";

// Helper function for currency formatting
const formatCurrency = (amount: any) => {
  // Formats number with commas and Naira symbol
  return `₦${amount.toLocaleString("en-NG")}`;
};

// --- Dropdown Options Data ---
const timeframeOptions = ["Daily", "Weekly"];
const periodOptions = ["Monthly", "Quarterly", "Annually"];
const yearOptions = ["Annual", "2023", "2022"];

// --- Dummy Table Data (UPDATED with new fields) ---
const referrerData = [
  {
    id: 1,
    rank: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=68", // Placeholder avatar
    location: "Lagos",
    freeUsers: 50,
    basicUsers: 20,
    premiumUsers: 10,
    basicUsersRenewed: 15, // NEW
    premiumUsersRenewed: 8, // NEW
    monthlyEarnings: 150000, // NEW
  },
  {
    id: 2,
    rank: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Abuja",
    freeUsers: 45,
    basicUsers: 18,
    premiumUsers: 8,
    basicUsersRenewed: 12, // NEW
    premiumUsersRenewed: 6, // NEW
    monthlyEarnings: 125000, // NEW
  },
  {
    id: 3,
    rank: 3,
    name: "Peter Jones",
    avatar: "https://i.pravatar.cc/150?img=61",
    location: "Kano",
    freeUsers: 40,
    basicUsers: 15,
    premiumUsers: 5,
    basicUsersRenewed: 10, // NEW
    premiumUsersRenewed: 4, // NEW
    monthlyEarnings: 95000, // NEW
  },
  {
    id: 4,
    rank: 4,
    name: "Mary Williams",
    avatar: "https://i.pravatar.cc/150?img=26",
    location: "Ibadan",
    freeUsers: 35,
    basicUsers: 12,
    premiumUsers: 4,
    basicUsersRenewed: 8, // NEW
    premiumUsersRenewed: 3, // NEW
    monthlyEarnings: 70000, // NEW
  },
  {
    id: 5,
    rank: 5,
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Port Harcourt",
    freeUsers: 30,
    basicUsers: 10,
    premiumUsers: 3,
    basicUsersRenewed: 6, // NEW
    premiumUsersRenewed: 2, // NEW
    monthlyEarnings: 55000, // NEW
  },
  // Additional data for pagination testing
  {
    id: 6,
    rank: 6,
    name: "Sarah Green",
    avatar: "https://i.pravatar.cc/150?img=35",
    location: "Enugu",
    freeUsers: 28,
    basicUsers: 9,
    premiumUsers: 2,
    basicUsersRenewed: 5,
    premiumUsersRenewed: 1,
    monthlyEarnings: 40000,
  },
  {
    id: 7,
    rank: 7,
    name: "Mark Taylor",
    avatar: "https://i.pravatar.cc/150?img=53",
    location: "Calabar",
    freeUsers: 25,
    basicUsers: 8,
    premiumUsers: 2,
    basicUsersRenewed: 5,
    premiumUsersRenewed: 1,
    monthlyEarnings: 35000,
  },
  {
    id: 8,
    rank: 8,
    name: "Lisa White",
    avatar: "https://i.pravatar.cc/150?img=20",
    location: "Owerri",
    freeUsers: 22,
    basicUsers: 7,
    premiumUsers: 1,
    basicUsersRenewed: 4,
    premiumUsersRenewed: 0,
    monthlyEarnings: 20000,
  },
];

const itemsPerPage = 5;

export default function Referrer() {
  const [activePage, setActivePage] = useState(1);
  // State for custom dropdown filters
  // const [selectedTimeframe, setSelectedTimeframe] = useState(
  //   timeframeOptions[0]
  // );
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  // const [selectedYear, setSelectedYear] = useState(yearOptions[0]);

  const totalPages = Math.ceil(referrerData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return referrerData.slice(startIndex, endIndex);
  }, [activePage]);

  const goToPreviousPage = () => {
    setActivePage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setActivePage((prev) => Math.min(totalPages, prev + 1));
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <Back />
      <div className="min-h-screen flex flex-col">
        {/* --- Main Content --- */}
        <main className="flex-grow py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Leaderboard Header and Filters */}
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
              <h1 className="text-3xl font-extrabold  dark:text-blue dark:text-fuchsia-50 text-gray-900 sm:text-4xl">
                Referrer Leaderboard
              </h1>
              <div className="flex space-x-3 flex-wrap justify-end">
                {/* Dropdown 1: Timeframe (Daily/Weekly)
              <CustomDropdown
                options={timeframeOptions}
                selected={selectedTimeframe}
                onSelect={setSelectedTimeframe}
              /> */}
                {/* Dropdown 2: Period (Monthly/Quarterly/Annually) */}
                <CustomDropdown
                  options={periodOptions}
                  selected={selectedPeriod}
                  onSelect={setSelectedPeriod}
                />
                {/* Dropdown 3: Year (Annual/2023/2022) */}
                {/* <CustomDropdown
                options={yearOptions}
                selected={selectedYear}
                onSelect={setSelectedYear}
              /> */}
              </div>
            </div>

            {/* Table Card - overflow-x-auto handles horizontal scrolling on small screens */}
            <div className=" shadow-lg rounded-xl overflow-x-auto ring-1 ring-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/10">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Referrer Name
                    </th>
                    {/* REMOVED hidden md:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Location
                    </th>
                    {/* REMOVED hidden lg:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Free Users Referred
                    </th>
                    {/* REMOVED hidden sm:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Basic Users Referred
                    </th>
                    {/* REMOVED hidden md:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Premium Users Referred
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Total Referrals
                    </th>
                    {/* REMOVED hidden lg:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Basic Users Renewed
                    </th>
                    {/* REMOVED hidden xl:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Premium Users Renewed
                    </th>
                    {/* REMOVED hidden md:table-cell */}
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider"
                    >
                      Monthly Earnings (₦)
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {paginatedData.map((referrer) => (
                    <tr
                      key={referrer.id}
                      className="hover:bg-gray-50/20 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-fuchsia-50 text-gray-900">
                        {referrer.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-fuchsia-50 text-gray-900">
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={referrer.avatar}
                            alt={referrer.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/40x40/cbd5e1/000?text=JD";
                            }}
                          />
                          <span className="font-medium">{referrer.name}</span>
                        </div>
                      </td>
                      {/* REMOVED hidden md:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.location}
                      </td>
                      {/* REMOVED hidden lg:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.freeUsers}
                      </td>
                      {/* REMOVED hidden sm:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.basicUsers}
                      </td>
                      {/* REMOVED hidden md:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.premiumUsers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-700 dark:text-gray-300">
                        {/* Total Referrals = Free + Basic + Premium */}
                        {referrer.freeUsers +
                          referrer.basicUsers +
                          referrer.premiumUsers}
                      </td>
                      {/* REMOVED hidden lg:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.basicUsersRenewed}
                      </td>
                      {/* REMOVED hidden xl:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {referrer.premiumUsersRenewed}
                      </td>
                      {/* REMOVED hidden md:table-cell */}
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                        {formatCurrency(referrer.monthlyEarnings)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-6 space-x-2">
              <button
                className="px-4 py-2 border dark:text-gray-50 dark:hover:text-gray-600  border-gray-300 rounded-lg text-sm font-medium text-gray-700  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                onClick={goToPreviousPage}
                disabled={activePage === 1}
              >
                Previous
              </button>
              <div className="flex space-x-1">
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center dark:text-gray-50 dark:hover:text-gray-600  rounded-lg text-sm font-semibold transition ${
                      activePage === page
                        ? "bg-indigo-600 text-white shadow-md"
                        : " text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-50 dark:hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                onClick={goToNextPage}
                disabled={activePage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
