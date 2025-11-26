"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

interface UserPlan {
  plan: "free" | "basic" | "premium";
  planCost: number;
}

interface JoinQuizModalProps {
  isOpen: boolean;
  onClose: (val?: string) => void;
  userPlan: UserPlan;
  balance: number;
}

export const JoinQuizModal = ({
  isOpen,
  onClose,
  userPlan,
  balance,
}: JoinQuizModalProps) => {
  if (!isOpen) return null;

  const { plan, planCost } = userPlan;

  // Logic for text + button
  let alertMessage = "";
  let buttonText = "Continue";
  let buttonDisabled = false;

  if (plan === "free") {
    alertMessage =
      "You are currently on the free plan. Please subscribe to a plan to join the quiz.";
    buttonText = "Subscribe";
  } else {
    if (balance < planCost) {
      alertMessage = `Insufficient balance to join quiz. You need at least $${planCost}.`;
      buttonText = "Add Funds";
      buttonDisabled = true;
    } else {
      alertMessage = `You are currently subscribed to the ${plan} plan.`;
      buttonText = "Continue";
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center relative">
        {/* Close Button */}
        <button
          onClick={() => onClose("closed")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join quiz</h2>

        {/* Info Section */}
        <div className="text-left bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
          {plan === "free" ? (
            <p className="text-sm text-gray-700">
              This quiz is part of your monthly subscription service. To
              maintain your access, a recurring fee will be automatically taken
              from your balance on a monthly basis.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-700">
                This quiz is part of a monthly subscription. A fee of
                <strong> ${planCost}</strong> will be deducted from your balance
                each month.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                You can unsubscribe anytime to stop auto-renewal.
              </p>
            </>
          )}
        </div>

        {/* User Plan Section */}
        <div className="mb-6">
          <img
            src="https://placehold.co/60x60/2A8CFF/FFFFFF?text=G"
            alt="Logo"
            className="mx-auto rounded-full mb-3"
          />
          <div className="flex items-center justify-center gap-2 text-sm text-red-500">
            <FiAlertCircle className="h-5 w-5" />
            <span>{alertMessage}</span>
          </div>

          <p className="text-gray-500 text-sm mt-2">Active Plan</p>
          <p className="text-2xl font-bold text-gray-800 capitalize">{plan}</p>

          {plan !== "free" && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Plan Cost: ${planCost.toFixed(2)}</p>
              <p>Balance: ${balance.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        {plan === "free" ? (
          <Link
            href={"/profile?tab=Account"}
            // onClick={() => onClose(plan === "free" ? "subscribe" : "enrolled")}
            // disabled={buttonDisabled}
            className={`w-full font-bold py-3 px-6 rounded-lg transition block ${
              buttonDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {buttonText}
          </Link>
        ) : (
          <button
            onClick={() => onClose("enrolled")}
            disabled={buttonDisabled}
            className={`w-full font-bold py-3 px-6 rounded-lg transition ${
              buttonDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
