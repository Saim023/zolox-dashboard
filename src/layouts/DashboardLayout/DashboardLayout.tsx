import Navbar from "@/components/Navbar/Navbar";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar/DesktopSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DesktopSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="z-10">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Mobile search bar */}
        <div className="p-5 block lg:hidden">
          <SearchBar />
        </div>

        {/* Page Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
