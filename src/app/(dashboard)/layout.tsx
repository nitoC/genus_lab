"use client";
import React, { useState, useEffect, ReactNode } from "react";
import DashHeader from "@/components/DashHeader";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const p = path.includes("?") ? path.indexOf("?") : path.length;

  // --- States ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState(
    path ? path.substring(1, p) : "dashboard"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dark, setDark] = useState(true);

  // --- Keep activePage in sync with the current URL ---
  useEffect(() => {
    const cleanPath = path ? path.substring(1, p) : "dashboard";
    setActivePage(cleanPath);
  }, [path]);

  // --- Load theme preference from localStorage ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "true");
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
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          dark={dark}
          setdark={toggleTheme}
        />
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          // alert("clicked");
          setIsSidebarOpen(false);
        }}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[5000px]"
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

      {/* Main Content */}
      <div className="lg:ml-64">
        <DashHeader setSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
