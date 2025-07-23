"use client";
import { MenuIcon } from "@/assets/icons/DashIcons";
import { useContext, useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import dashPageContext from "@/app/context/dashPageContext";

const Header = ({ setSidebar }: { setSidebar: () => void }) => {
  // const [first, setfirst] = useState(false);
  const { page, setPage } = useContext(dashPageContext);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-md">
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
          className="hidden lg:block w-1/2 p-2 rounded-md border border-gray-200"
        />
        <div className="hidden lg:flex items-center gap-4">
          <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
            LEARN
          </button>
          <div className="flex items-center gap-2">
            <img src="/images/woman.png" className="w-8 h-8 rounded-full" />
            <span>Chibyke Nwokolo</span>
          </div>
        </div>
        <button onClick={setSidebar} className="block lg:hidden">
          <MenuIcon size={20} />
        </button>
      </header>
    </>
  );
};

export default Header;
