// components/CustomSelect.tsx
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/* --------------------------------------------------------------------
   Custom Dropdown (replaces <select>) – built with divs
--------------------------------------------------------------------- */
interface CustomDropdownProps {
  id: string;
  placeholder: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown = ({
  id,
  placeholder,
  options,
  value,
  onChange,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full">
      <div
        id={id}
        className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm
                   transition hover:bg-gray-200 focus-within:ring-2 focus-within:!ring-pink/30"
        onClick={() => setOpen((prev: any) => !prev)}
      >
        <span className={selected ? "" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-blue ${
                opt.value === value ? "bg-grey text-blue" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
