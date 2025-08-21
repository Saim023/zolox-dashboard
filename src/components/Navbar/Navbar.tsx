import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import profileImg from "../../assets/1000005577.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { HiMenu } from "react-icons/hi";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <div className="flex items-center justify-between lg:py-6 lg:px-10 px-4 py-3">
      {/* Menu button for mobile */}
      <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={onMenuClick}>
        <HiMenu className="text-2xl" />
      </button>

      <div className="flex items-center justify-between lg:ml-64">
        <h1 className="font-semibold text-2xl">Dashboard</h1>
      </div>

      <div className="hidden lg:block">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
          <input
            type="search"
            placeholder="Search here..."
            className="flex h-9 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="flex items-center px-5">
        <div className="flex items-stretch">
          <IoNotificationsOutline className="text-blue-400 text-2xl font-bold cursor-pointer" />
          <Badge
            className="h-5 min-w-5 rounded-full text-blue-300 text-xs px-1 font-mono tabular-nums"
            variant="outline"
          >
            20+
          </Badge>
        </div>
        <div className="ml-4">
          <img className="w-[36px] h-[36px] rounded-md" src={profileImg} alt="profileImg" />
        </div>
        <NavLink to="#" className="flex items-center">
          <div className="ml-2">
            <h1 className="text-md font-semibold">Saim</h1>
            <p className="text-xs text-gray-600 font-semibold">Admin</p>
          </div>
          <div className="ml-1.5">
            <IoIosArrowDown />
          </div>
        </NavLink>
      </div>
    </div>
  );
}
