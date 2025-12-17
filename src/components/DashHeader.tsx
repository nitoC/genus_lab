"use client";
import { MenuIcon } from "@/assets/icons/DashIcons";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import dashPageContext from "@/app/context/dashPageContext";
import getSessionStorage from "@/utils/getSessionStorage";
import Link from "next/link";

const Header = ({ setSidebar }: { setSidebar: () => void }) => {
  const { page, setPage } = useContext(dashPageContext);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data only on client side
  useEffect(() => {
    const user = getSessionStorage("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
    setIsLoading(false);
  }, []);

  // Show loading state during hydration
  if (isLoading) {
    return (
      <header className="flex justify-between items-center px-6 py-4 text-black shadow-md">
        <div className="lg:hidden">
          <Image
            src="/images/logo_mobile.png"
            alt="logo"
            width={146}
            height={49}
            className="md:hidden"
          />
        </div>
        <div className="hidden lg:block w-1/2 h-10 bg-gray-200 rounded-md animate-pulse" />
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <button className="block lg:hidden dark:text-white">
          <MenuIcon size={20} />
        </button>
      </header>
    );
  }

  // Show message if no user data
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Please log in to continue</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 text-black shadow-md">
        <div className="lg:hidden">
          <Image
            src="/images/logo_mobile.png"
            alt="logo"
            width={146}
            height={49}
            className="md:hidden"
          />
        </div>
        <input
          type="text"
          placeholder="Quick Search"
          className="dark:text-mygrey hidden lg:block w-1/2 p-2 rounded-md border border-gray-200 dark:border-mygrey/40"
        />
        <div className="hidden lg:flex items-center gap-4">
          <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
            LEARN
          </button>
          <Link href={"/profile"} className="flex items-center gap-2">
            <img
              src="/images/woman.png"
              className="w-8 h-8 rounded-full"
              alt="Profile"
            />
            <span className="dark:text-mygrey">{userData.fullname}</span>
          </Link>
        </div>
        <button
          onClick={setSidebar}
          className="block lg:hidden dark:text-white"
        >
          <MenuIcon size={20} />
        </button>
      </header>
    </>
  );
};

export default Header;
