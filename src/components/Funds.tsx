"use client";
import Link from "next/link";
import React from "react";

// Define the types for the feature and the entire plan card data
interface Feature {
  name: string;
  isAvailable: boolean;
}

interface Plan {
  id: "free" | "basic" | "premium";
  name: string;
  price: string;
  features: Feature[];
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "Current",
    features: [
      { name: "Practice only", isAvailable: true },
      { name: "Daily Quiz Access", isAvailable: true },
      { name: "Voice Read (Text-to-Speech)", isAvailable: false },
      { name: "Leaderboard Participation", isAvailable: false },
      { name: "Studio Quiz Eligibility", isAvailable: false },
      { name: "Hints & Explanations", isAvailable: false },
      { name: "Performance Insights", isAvailable: false },
      { name: "Genus Lab Badge & Certificate", isAvailable: false },
      { name: "Ad-Free Experience", isAvailable: false },
      { name: "Priority Support", isAvailable: false },
      { name: "Referral Bonus Claiming", isAvailable: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "₦2000",
    features: [
      { name: "Full access (No tts)", isAvailable: true },
      { name: "Daily Quiz Access", isAvailable: true },
      { name: "Voice Read (Text-to-Speech)", isAvailable: true },
      { name: "Leaderboard Participation", isAvailable: true },
      { name: "Studio Quiz Eligibility", isAvailable: false },
      { name: "Hints & Explanations", isAvailable: false },
      { name: "Performance Insights", isAvailable: false },
      { name: "Genus Lab Badge & Certificate", isAvailable: false },
      { name: "Ad-Free Experience", isAvailable: true },
      { name: "Priority Support", isAvailable: true },
      { name: "Referral Bonus Claiming", isAvailable: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₦4000",
    features: [
      { name: "Full access", isAvailable: true },
      { name: "Daily Quiz Access", isAvailable: true },
      { name: "Voice Read (Text-to-Speech)", isAvailable: true },
      { name: "Leaderboard Participation", isAvailable: true },
      { name: "Studio Quiz Eligibility", isAvailable: true },
      { name: "Hints & Explanations", isAvailable: true },
      { name: "Performance Insights", isAvailable: true },
      { name: "Genus Lab Badge & Certificate", isAvailable: true },
      { name: "Ad-Free Experience", isAvailable: true },
      { name: "Priority Support", isAvailable: true },
      { name: "Referral Bonus Claiming", isAvailable: true },
    ],
  },
];

// Inline SVG icons for check and cross
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-check text-green-500"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x text-red-500"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Inline SVG icons for the buttons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Pricing card component to be rendered for each plan
const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  // Determine gradient color based on plan ID
  let borderColorClass = "";
  switch (plan.id) {
    case "free":
      borderColorClass = "from-[#65E98B] via-[#65E98B] to-[#A088F5]";
      break;
    case "basic":
      borderColorClass = "from-[#A088F5] via-[#65E98B] to-[#3C91F2]";
      break;
    case "premium":
      borderColorClass = "from-[#A088F5] via-[#3C91F2] to-[#65E98B]";
      break;
  }

  const isCurrentPlan = plan.id === "free";
  const buttonGradientClass = isCurrentPlan
    ? "from-[#3C91F2] to-[#A088F5]"
    : "from-[#3C91F2] to-[#65E98B]";

  return (
    <div className={`p-1 bg-gradient-to-tr ${borderColorClass} rounded-2xl`}>
      <div className="bg-white dark:bg-[#171A21] p-6 rounded-2xl space-y-4 h-full flex flex-col items-center text-black dark:text-white">
        <h3 className="font-bold text-lg font-mono tracking-widest">
          {plan.name}
        </h3>
        <p className="font-bold text-3xl font-mono">{plan.price}</p>
        <ul className="w-full flex-grow space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              {feature.isAvailable ? <CheckIcon /> : <XIcon />}
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
        <button
          className={`w-full py-2 px-4 rounded-full font-bold text-white bg-gradient-to-r ${buttonGradientClass}`}
        >
          {isCurrentPlan ? "Current Plan" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

// Main AddFunds component
const Funds: React.FC = () => {
  return (
    <div className="min-h-screen dark:text-white p-4 font-sans flex flex-col items-center">
      {/* Top section with account buttons */}
      <header className="w-full max-w-7xl mb-12">
        <h1 className="p-4 dark:text-blue text-xl md:text-2xl text-black font-semibold mb-4 lg:text-left text-center">
          Account
        </h1>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href={"/profile/pay"}
            className="flex-1 max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-green-500 to-green-700 rounded-full font-bold dark:text-white shadow-lg flex items-center justify-center space-x-2"
          >
            <PlusIcon />
            <span>Add Funds</span>
          </Link>
          <Link
            href={"/profile/withdraw"}
            className="flex-1 max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full font-bold dark:text-white shadow-lg flex items-center justify-center space-x-2"
          >
            <MinusIcon />
            <span>Withdraw Funds</span>
          </Link>
        </div>
      </header>

      {/* Pricing section */}
      <main className="w-full max-w-7xl flex flex-col gap-2">
        <h2 className="text-2xl text-black dark:text-white md:text-3xl font-bold font-mono text-center mb-8 tracking-widest">
          Upgrade to Premium
        </h2>
        <div className="flex flex-col lg:flex-row lg:justify-center items-stretch lg:items-center p-4 lg:p-0">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`w-full ${
                plan.id === "basic" ? "lg:-mx-8 lg:scale-110 lg:z-10" : ""
              } p-4 lg:p-0`}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Funds;
