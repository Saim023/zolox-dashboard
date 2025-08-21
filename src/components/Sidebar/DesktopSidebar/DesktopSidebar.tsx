import { NavLink } from "react-router-dom";
import { TbBrandZulip, TbLogout } from "react-icons/tb";
import { LuChartBarBig, LuMessageSquareMore } from "react-icons/lu";
import { PiChartLineUp, PiUserListBold } from "react-icons/pi";
import { RiBarChartBoxAiLine } from "react-icons/ri";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { GrVmMaintenance } from "react-icons/gr";

interface DesktopSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DesktopSidebar({ isOpen, setIsOpen }: DesktopSidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-opacity-40 z-50 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-50 border-r border-gray-200 flex-shrink-0 z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:flex-col`}
      >
        <div className="mb-8 w-full">
          <NavLink
            to="/"
            className="flex items-center gap-2 justify-center text-2xl font-bold my-5 font-[Cinzel-decorative] text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <TbBrandZulip className="text-2xl" />
            <span>ZOLOX</span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <RiBarChartBoxAiLine className="text-xl" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/renters"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <PiUserListBold className="text-xl" />
                <span>Renters</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservations"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <LuChartBarBig className="text-xl" />
                <span>Reservations</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/maintenance"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <GrVmMaintenance className="text-xl" />
                <span>Maintenance</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payments"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <LiaMoneyCheckAltSolid className="text-xl" />
                <span>Payments</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <PiChartLineUp className="text-xl" />
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <LuMessageSquareMore className="text-xl" />
                <span>Message</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <TbLogout className="text-xl" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
