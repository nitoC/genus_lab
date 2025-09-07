"use client";
import React, { useState, ReactNode } from "react";

import DashHeader from "@/components/DashHeader";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function App({ children }: { children: ReactNode }) {
  const path = usePathname();
  let theme = localStorage.getItem("theme") === "true" ;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState(path); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dark, setdark] = useState(theme??false);
 
 
 console.log(path);

  // const handleLogin = () => setIsLoggedIn(true);

  return (
    <div
      className={`${
        dark && "dark"
      } dark:bg-gray-950 min-h-screen font-sans text-gray-900`}
    >
      {/* Static Sidebar for large screens */}
      <div className="hidden lg:block">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          // onLogout={handleLogout}
          dark={dark}
          setdark={() =>{ setdark(!dark)
            localStorage.setItem("theme", (!dark).toString());
          }}
        />
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full  z-50 transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-1000px]"
        }`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setIsSidebarOpen(false);
          }}
          // onLogout={handleLogout}
          dark={dark}
          setdark={() => setdark(!dark)}
        />
      </div>

      <div className="lg:ml-64">
        <DashHeader setSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
