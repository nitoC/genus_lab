"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

/* ---------- Types ---------- */
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

/* ---------- Data ---------- */
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "Current",
    features: [
      { name: "Practice only", isAvailable: true },
      { name: "Daily Quiz Access", isAvailable: false },
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
      { name: "Voice Read (Text-to-Speech)", isAvailable: false },
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

/* ---------- Icons ---------- */
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-500"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ---------- Pricing Card ---------- */
const PricingCard: React.FC<{
  plan: Plan;
  changeModal: (val: boolean) => void;
  handlePlan: (val: Plan) => void;
  currentplan: Plan;
}> = ({ plan, changeModal, handlePlan, currentplan }) => {
  const isCurrent = plan.id === currentplan.id;

  const gradient = {
    free: "from-[#65E98B] via-[#65E98B] to-[#A088F5]",
    basic: "from-[#A088F5] via-[#65E98B] to-[#3C91F2]",
    premium: "from-[#A088F5] via-[#3C91F2] to-[#65E98B]",
  }[plan.id];

  return (
    <div
      className={`p-[1px] rounded-2xl bg-gradient-to-tr ${gradient} shadow-xl hover:shadow-2xl transition-all duration-500 animate-float`}
    >
      <div className="bg-white dark:bg-[#171A21] rounded-2xl p-6 flex flex-col items-center h-full text-black dark:text-white transition-transform hover:scale-[1.03]">
        <h3 className="font-bold text-xl tracking-widest mb-2">{plan.name}</h3>
        <p className="font-extrabold text-3xl mb-4">{plan.price}</p>

        <ul className="space-y-2 text-sm w-full flex-grow">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              {f.isAvailable ? <CheckIcon /> : <XIcon />}
              <span
                className={`${f.isAvailable ? "" : "opacity-50 line-through"}`}
              >
                {f.name}
              </span>
            </li>
          ))}
        </ul>

        <button
          disabled={isCurrent}
          onClick={() => {
            handlePlan(plan);
            changeModal(true);
          }}
          className={`mt-6 w-full py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#3C91F2] to-[#65E98B] transition-all duration-300 hover:from-[#65E98B] hover:to-[#3C91F2] ${
            isCurrent && "cursor-not-allowed opacity-60"
          }`}
        >
          {isCurrent ? "Current Plan" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

/* ---------- Modal ---------- */
const SubscriptionModal = ({ isVisible, onClose, plan, amount }: any) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setVisible(true);
    else setTimeout(() => setVisible(false), 300);
  }, [isVisible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-[#1c1f26] flex flex-col gap-10 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-gray-200 dark:border-gray-700 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-4 bg-purple-50 dark:bg-indigo-900/20 rounded-xl border-2 border-dashed border-pink-400 dark:border-pink-600">
          <h3 className="flex items-center text-md font-bold mb-3 text-pink-600 dark:text-pink-400">
            Subscribe to {plan} Plan
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Unlock all premium features and enjoy full access!
          </p>
          {/* <CheckMarkIcon className="w-4 h-4 mr-1" /> */}

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Unlock full access to quizzes, exclusive content, and top-tier
            learning tools with our **Premium Plan**.
          </p>

          <div className="ml-2">
            {/* <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              • Subscription Details:
            </p> */}
            {/* <FeatureItem text="The plan is automatically renews monthly." />
              <FeatureItem text="You can cancel auto-renewal at any time from your dashboard settings." /> */}
          </div>
        </div>
        <div className="text-4xl font-extrabold text-blue-500 mb-6">
          {amount}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg hover:shadow-2xl transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

/* ---------- Main Page ---------- */
const Funds: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(plans[0]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center py-10 px-4 font-sans">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3C91F2]/25 via-[#65E98B]/10 to-[#A088F5]/30 animate-gradient-x"></div>

      <header className="relative z-10 w-full max-w-5xl mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-green-400 to-purple-400 text-transparent bg-clip-text">
          Account Management
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/profile/pay"
            className="flex-1 max-w-xs py-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
          >
            <PlusIcon />
            Add Funds
          </Link>
          <Link
            href="/profile/withdraw"
            className="flex-1 max-w-xs py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
          >
            <MinusIcon />
            Withdraw Funds
          </Link>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl">
        <h2 className="text-2xl text-gray-800 dark:text-white md:text-3xl font-bold text-center mb-10">
          Upgrade Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currentplan={currentPlan}
              changeModal={setModal}
              handlePlan={setCurrentPlan}
            />
          ))}
        </div>
      </main>

      <SubscriptionModal
        isVisible={modal}
        onClose={() => setModal(false)}
        plan={currentPlan.name}
        amount={currentPlan.price}
      />
    </div>
  );
};

export default Funds;
