"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const CustomDropdown = ({ options, selected, onSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: any) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block min-w-[120px]" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full border border-gray-300 rounded-lg py-2 pl-4 pr-3 text-sm font-medium dark:text-fuchsia-50 text-gray-700 hover:bg-gray-100 dark:hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected}</span>
        <FaChevronDown
          className={`ml-2 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-200`}
        />
      </button>

      {isOpen && (
        <div className="absolute dark:bg-gray-900 bg-white right-0 z-10 mt-2 w-full min-w-[120px] origin-top-right rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option: any) => (
              <a
                key={option}
                href="#"
                className={`block px-4 py-2 text-sm   hover:bg-indigo-50 hover:text-indigo-600 transition duration-100 ${
                  selected === option
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "dark:text-gray-50 text-gray-700"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option);
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
