"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import {
  FaRegCalendarAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

// --- 1. Mock Data Generator ---
const ITEMS_PER_PAGE = 10;

const generateMockWithdrawals = (count: number) => {
  const statuses = ["Completed", "Processing", "Failed", "Cancelled"];
  const method = "Bank Transfer";
  const data = [];

  for (let i = 1; i <= count; i++) {
    const amount: any = (Math.random() * 1000 + 50).toFixed(2);
    const fee: any = (amount * 0.01).toFixed(2);
    const netAmount = (amount - fee).toFixed(2);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    );

    data.push({
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: parseFloat(amount),
      fee: parseFloat(fee),
      netAmount: parseFloat(netAmount),
      method,
      status,
      recipient: `Account ***${Math.floor(Math.random() * 9000 + 1000)}`,
    });
  }

  return data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const MOCK_WITHDRAWALS: any = generateMockWithdrawals(55);

// --- 2. Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass, Icon;
  switch (status) {
    case "Completed":
      colorClass = "bg-green-100 text-green-700";
      Icon = FaCheckCircle;
      break;
    case "Processing":
      colorClass = "bg-yellow-100 text-yellow-700 animate-pulse";
      Icon = FaSpinner;
      break;
    case "Failed":
    case "Cancelled":
      colorClass = "bg-red-100 text-red-700";
      Icon = FaTimesCircle;
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      Icon = FaSpinner;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
};

// --- 3. Withdrawals Table ---
type Withdrawal = {
  date: string;
  time: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: string;
  status: string;
  recipient: string;
};

const WithdrawalsTable = ({ withdrawals }: { withdrawals: Withdrawal[] }) => {
  const NoData = (
    <div className="text-center text-gray-500 py-6">No transactions found.</div>
  );

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="space-y-4 p-4 sm:hidden">
        {withdrawals.length === 0
          ? NoData
          : withdrawals.map((item, idx) => (
              <div
                key={idx}
                className=" rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between mb-3 border-b border-gray-100 pb-2">
                  <span className="text-xs text-gray-400 uppercase font-medium">
                    Status
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <FaRegCalendarAlt /> {item.date}
                    </div>
                    <span className="text-gray-400">{item.time}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-700 font-medium">
                      <FaUniversity /> {item.method}
                    </div>
                    <span className="text-gray-500">{item.recipient}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-1 text-gray-700">
                      <FaMoneyBillWave /> Amount
                    </div>
                    <span className="font-semibold">
                      N{item.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="font-bold text-blue-600 text-sm">
                      Net Received
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      N{item.netAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Date / Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Method / Recipient
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Fee
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Net Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-100">
            {withdrawals.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              withdrawals.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="font-medium flex items-center gap-1">
                      <FaRegCalendarAlt /> {item.date}
                    </div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="font-medium flex items-center gap-1 text-gray-800">
                      <FaUniversity /> {item.method}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.recipient}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-500">
                    N{item.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-500">
                    -N{item.fee.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-green-600">
                    N{item.netAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// --- 4. Pagination (unchanged except styling) ---
type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => (
  <div className="flex justify-center py-4  dark:bg-gray-800 rounded-b-xl">
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white shadow"
              : " text-gray-600 hover:bg-blue-50 border"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  </div>
);

// --- 5. Main Component ---
const Transactions = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_WITHDRAWALS);
      setLoading(false);
    }, 500);
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentWithdrawals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-blue-600 animate-spin text-3xl">
          <FaSpinner />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto  rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex-wrap gap-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">
            Withdrawal Transactions
          </h1>
          <Link
            href={"/profile/withdraw"}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaMoneyBillWave /> New Withdrawal
          </Link>
        </div>

        <WithdrawalsTable withdrawals={currentWithdrawals} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Transactions;
