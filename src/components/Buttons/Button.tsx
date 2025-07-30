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
      className={`py-[.6rem] font-bold rounded-[32px] px-[30px] cursor-pointer transition duration-500 ease-in-out ${
        cat === "primary"
          ? "bg-blue text-white hover:bg-blue-300"
          : cat === "linear"
          ? "btn-animated-gradient bg-gradient-to-r from-white to-blue/30 text-blue flex items-center gap-1.5 justify-around"
          : "border text hover:bg-blue border-blue hover:text-white text-black"
      }`}
      onClick={handler}
    >
      <span>{text}</span>
      {Icon && Icon}
    </button>
  );
};

export default Button;
