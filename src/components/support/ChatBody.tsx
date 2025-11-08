import React from "react";
import Message from "./Message";

const OptionButton = ({ number, label }: any) => (
  <button className="flex items-center w-full p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left hover:border-primary dark:hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 flex items-center justify-center text-sm mr-4">
      {number}
    </span>
    <span className="flex-grow font-medium text-gray-800 dark:text-white">
      {label}
    </span>
  </button>
);

const ChatBody = () => (
  <main className="flex-1 overflow-y-auto p-6 space-y-6">
    <div className="flex justify-center">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium py-2 px-6 rounded-full shadow-md">
        Tobi has joined the chat.
      </div>
    </div>

    <div className="flex justify-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Please read our{" "}
        <a className="text-primary hover:underline" href="#">
          Privacy Policy
        </a>
      </p>
    </div>

    <Message
      avatar="G"
      text="Hi! I'm here to help with transactions, withdrawals, or account issues — what's going on?"
    />

    <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-300 font-medium">
        What can I help you with?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <OptionButton number="1" label="Withdrawal Issues" />
        <OptionButton number="2" label="Failed Transaction" />
        <OptionButton number="3" label="General Support" />
        <OptionButton number="4" label="More Menu" />
      </div>
    </div>
  </main>
);

export default ChatBody;
