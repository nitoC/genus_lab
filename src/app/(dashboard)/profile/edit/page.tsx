"use client";
import Back from "@/components/Buttons/Back";
import React, { ChangeEvent, useState } from "react";

const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  type?: string;
  label: string;
  value: any;
  onChange: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value;

  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className={`absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 transform ${
          showLabel
            ? "floating-label-active"
            : "top-1/2 -translate-y-1/2 text-base"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-4 py-3 border-2 border-gray-200/10 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-sm"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

const FloatingLabelTextarea = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: any;
  onChange: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value;

  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className={`absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-300 transform ${
          showLabel ? "floating-label-active" : "text-base"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        className="w-full px-4 py-3 border-2 border-gray-200/10 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-sm resize-none"
        rows={5}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

const AnimatedButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="w-full py-4 text-white font-bold rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg relative overflow-hidden transition-transform duration-200 active:scale-95"
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10" />
    </button>
  );
};

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    about: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // You should replace this with a proper modal or message box
    console.log("Form data:", formData);
    alert("Form Submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <style>
        {`
        .floating-label-active {
          transform: translateY(-3rem) translateX(0) scale(0.875);
          color: #2563EB; /* Blue color for active label */
          top: 50%;
        }

        @keyframes fadeInSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .fade-in-slide-up {
          animation: fadeInSlideUp 0.8s ease-out forwards;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }

        .bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
        `}
      </style>
      <div className="w-full">
        <Back />
      </div>
      <div className="relative w-full max-w-lg dark:text-white p-8 rounded-3xl shadow-2xl overflow-hidden backdrop-filter backdrop-blur-lg">
        {/* Background circuit pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path
              d="M 10 10 L 90 10 L 90 90 L 10 90 L 10 10"
              stroke="#374151"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 20 20 L 80 20 L 80 80 L 20 80 L 20 20"
              stroke="#374151"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 30 30 L 70 30 L 70 70 L 30 70 L 30 30"
              stroke="#374151"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 40 40 L 60 40 L 60 60 L 40 60 L 40 40"
              stroke="#374151"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="50" cy="50" r="5" fill="#374151" />
            <path
              d="M 10 50 L 50 50 M 90 50 L 50 50 M 50 10 L 50 50 M 50 90 L 50 50"
              stroke="#374151"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10 fade-in-slide-up">
          <h2 className="text-3xl font-extrabold text-center mb-10 dark:text-blue text-gray-800 bounce-in">
            Complete your profile
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FloatingLabelInput
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <FloatingLabelInput
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <FloatingLabelInput
              id="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />
            <FloatingLabelInput
              id="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <FloatingLabelTextarea
              id="about"
              label="About"
              value={formData.about}
              onChange={handleChange}
            />
            <div className="mt-6">
              <AnimatedButton text="Save" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
