"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";

// --- Icon Definitions (Replacing react-icons/fa) ---

// Diamond Icon (FaGem equivalent)
const DiamondIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 0L0 256l256 256 256-256L256 0zM256 463.5l-192-192 192-192 192 192-192 192z" />
    <polygon
      points="256 512 512 256 256 0 0 256"
      fill="transparent"
      stroke="currentColor"
      strokeWidth="10"
    />
  </svg>
);

// Trophy Icon (FaTrophy equivalent)
const TrophyIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    fill="currentColor"
  >
    <path d="M552 64H472V32a16 16 0 0 0-16-16H120a16 16 0 0 0-16 16v32H24a24 24 0 0 0-24 24v56a24 24 0 0 0 24 24h56v88H24a24 24 0 0 0-24 24v56a24 24 0 0 0 24 24h56v88H24a24 24 0 0 0-24 24v56a24 24 0 0 0 24 24h216V288h-40v-40h40V88h240v160h-40v40h40v216h216a24 24 0 0 0 24-24v-56a24 24 0 0 0-24-24h-56v-88h56a24 24 0 0 0 24-24v-56a24 24 0 0 0-24-24h-56V88h56a24 24 0 0 0 24-24V88a24 24 0 0 0-24-24zM536 488H40V456h496v32z" />
  </svg>
);

// Sun Icon (FaSun equivalent)
const SunIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zM256 32c14.2 0 27.3 3.2 39.2 8.8L339 23.6a16 16 0 0 1 17 0l46.2 30.8a16 16 0 0 1 0 25.1l-28.9 44.4a16.2 16.2 0 0 0-3.8 8.8c.1 11.2 3 22.2 8.8 32l44.4 28.9a16 16 0 0 1 25.1 0l30.8 46.2a16 16 0 0 1 0 17l-28.9 44.4a16.2 16.2 0 0 0-3.8 8.8c.1 11.2 3 22.2 8.8 32l44.4 28.9a16 16 0 0 1 25.1 0l30.8 46.2a16 16 0 0 1 0 17l-46.2 30.8a16 16 0 0 1-17 0l-44.4-28.9a16.2 16.2 0 0 0-8.8-3.8c-11.2.1-22.2 3-32 8.8l-28.9 44.4a16 16 0 0 1-25.1 0l-46.2-30.8a16 16 0 0 1-17 0l-46.2 30.8a16 16 0 0 1-17 0l-44.4-28.9a16.2 16.2 0 0 0-8.8-3.8c-11.2.1-22.2 3-32 8.8l-28.9 44.4a16 16 0 0 1-25.1 0l-46.2-30.8a16 16 0 0 1-17 0l-30.8-46.2a16 16 0 0 1 0-17l28.9-44.4a16.2 16.2 0 0 0 3.8-8.8c-.1-11.2-3-22.2-8.8-32l-44.4-28.9a16 16 0 0 1-25.1 0l-30.8-46.2a16 16 0 0 1 0-17l46.2-30.8a16 16 0 0 1 17 0l44.4 28.9a16.2 16.2 0 0 0 8.8 3.8c11.2-.1 22.2-3 32-8.8l28.9-44.4a16 16 0 0 1 25.1 0l46.2 30.8a16 16 0 0 1 17 0l30.8 46.2a16 16 0 0 1 0 17l-28.9 44.4a16.2 16.2 0 0 0-3.8 8.8c-.1 11.2-3 22.2-8.8 32zM256 128a128 128 0 1 1 0 256 128 128 0 0 1 0-256z" />
  </svg>
);

// Moon Icon (FaMoon equivalent)
const MoonIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M223.5 32.4c-2.7-5.5-8-8.8-13.5-8.8s-10.8 3.3-13.5 8.8C103.1 76.5 48 165 48 256c0 141.4 114.6 256 256 256c91 0 179.5-55.1 223.6-145.9c2.7-5.5 2.7-12.1 0-17.6s-8-8.8-13.5-8.8c-24.9 0-47.5-6.7-67.9-18.7c-37.8-22.3-64.3-59.4-74.9-102.3c-1.4-5.6-7-9.5-12.8-9.5H256c-26.6 0-51.9-10.4-70.8-29.3C165.7 151.8 155 126.7 155 101.5V64H223.5z" />
  </svg>
);

// Mock data for the leaderboard entries
const mockRankings = [
  {
    rank: 1,
    name: "wildrider",
    score: 6088,
    avatarColor: "bg-red-400",
    avatarInitials: "WR",
  },
  {
    rank: 2,
    name: "3p1cfury",
    score: 6087,
    avatarColor: "bg-yellow-500",
    avatarInitials: "3F",
  },
  {
    rank: 4,
    name: "lilpunchbanana",
    score: 6086,
    avatarColor: "bg-green-400",
    avatarInitials: "LB",
  },
  {
    rank: 5,
    name: "redBladewaffle",
    score: 6085,
    avatarColor: "bg-pink-400",
    avatarInitials: "RW",
  },
  {
    rank: 6,
    name: "Neoblade",
    score: 6084,
    avatarColor: "bg-indigo-400",
    avatarInitials: "NB",
  },
  {
    rank: 7,
    name: "Umbra",
    score: 6083,
    avatarColor: "bg-teal-400",
    avatarInitials: "U",
  },
  {
    rank: 8,
    name: "Zero",
    score: 6082,
    avatarColor: "bg-purple-400",
    avatarInitials: "Z",
  },
  {
    rank: 9,
    name: "noisyBear",
    score: 6081,
    avatarColor: "bg-amber-400",
    avatarInitials: "NB",
  },
];

// Helper Component for a single Rank Item
const RankItem = ({ rank, name, score, avatarColor, avatarInitials }: any) => (
  <div
    className="flex items-center justify-between p-3 my-2 shadow-sm rounded-2xl transition-colors duration-300
              bg-white dark:bg-gray-800
              hover:bg-blue-50 dark:hover:bg-gray-700
               ring-blue-300 dark:ring-indigo-600/50"
  >
    {/* Rank Number */}
    <div className="font-extrabold text-2xl w-10 text-center text-blue-600 dark:text-indigo-400">
      {rank}
    </div>
    {/* Avatar */}
    <img
      src={`https://i.pravatar.cc/24?img=${
        Math.floor(Math.random() * 20 + 1) + 10
      }`}
      alt={name}
      className="w-10 h-10 rounded-full mt-1 border-2 border-gray-400 dark:border-gray-600"
    />{" "}
    {/* <div
      className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md text-white font-bold text-lg
                    ${avatarColor}`}
    >
      {avatarInitials}
    </div> */}
    {/* Username */}
    <div className="flex-1 mx-4 sm:mx-6 truncate">
      <span
        className="font-extrabold text-lg sm:text-xl
                     text-gray-800 dark:text-gray-100"
      >
        {name}
      </span>
    </div>
    {/* Score/Trophy */}
    <div
      className="flex items-center space-x-2 p-2 rounded-full
                    bg-yellow-100/70 dark:bg-yellow-900/50"
    >
      {/* Used inline SVG component */}
      <TrophyIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
      <span className="text-xl font-black text-gray-700 dark:text-gray-200">
        {score}
      </span>
    </div>
  </div>
);

// Main Application Component
const RankTable = ({
  dtheme,
  rank,
  rankIcon,
  handleClose,
}: {
  dtheme: any;
  rank: string;
  rankIcon: ReactNode;
  handleClose: (e: any) => void;
}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="min-h-screen cursor-default p-0 m-0 font-sans antialiased transition-colors duration-300
                  bg-gray-100 fixed inset-0 z-10 dark:bg-gray-900 lg:p-8"
    >
      <div className="h-[100vh] overflow-auto hori-scroll">
        <button className="cursor-pointer" onClick={handleClose}>
          <IoCloseCircle size={34} />
        </button>{" "}
        {/* Added lg:p-8 for desktop outer spacing */}
        {/* Container for Centering and Max Width */}
        <div
          className="max-w-xl mx-auto shadow-2xl min-h-screen 
        lg:min-h-[calc(100vh-4rem)] lg:rounded-3xl lg:overflow-hidden"
        >
          {" "}
          {/* Desktop: min height and rounded corners for card effect */}
          {/* Header Section */}
          <header
            className="relative w-full text-white p-4 pt-8 pb-10 rounded-b-[40px] shadow-xl
                         bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-indigo-900 dark:to-blue-800 lg:rounded-b-none"
          >
            {" "}
            {/* Adjusted rounding for desktop card style */}
            {/* Theme Toggle Button */}
            {/* <button
              onClick={toggleTheme}
              className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm bg-white/20 dark:bg-black/30 transition-all hover:scale-105"
              aria-label="Toggle theme"
            > */}
            {/* Used inline SVG components */}
            {/* {theme === "light" ? (
                <MoonIcon className="w-6 h-6 text-yellow-300" />
              ) : (
                <SunIcon className="w-6 h-6 text-orange-300" />
              )} */}
            {/* </button> */}
            <div className="flex flex-col items-center">
              {/* Rank Badge */}
              <div
                className="w-20 h-20 p-2 mb-2 rounded-full flex items-center justify-center
              bg-white dark:bg-gray-700 border-4 border-yellow-300 shadow-xl"
              >
                {/* Used inline SVG component */}
                {rankIcon}
                {/* <DiamondIcon className="w-10 h-10 text-blue-500 dark:text-indigo-400" /> */}
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl font-black tracking-wider text-center drop-shadow-lg
              uppercase"
              >
                {rank}
              </h1>
            </div>
          </header>
          {/* Leaderboard List */}
          <main className="p-4 sm:p-6 pb-20">
            <h2
              className="text-xl font-bold mb-4
            text-gray-700 dark:text-gray-300"
            >
              Current Rankings
            </h2>
            <div className="flex flex-col gap-1.5">
              {mockRankings.map((player) => (
                <RankItem
                  key={player.rank}
                  rank={player.rank}
                  name={player.name}
                  score={player.score}
                  avatarColor={player.avatarColor}
                  avatarInitials={player.avatarInitials}
                />
              ))}
            </div>
          </main>
          {/* Footer for extra mobile spacing */}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default RankTable;
