"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const Back = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-blue flex gap-1 items-center cursor-pointer"
    >
      <span>
        <IoIosArrowRoundBack />
      </span>
      Back
    </button>
  );
};

export default Back;
