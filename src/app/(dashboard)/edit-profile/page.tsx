"use client";

import DashHeader from "@/components/DashHeader";
import Header from "@/components/DashHeader";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <DashHeader setSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
};

export default page;
