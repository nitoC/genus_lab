import React from "react";

const Message = ({ avatar, text }: { avatar: any; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0 flex items-center justify-center">
      <span className="text-xl font-bold text-primary">{avatar}</span>
    </div>
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg rounded-tl-none max-w-lg">
      <p className="text-sm text-gray-800 dark:text-gray-200">{text}</p>
    </div>
  </div>
);

export default Message;
