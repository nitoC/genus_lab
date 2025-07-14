// components/CustomInput.tsx
import React from "react";

// interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
// }

/* --------------------------------------------------------------------
   Custom Input (same as before)
--------------------------------------------------------------------- */
const CustomInput = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div
    className={`relative w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm
               transition focus-within:border-primary focus-within:bg-white
               focus-within:ring-2 focus-within:ring-${
                 props.color ? props.color : "pink"
               }/30 ${className}`}
  >
    <input
      {...props}
      className="w-full bg-transparent outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
    />
  </div>
);
export default CustomInput;
