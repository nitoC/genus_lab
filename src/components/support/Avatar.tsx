import React from "react";

const Avatar = ({
  src,
  alt,
  online,
}: {
  src: string;
  alt: string;
  online: boolean;
}) => (
  <div className="relative">
    <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
    {online && (
      <span className="bottom-0 left-7 absolute w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
    )}
  </div>
);

export default Avatar;
