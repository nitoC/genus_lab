"use client";
import {
  CompassIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  TrophyIcon,
  UserIcon,
} from "@/assets/icons/DashIcons";

import { MdContactSupport, MdModeNight } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = ({
  activePage,
  setActivePage,
  dark,
  setdark,
}: {
  activePage: string;
  setActivePage: (val: string) => void;
  dark: boolean;
  setdark: () => void;
}) => {
  const router = useRouter();
  const navItems = [
    { name: "Dashboard", icon: HomeIcon, page: "dashboard" },
    { name: "Quizzes", icon: HelpCircleIcon, page: "quiz" },
    { name: "Leaderboard", icon: TrophyIcon, page: "leaderboard" },
    { name: "Exploral", icon: CompassIcon, page: "explorer" },
    { name: "Profile", icon: UserIcon, page: "profile" },
    { name: "Support", icon: MdContactSupport, page: "support" },
  ];

  return (
    <div className="fixed top-0 left-0 min-h-screen ">
      <aside className=" text-gray-700 dark:bg-gray-950 bg-white w-64 p-6 flex-col flex ">
        <div className="text-3xl flex justify-center items-center font-bold mb-10 text-blue-500">
          <img
            width={55}
            src="/images/logo.png"
            alt="Logo"
            className="rounded-lg"
          />
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`${item.page}`}
              onClick={(e) => {
                e.preventDefault();
                setActivePage(item.page);
                router.push(`/${item.page}`);
              }}
              className={`flex text-blue-500 items-center gap-4 p-3 rounded-lg transition-all text-base font-medium relative ${
                activePage === item.page ? "bg-blue-50 " : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {activePage === item.page && (
                <div className="absolute right-0 h-6 w-1 bg-blue-500 rounded-l-md"></div>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <a
            href="#"
            onClick={(e) => {
              // e.preventDefault();
              sessionStorage.clear();
              router.push("/login");
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
    </div>
  );
};

export default Sidebar;
