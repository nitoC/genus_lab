"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
// import { FiChevronDown } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import CustomInput from "@/components/FormItems/CustomInput";
import CustomDropdown from "@/components/FormItems/CustomSelect";
// import { DayPicker } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";
import CustomDatePicker from "@/components/FormItems/CustomDatePicker";

console.log(classNames);

/* --------------------------------------------------------------------
   Sign Up Page
--------------------------------------------------------------------- */
export default function SignUpPage() {
  const [agree, setAgree] = useState(false);
  const [gender, setGender] = useState("");
  const [marketing, setMarketing] = useState("");
  const [dob, setDob] = useState<Date>();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:flex-row">
          {/* Left / Image */}
          <div className="relative hidden sm:block sm:h-96 lg:flex-1 lg:min-h-[720px]">
            <Image
              src="/images/signup.png"
              alt="Signup illustration"
              fill
              className="object-cover"
              priority
            />
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="absolute left-5 top-5"
            />
            <Link
              href="/"
              className="absolute right-5 top-5 rounded-full !bg-blue/70 px-4 py-1.5 text-xs font-medium !no-underline !text-white backdrop-blur transition hover:!bg-blue"
            >
              Back to website →
            </Link>
          </div>

          {/* Right / Form */}
          <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-semibold">Create an account</h1>
              <p className="mt-2 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue">
                  Log in
                </Link>
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-10 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <CustomInput id="firstName" placeholder="First Name" />
                  <CustomInput id="lastName" placeholder="Last Name" />
                </div>

                <CustomInput type="email" id="email" placeholder="Email" />
                <CustomInput type="tel" id="phone" placeholder="Phone Number" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative w-full">
                    <div
                      className="relative w-full rounded-md border border-gray-300 bg-gray-100 text-sm
               transition focus-within:border-primary focus-within:bg-white
               focus-within:ring-2 focus-within:ring-pink/30"
                    >
                      <CustomDatePicker
                        value={dob}
                        onChange={setDob}
                        placeholder="Date of Birth"
                      />
                      <FaCalendarAlt className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  <CustomDropdown
                    id="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={setGender}
                    options={[
                      { label: "Female", value: "female" },
                      { label: "Male", value: "male" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <CustomDropdown
                    id="marketing"
                    placeholder="How did you hear about us?"
                    value={marketing}
                    onChange={setMarketing}
                    options={[
                      { label: "Friend / Colleague", value: "friend" },
                      { label: "Social Media", value: "social" },
                      { label: "Ad / Online Search", value: "ad" },
                    ]}
                  />
                  <CustomInput
                    id="ref"
                    placeholder="Referral Code (Optional)"
                  />
                </div>

                <label className="flex items-center gap-3 text-xs">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary">
                      Terms&nbsp;&amp;&nbsp;Condition
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agree}
                  className="w-full rounded-md bg-blue py-3 font-medium !text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sign up
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-100 py-3 text-sm font-medium transition hover:bg-gray-200"
                >
                  <FcGoogle className="text-lg" />
                  Log in with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
