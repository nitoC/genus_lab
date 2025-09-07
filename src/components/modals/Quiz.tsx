"use client";
import React from "react";
IoClose;
import { IoClose } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";

export const JoinQuizModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (val?: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center relative">
        <button
          onClick={() => onClose("closed")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <IoClose className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join quiz</h2>

        <div className="text-left bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
          <p className="text-sm text-gray-700">
            This quiz is part of a monthly subscription. Fee will be
            automatically deducted from your balance every month.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            You can unsubscribe anytime to stop the next auto-renewal. No
            charges will be made after you cancel.
          </p>
        </div>

        <div className="mb-6">
          <img
            src="https://placehold.co/60x60/2A8CFF/FFFFFF?text=G"
            alt="Logo"
            className="mx-auto rounded-full mb-3"
          />
          <div className="flex items-center justify-center gap-2 text-sm text-red-500">
            <FiAlertCircle className="h-5 w-5" />
            <span>You are currently subscribed to basic plan</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Active Plan</p>
          <p className="text-2xl font-bold text-gray-800">Basic</p>
        </div>

        <button
          onClick={() => onClose("enrolled")}
          className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
