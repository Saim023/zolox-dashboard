import Pagination from "@/components/Pagination/Pagination";
import CustomersTable from "@/components/Tables/CustomersTable/CustomersTable";
import { customers } from "@/data/customers-data";
import { useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserPlus } from "react-icons/fa";

export default function Renters() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = customers.slice(firstItemIndex, lastItemIndex);

  // For cards
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((a) => a.status === "Active").length;
  const inactiveCustomers = customers.filter((i) => i.status === "Inactive").length;
  const newCustomers = 0;

  const cards = [
    {
      title: "Total Renters",
      value: totalCustomers,
      icon: <FaUsers />,
      color: "text-blue-500",
      cardBg: "bg-blue-100",
    },
    {
      title: "Active Renters",
      value: activeCustomers,
      icon: <FaUserCheck />,
      color: "text-green-500",
      cardBg: "bg-green-100",
    },
    {
      title: "Inactive Renters",
      value: inactiveCustomers,
      icon: <FaUserTimes />,
      color: "text-red-500",
      cardBg: "bg-red-100",
    },
    {
      title: "New Renters",
      value: newCustomers,
      icon: <FaUserPlus />,
      color: "text-yellow-500",
      cardBg: "bg-orange-100",
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto pb-10">
      <div className="mt-3 px-4 sm:px-5 lg:px-6 xl:px-7">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col items-center p-6 rounded-lg shadow hover:shadow-lg transition-shadow ${card.cardBg}`}
            >
              <div className={`text-4xl mb-2 ${card.color}`}>{card.icon}</div>
              <h1 className="text-2xl font-bold">{card.value}</h1>
              <p className="text-gray-500">{card.title}</p>
            </div>
          ))}
        </div>
        <CustomersTable data={currentItems} />
        <div className="mt-6">
          <Pagination
            totalItems={customers.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
