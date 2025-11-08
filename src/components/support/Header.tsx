import React from "react";
import Avatar from "./Avatar";
import { MdOutlineMore } from "react-icons/md";

const Header = () => (
  <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
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

    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
      <span className="material-symbols-outlined">
        <MdOutlineMore size={20} />
      </span>
    </button>
  </header>
);

export default Header;
