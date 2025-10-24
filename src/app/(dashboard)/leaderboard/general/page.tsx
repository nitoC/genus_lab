"use client";
import Back from "@/components/Buttons/Back";
import CustomDropdown from "@/components/CustomDrop/CustomDropdown";
import React, { useState, useMemo, useRef, useEffect } from "react";

// Helper to format amounts in ₦
const formatCurrency = (amount: any) => `₦${amount.toLocaleString("en-NG")}`;

const periodOptions = ["Monthly", "Quarterly", "Annually"];

// --- New Data for General Earnings Leaderboard (with Avatars) ---
const referrerData = [
  {
    id: 1,
    rank: 1,
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=1", // Avatar added
    location: "Abuja",
    freeUsers: 20,
    basicUsers: 10,
    premiumUsers: 10,
    basicUsersRenewed: 6,
    premiumUsersRenewed: 7,
    monthlyReferralEarnings: 8400,
    totalReferralEarnings: 14000,
    quizEarnings: 25000,
    otherEarnings: 25000,
    totalGeneralEarnings: 64000,
  },
  {
    id: 2,
    rank: 2,
    name: "Alice",
    avatar: "https://i.pravatar.cc/150?img=47", // Avatar added
    location: "Lagos",
    freeUsers: 10,
    basicUsers: 15,
    premiumUsers: 5,
    basicUsersRenewed: 8,
    premiumUsersRenewed: 3,
    monthlyReferralEarnings: 5200,
    totalReferralEarnings: 11000,
    quizEarnings: 20000,
    otherEarnings: 20000,
    totalGeneralEarnings: 56200,
  },
  {
    id: 3,
    rank: 3,
    name: "Emma",
    avatar: "https://i.pravatar.cc/150?img=15", // Avatar added
    location: "Kano",
    freeUsers: 7,
    basicUsers: 18,
    premiumUsers: 4,
    basicUsersRenewed: 10,
    premiumUsersRenewed: 2,
    monthlyReferralEarnings: 6000,
    totalReferralEarnings: 11200,
    quizEarnings: 15000,
    otherEarnings: 15000,
    totalGeneralEarnings: 47200,
  },
  {
    id: 4,
    rank: 4,
    name: "Chidi",
    avatar: "https://i.pravatar.cc/150?img=61", // Avatar added
    location: "Enugu",
    freeUsers: 5,
    basicUsers: 20,
    premiumUsers: 2,
    basicUsersRenewed: 12,
    premiumUsersRenewed: 1,
    monthlyReferralEarnings: 5800,
    totalReferralEarnings: 10000,
    quizEarnings: 14000,
    otherEarnings: 14000,
    totalGeneralEarnings: 43800,
  },
  {
    id: 5,
    rank: 5,
    name: "Daniel",
    avatar: "https://i.pravatar.cc/150?img=52", // Avatar added
    location: "Port Harcourt",
    freeUsers: 12,
    basicUsers: 8,
    premiumUsers: 7,
    basicUsersRenewed: 5,
    premiumUsersRenewed: 4,
    monthlyReferralEarnings: 4000,
    totalReferralEarnings: 9200,
    quizEarnings: 12000,
    otherEarnings: 13000,
    totalGeneralEarnings: 38200,
  },
  {
    id: 6,
    rank: 6,
    name: "Halima",
    avatar: "https://i.pravatar.cc/150?img=33", // Avatar added
    location: "Abuja",
    freeUsers: 25,
    basicUsers: 7,
    premiumUsers: 6,
    basicUsersRenewed: 4,
    premiumUsersRenewed: 3,
    monthlyReferralEarnings: 4600,
    totalReferralEarnings: 8800,
    quizEarnings: 10000,
    otherEarnings: 10000,
    totalGeneralEarnings: 33400,
  },
  {
    id: 7,
    rank: 7,
    name: "George",
    avatar: "https://i.pravatar.cc/150?img=20", // Avatar added
    location: "Ibadan",
    freeUsers: 3,
    basicUsers: 12,
    premiumUsers: 3,
    basicUsersRenewed: 7,
    premiumUsersRenewed: 2,
    monthlyReferralEarnings: 4800,
    totalReferralEarnings: 7800,
    quizEarnings: 7000,
    otherEarnings: 8000,
    totalGeneralEarnings: 27600,
  },
  {
    id: 8,
    rank: 8,
    name: "Joy",
    avatar: "https://i.pravatar.cc/150?img=8", // Avatar added
    location: "Enugu",
    freeUsers: 10,
    basicUsers: 14,
    premiumUsers: 3,
    basicUsersRenewed: 8,
    premiumUsersRenewed: 1,
    monthlyReferralEarnings: 4200,
    totalReferralEarnings: 8600,
    quizEarnings: 5000,
    otherEarnings: 5000,
    totalGeneralEarnings: 22800,
  },
  {
    id: 9,
    rank: 9,
    name: "Ibrahim",
    avatar: "https://i.pravatar.cc/150?img=7", // Avatar added
    location: "Lagos",
    freeUsers: 15,
    basicUsers: 9,
    premiumUsers: 5,
    basicUsersRenewed: 5,
    premiumUsersRenewed: 2,
    monthlyReferralEarnings: 3000,
    totalReferralEarnings: 8600,
    quizEarnings: 4000,
    otherEarnings: 4000,
    totalGeneralEarnings: 19600,
  },
  {
    id: 10,
    rank: 10,
    name: "Fatima",
    avatar: "https://i.pravatar.cc/150?img=11", // Avatar added
    location: "Kaduna",
    freeUsers: 30,
    basicUsers: 5,
    premiumUsers: 1,
    basicUsersRenewed: 2,
    premiumUsersRenewed: 1,
    monthlyReferralEarnings: 1800,
    totalReferralEarnings: 3000,
    quizEarnings: 2000,
    otherEarnings: 3000,
    totalGeneralEarnings: 9800,
  },
];

const itemsPerPage = 5;

export default function Referrer() {
  const [activePage, setActivePage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  const totalPages = Math.ceil(referrerData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return referrerData.slice(startIndex, endIndex);
  }, [activePage]);

  return (
    <>
      <Back />
      <main className="min-h-screen py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <h1 className="text-3xl font-extrabold dark:text-fuchsia-50 text-gray-900">
              GenusLab General Earnings Leaderboard (Including Quiz Earnings)
            </h1>
            <CustomDropdown
              options={periodOptions}
              selected={selectedPeriod}
              onSelect={setSelectedPeriod}
            />
          </div>

          {/* Table */}
          <div className="shadow-lg rounded-xl overflow-x-auto ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/10">
                <tr>
                  {[
                    "Rank", // Simplified header
                    "Referrer", // Simplified header for Rank + Name + Avatar
                    "Location",
                    "Free Users Referred",
                    "Basic Users Referred",
                    "Premium Users Referred",
                    "Total Referrals",
                    "Basic Users Renewed",
                    "Premium Users Renewed",
                    "Monthly Referral Earnings (₦)",
                    "Total Referral Earnings (₦)",
                    "Quiz Earnings (₦)",
                    "Other Earnings (₦)",
                    "Total General Earnings (₦)",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider min-w-[120px]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((ref) => (
                  <tr key={ref.id} className="hover:bg-gray-50/20 transition">
                    {/* 1. Rank */}
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-fuchsia-50">
                      {ref.rank}
                    </td>

                    {/* 2. Avatar and Name */}
                    <td className="px-6 py-4 min-w-[180px]">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-8 h-8 rounded-full object-cover shadow-sm"
                          src={ref.avatar}
                          alt={ref.name}
                          onError={(e) => {
                            // Fallback to placeholder if image fails
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://placehold.co/32x32/1f2937/ffffff?text=U";
                          }}
                        />
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {ref.name}
                        </span>
                      </div>
                    </td>

                    {/* 3. Location */}
                    <td className="px-6 py-4 text-gray-500">{ref.location}</td>

                    {/* 4. Free Users */}
                    <td className="px-6 py-4 text-gray-500">{ref.freeUsers}</td>

                    {/* 5. Basic Users */}
                    <td className="px-6 py-4 text-gray-500">
                      {ref.basicUsers}
                    </td>

                    {/* 6. Premium Users */}
                    <td className="px-6 py-4 text-gray-500">
                      {ref.premiumUsers}
                    </td>

                    {/* 7. Total Referrals */}
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">
                      {ref.freeUsers + ref.basicUsers + ref.premiumUsers}
                    </td>

                    {/* 8. Basic Renewed */}
                    <td className="px-6 py-4 text-gray-500">
                      {ref.basicUsersRenewed}
                    </td>

                    {/* 9. Premium Renewed */}
                    <td className="px-6 py-4 text-gray-500">
                      {ref.premiumUsersRenewed}
                    </td>

                    {/* 10. Monthly Referral Earnings */}
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {formatCurrency(ref.monthlyReferralEarnings)}
                    </td>

                    {/* 11. Total Referral Earnings */}
                    <td className="px-6 py-4 text-gray-500">
                      {formatCurrency(ref.totalReferralEarnings)}
                    </td>

                    {/* 12. Quiz Earnings */}
                    <td className="px-6 py-4 text-gray-500">
                      {formatCurrency(ref.quizEarnings)}
                    </td>

                    {/* 13. Other Earnings */}
                    <td className="px-6 py-4 text-gray-500">
                      {formatCurrency(ref.otherEarnings)}
                    </td>

                    {/* 14. Total General Earnings */}
                    <td className="px-6 py-4 font-bold text-indigo-600">
                      {formatCurrency(ref.totalGeneralEarnings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-6 space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                  activePage === page
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
