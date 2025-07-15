import Image from "next/image";
import React from "react";

const Review = ({
  name,
  text,
  avatar,
  occupation,
  achievement,
}: {
  name: string;
  text: string;
  avatar?: string;
  occupation?: string;
  achievement: string;
}) => {
  return (
    <div
      className={`bg-gradient-to-r min-w-[320px] max-w-[419px] h-[500px] md:w-[419px] shrink-0 md:h-[369px] from-purple-400 via-pink-500 to-blue-500 p-[2px] rounded-[20px] shadow-lg `}
    >
      <div className="bg-[#E6FAF9] rounded-[18px] p-6 md:p-8 text-center h-full flex flex-col justify-between">
        <div className="flex flex-col gap-[10px] justify-center mb-4">
          {/* Replace with actual icon if available */}
          <p className="text-justify text-gray-800 leading-relaxed">{text}</p>
          <p className="text-justify text-gray-800 leading-relaxed">
            {achievement}
          </p>

          {/* <span className="text-xl">👥</span> */}
        </div>
        <div className="card_footer flex gap-[10px] items-center">
          <div className="avatar-container w-[40px] h-[40px]">
            <Image
              layout="responsive"
              width={40}
              height={40}
              src={avatar ? avatar : "/images/woman.png"}
              alt="avatar"
            />
          </div>
          <div className="card-desc">
            <h3 className="text-xl text-left text-[20px] font-black mb-3 text-black">
              {name}
            </h3>
            <p className="text-[20px] font-bold">
              {occupation && occupation?.length < 25
                ? occupation
                : occupation?.substring(0, 25) + "..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
