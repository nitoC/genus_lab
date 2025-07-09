import React from "react";

interface IButton {
  text: string;
  handler: () => void;
  Icon?: any;
  cat: string;
}

const Button = ({ text, handler, Icon, cat }: IButton) => {
  return (
    <button
      className={` py-[10px] ${
        cat === "primary"
          ? "bg-blue text-white hover:bg-blue-300 transition duration-700"
          : cat === "linear"
          ? "bg-linear-to-r from-white to-blue text-black flex items-center gap-1.5 justify-around"
          : "border text hover:bg-blue transition duration-700 border-blue hover:text-white  text-black"
      } rounded-[16px] px-[30px] cursor-pointer`}
      onClick={handler}
    >
      {text} {Icon && Icon}
    </button>
  );
};

export default Button;
