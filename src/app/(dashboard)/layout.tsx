"use client";
import React, { useState, useEffect, ReactNode } from "react";

import DashHeader from "@/components/DashHeader";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();

  // Start with safe defaults
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState(
    path ? path.substring(1) : "dashbaord"
  );
  console.log(path, "path");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dark, setDark] = useState(true);

  // Load theme from localStorage after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "false" ? false : true);
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next.toString());
      return next;
    });
  };

  return (
    <div
      className={`${
        dark ? "dark" : ""
      } dark:bg-gray-950 min-h-screen font-sans text-gray-900`}
    >
      {/* Static Sidebar for large screens */}
      <div className="hidden lg:block">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          dark={dark}
          setdark={toggleTheme}
        />
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-1000px]"
        }`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setIsSidebarOpen(false);
          }}
          dark={dark}
          setdark={toggleTheme}
        />
      </div>

      <div className="lg:ml-64">
        <DashHeader setSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
