"use client";
import {
  CompassIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  TrophyIcon,
  UserIcon,
} from "@/assets/icons/DashIcons";

import { MdModeNight } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import { useState } from "react";

const Sidebar = ({
  activePage,
  setActivePage,
  onLogout,
  dark,
  setdark,
}: {
  activePage: string;
  setActivePage: (val: string) => void;
  onLogout: () => void;
  dark: boolean;
  setdark: () => void;
}) => {
  const navItems = [
    { name: "Dashboard", icon: HomeIcon, page: "dashboard" },
    { name: "Quizzes", icon: HelpCircleIcon, page: "quizzes" },
    { name: "Leaderboard", icon: TrophyIcon, page: "leaderboard" },
    { name: "Exploral", icon: CompassIcon, page: "exploral" },
    { name: "Profile", icon: UserIcon, page: "profile" },
  ];

  return (
    <aside className=" text-gray-700 w-64 min-h-screen p-6 flex-col flex fixed top-0 left-0 ">
      <div className="text-3xl font-bold mb-10 text-blue-500">
        <img
          src="https://placehold.co/40x40/2A8CFF/FFFFFF?text=G"
          alt="Logo"
          className="rounded-lg"
        />
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.page);
            }}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all text-base font-medium relative ${
              activePage === item.page
                ? "bg-blue-50 text-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
            {activePage === item.page && (
              <div className="absolute right-0 h-6 w-1 bg-blue-500 rounded-l-md"></div>
            )}
          </a>
        ))}
      </nav>
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          className="flex items-center gap-4 p-3 rounded-lg transition-all text-base font-medium hover:bg-gray-100"
        >
          <LogOutIcon className="h-5 w-5" />
          <span>Logout</span>
        </a>
      </div>
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <button
          onClick={() => {
            setdark();
          }}
          className="flex items-center gap-4 p-3 rounded-lg transition-all text-base font-medium"
        >
          <span className="icon_slide w-[50px] block bg-blue/10 rounded-2xl">
            <span
              className={`block transition-all duration-500 dark:text-white ${
                dark ? "translate-x-0" : "translate-x-[80%]"
              }`}
            >
              <MdModeNight className={`h-5 w-5 ${dark && "hidden"}`} />
              <IoSunnySharp className={`h-5 w-5 ${!dark && "hidden"}`} />
            </span>
          </span>
        </button>
      </div>
      <div className="mt-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-5 text-white text-center">
        <p className="mb-2 font-semibold">Download our Mobile App</p>
        <p className="text-xs mb-4 opacity-80">Coming soon...</p>
        <button className="bg-white text-blue-500 rounded-full px-5 py-2.5 text-sm font-bold w-full shadow-lg hover:scale-105 transition-transform">
          Download
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
