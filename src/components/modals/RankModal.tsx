"use client";
import { toRoman } from "@/app/(dashboard)/explorer/page";
import React from "react";
import { FaStar, FaTrophy, FaUsers } from "react-icons/fa6";
import { GiExplosionRays } from "react-icons/gi";
import { IoMdClose, IoMdLock, IoMdWarning } from "react-icons/io";

export const LockedRankModal = ({ rankData, handleClose }: any) => {
  const { rank, title, pointsToUnlock, cashReward, Icon } = rankData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform animate-scaleIn border border-indigo-500/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <IoMdLock size={28} className="text-yellow-300 animate-pulse" />
            <h3 className="text-2xl font-extrabold tracking-tight">
              Rank {toRoman(rank)}: {title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="hover:rotate-90 transition-transform duration-300 p-1 rounded-full bg-white/10"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="relative mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-6 bg-indigo-50 dark:bg-gray-700 border-4 border-indigo-400/50 animate-pulseSlow">
            {Icon ? (
              React.cloneElement(Icon, {
                size: 56,
                className:
                  Icon.props.className +
                  " opacity-60 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]",
              })
            ) : (
              <FaStar size={56} className="text-gray-400" />
            )}
          </div>

          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Rank Locked
          </h4>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This elite rank has not yet been unlocked by any user. It is
            reserved for pioneers who push the limits of knowledge.
          </p>

          {/* Details */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <FaTrophy className="text-yellow-500 flex-shrink-0" size={22} />
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Unlock Requirement:</strong>{" "}
                {pointsToUnlock.toLocaleString()} points
              </p>
            </div>

            <div className="flex items-center gap-3">
              <GiExplosionRays
                className="text-pink-500 flex-shrink-0"
                size={22}
              />
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Reward:</strong>{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  ₦{cashReward.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaUsers className="text-blue-500 flex-shrink-0" size={22} />
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Status:</strong> No user has unlocked this rank yet.
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 flex gap-3 text-left">
            <IoMdWarning
              size={26}
              className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 animate-bounceSlow"
            />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> This rank and its cash reward can only
              be claimed by the <strong>first person</strong> to reach the
              required points. Once unlocked, this reward is no longer available
              to others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
