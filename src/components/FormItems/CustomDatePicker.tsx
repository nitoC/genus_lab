import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns"; // npm i date-fns
import { FaCalendarAlt } from "react-icons/fa";
import "react-day-picker/dist/style.css"; // default theme; customise below

interface Props {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ——— close on click outside ———
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayValue = value ? format(value, "dd/MM/yyyy") : "";

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* fake input */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="relative w-full cursor-pointer rounded-md border border-gray-100 bg-gray-70 px-4 py-3 text-sm
                   transition focus-within:border-primary focus-within:bg-white
                   focus-within:ring-2 focus-within:ring-primary/30"
      >
        <input
          readOnly
          value={displayValue}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder:text-gray-500"
        />
        <FaCalendarAlt className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      {/* calendar pop‑over */}
      {open && (
        <div className="absolute z-30 mt-2 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            defaultMonth={value}
            captionLayout="dropdown" /* month + year dropdowns */
            fromYear={1950}
            toYear={new Date().getFullYear()}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
}
