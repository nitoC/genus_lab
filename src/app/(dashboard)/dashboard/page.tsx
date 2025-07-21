"use client";
import React, { Suspense, useState } from "react";
import { FiEye, FiEyeOff } from "@/assets/icons/DashIcons";
const QuizzesPage = React.lazy(() => import("@/components/Dashboard/Quiz"));
const DashboardPage = React.lazy(
  () => import("@/components/Dashboard/Dashboard")
);
const LeaderPage = React.lazy(
  () => import("@/components/Dashboard/Leaderboard")
);
const Profile = React.lazy(
  () => import("@/components/Dashboard/Profile")
);
// import DashboardPage from "";
import DashHeader from "@/components/DashHeader";
import Sidebar from "@/components/Sidebar";

// --- Reusable Input Components (from user code) ---
const WrappedInput = ({ className = "", hasIcon = false, ...props }) => (
  <div
    className={`relative w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/30 ${className}`}
  >
    <input
      {...props}
      className={`w-full bg-transparent outline-none placeholder:text-gray-500 ${
        hasIcon ? "pr-8" : ""
      }`}
    />
  </div>
);

// const PasswordInput = ({
//   id,
//   placeholder,
// }: {
//   id: string;
//   placeholder: string;
// }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="relative">
//       <WrappedInput
//         id={id}
//         type={show ? "text" : "password"}
//         placeholder={placeholder}
//         hasIcon
//         autoComplete="current-password"
//       />
//       <button
//         type="button"
//         onClick={() => setShow((s) => !s)}
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//         aria-label={show ? "Hide password" : "Show password"}
//       >
//         {show ? <FiEyeOff /> : <FiEye />}
//       </button>
//     </div>
//   );
// };

// --- Login Page Component ---
// const LoginPage = ({ onLogin }) => {
//   const [agree, setAgree] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you'd call your API here.
//     // For this demo, we'll just call the onLogin callback.
//     onLogin();
//   };

//   return (
//     <main className="min-h-screen bg-blue-500 px-4 py-12 font-sans">
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:flex-row">
//           {/* Left Artwork */}
//           <div className="relative hidden bg-blue-600 sm:block sm:h-96 lg:flex-1 lg:min-h-[720px]">
//             <img
//               src="https://placehold.co/800x1000/2A8CFF/FFFFFF?text=Welcome"
//               alt="Security Illustration"
//               className="h-full w-full object-cover"
//             />
//             <a
//               href="#"
//               className="absolute right-5 top-5 rounded-full bg-blue-500/80 px-4 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-blue-500"
//             >
//               Back to website →
//             </a>
//           </div>

//           {/* Right Form */}
//           <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:px-16">
//             <div className="w-full max-w-md text-center">
//               <img
//                 src="https://placehold.co/100x100/2A8CFF/FFFFFF?text=G"
//                 alt="Logo"
//                 width={80}
//                 height={80}
//                 className="mx-auto my-8 rounded-full"
//               />
//               <div className="mb-10">
//                 <h1 className="mb-1 text-2xl font-semibold text-gray-800 md:text-3xl">
//                   Welcome Back!
//                 </h1>
//                 <p className="text-sm text-gray-600">
//                   Please enter your login details
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <WrappedInput
//                   id="email"
//                   placeholder="Enter Email"
//                   type="email"
//                   autoComplete="email"
//                 />
//                 <PasswordInput id="password" placeholder="Enter Password" />
//                 <div className="flex items-center justify-between text-sm">
//                   <label className="flex items-center gap-2 text-gray-600">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
//                       checked={agree}
//                       onChange={() => setAgree(!agree)}
//                     />
//                     Remember for 30 days
//                   </label>
//                   <a
//                     href="#"
//                     className="font-medium text-blue-500 hover:underline"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Login
//                 </button>
//                 <button
//                   type="button"
//                   className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
//                 >
//                   <FcGoogle />
//                   Log in with Google
//                 </button>
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?{" "}
//                   <a
//                     href="#"
//                     className="font-medium text-blue-500 hover:underline"
//                   >
//                     Sign up
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// --- Header for Dashboard Pages ---

// const DashboardHeader = ({ title, onMenuClick }) => (
//   <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 p-4 sm:p-6 flex items-center justify-between border-b border-gray-200">
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
//     </div>
//     <div className="flex items-center gap-4">
//       <div className="relative hidden md:block">
//         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Quick Search"
//           className="bg-gray-100 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button className="hidden md:inline-block text-sm font-semibold text-blue-500 border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50 transition">
//         LEARN...
//       </button>
//       <div className="flex items-center gap-3">
//         <img
//           src="https://i.pravatar.cc/40?img=1"
//           alt="User Avatar"
//           className="w-10 h-10 rounded-full"
//         />
//         <div className="hidden sm:block">
//           <p className="font-semibold text-sm text-gray-800">Chibyke Nwokolo</p>
//         </div>
//       </div>
//       <SettingsIcon className="text-gray-500 h-6 w-6 cursor-pointer hover:text-blue-500 transition" />
//       <button onClick={onMenuClick} className="lg:hidden text-gray-600">
//         <MenuIcon className="h-6 w-6" />
//       </button>
//     </div>
//   </header>
// );

// --- Placeholder Pages ---

const LeaderboardPage = () => (
  <LeaderPage/>
);
const ExploralPage = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold">Exploral Content</h2>
  </div>
);
const ProfilePage = () => (
  <Profile />
);

// --- Quizzes Page Component (based on image) ---

// --- Main App Component ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // Default to Quizzes
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <DashboardPage />
          </Suspense>
        );
      case "quizzes":
        return (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <QuizzesPage />
          </Suspense>
        );
      case "leaderboard":
        return <LeaderboardPage />;
      case "exploral":
        return <ExploralPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <QuizzesPage />;
    }
  };

  const pageTitles = {
    dashboard: "Dashboard",
    quizzes: "Quizzes",
    leaderboard: "Leaderboard",
    exploral: "Exploral",
    profile: "Profile",
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* Static Sidebar for large screens */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <DashHeader />
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}
