"use client";
import Link from "next/link";
import React, { useState } from "react";

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
const PricingCard: React.FC<{
  plan: Plan;
  changeModal: (val: boolean) => void;
  handlePlan: (val: Plan) => void;
  currentplan: Plan;
}> = ({ plan, changeModal, currentplan, handlePlan }) => {
  // Determine gradient color based on plan ID
  // const [currentplan, setCurrentplan] = useState("free");

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

  const isCurrentPlan = plan.id === currentplan.id;
  const buttonGradientClass = isCurrentPlan
    ? "from-[#Acaa] to-[#Accc]"
    : "from-[#3C91F2] to-[#65E98B]";

  return (
    <>
      <div
        data-plan={plan.id}
        className={`p-1 bg-gradient-to-tr ${borderColorClass} rounded-2xl`}
      >
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
            data-plan={plan.id}
            disabled={isCurrentPlan}
            onClick={(e) => {
              // alert(changeModal);
              const planId = (e.currentTarget.getAttribute("data-plan") ||
                "free") as "free" | "basic" | "premium";
              // setCurrentplan(planId);
              handlePlan(plan);
              changeModal(true);
            }}
            className={`w-full cursor-pointer py-2 px-4 rounded-full font-bold text-white bg-gradient-to-r ${buttonGradientClass}`}
          >
            {isCurrentPlan ? "Current Plan" : "Get Started"}
          </button>
        </div>
      </div>
    </>
  );
};

// Main AddFunds component
const Funds: React.FC = () => {
  const [changeModal, setChangeModal] = useState(false);
  const [currentplan, setCurrentplan] = useState(plans[0]);
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
            className="w-full sm:flex-1 max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-green-500 to-green-700 rounded-full font-bold text-white shadow-lg flex items-center justify-center space-x-2"
          >
            <PlusIcon />
            <span>Add Funds</span>
          </Link>
          <Link
            href={"/profile/withdraw"}
            className="w-full sm:flex-1 max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full font-bold text-white shadow-lg flex items-center justify-center space-x-2"
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
                plan.id === "basic" ? "lg:-mx-8 lg:scale-109 lg:z-10" : ""
              } p-4 lg:p-0`}
            >
              <PricingCard
                plan={plan}
                currentplan={currentplan}
                changeModal={(val: boolean) => setChangeModal(val)}
                handlePlan={(val: Plan) => {
                  setCurrentplan(val);
                }}
              />
            </div>
          ))}
        </div>
      </main>
      {changeModal && (
        <SubscriptionModal
          isVisible={changeModal}
          onClose={() => {
            setChangeModal(false);
          }}
          handlePlan={(val: Plan) => setCurrentplan(val)}
          plan={currentplan.name}
          amount={currentplan.price}
        />
      )}
    </div>
  );
};

// Inline SVG for the Close button (X)
const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// Inline SVG for the Checkmark icon (used in features and the title)
const CheckMarkIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Icon for the Genus Lab Logo (Placeholder G icon)
interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = (props) => (
  <div
    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl text-white ${
      props.className || "bg-blue-600"
    }`}
  >
    G
  </div>
);

// Feature Checkmark Item
const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start mb-2 text-gray-700 dark:text-gray-300">
    <CheckMarkIcon className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
    <p className="text-sm font-medium">{text}</p>
  </div>
);

const SubscriptionModal = ({ isVisible, onClose, plan, amount }: any) => {
  if (!isVisible) return null;

  return (
    // Backdrop Overlay (fixed position, semi-transparent black with blur)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50 backdrop-blur-sm p-4 transition-opacity duration-300">
      {/* Modal Container */}
      <div
        onClick={onClose}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100 overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Header and Close Button */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Subscribe
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Subscription Offer Box */}
          <div className="p-4 bg-purple-50 dark:bg-indigo-900/20 rounded-xl border-2 border-dashed border-pink-400 dark:border-pink-600">
            <h3 className="flex items-center text-md font-bold mb-3 text-pink-600 dark:text-pink-400">
              <CheckMarkIcon className="w-4 h-4 mr-1" />
              Subscribe to Genus Lab {plan} Plan
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Unlock full access to quizzes, exclusive content, and top-tier
              learning tools with our **Premium Plan**.
            </p>

            <div className="ml-2">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                • Subscription Details:
              </p>
              <FeatureItem text="The plan is automatically renews monthly." />
              <FeatureItem text="You can cancel auto-renewal at any time from your dashboard settings." />
            </div>
          </div>

          {/* Pricing and Logo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="text-3xl flex justify-center items-center font-bold text-blue-500">
                <img
                  width={35}
                  src="/images/logo.png"
                  alt="Logo"
                  className="rounded-lg"
                />
              </div>
              {/* <div className="flex flex-col items-start"> */}
              <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
                1-Month Plan
              </span>
              {/* </div> */}
            </div>

            <p className="text-4xl font-black text-gray-900 dark:text-white">
              {amount}
            </p>
          </div>

          {/* Action Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            onClick={(e) => {
              e.stopPropagation();
            }} // Typically would handle payment logic
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Funds;
