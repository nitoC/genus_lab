"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { MdOutlineMore } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIYefst64mlVr1-W38vZzNXXByXH2g0Fv3TmJumN7gW_o0okHqCvJ9A6y-VsWPvEJDbdVKEQMCb7NelPkAsf6oni8cAQS97t7796yZRjWkfDk7mW1vsz7Koj3I8IRr6UG2Q1TpOKEgp2n0jyGD6I3zKnlUV0PL21iZu6EtwW6zMHHFUO0H8Ha10zDiMY62eif8svBfWFmm2yCdJYe_dsjdhrTW7lgcB-w-FbWNfRvCY4zmDcdWJMDT4GyEaRdvUh4uyfOsUTh0moWF"
          alt="Tobi"
          online
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Tobi</p>
          <p className="text-sm text-green-600 dark:text-green-500">Online</p>
        </div>
      </div>

      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <MdOutlineMore size={20} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <ul className="flex flex-col py-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <FaFacebookF className="text-blue-600" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <FaInstagram className="text-pink-500" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <FaTwitter className="text-sky-500" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
