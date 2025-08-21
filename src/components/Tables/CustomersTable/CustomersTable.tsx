import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { type Customer } from "@/data/customers-data";

interface CustomersTableProps {
  data: Customer[];
}

export default function CustomersTable({ data }: CustomersTableProps) {
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <Table className="min-w-full border-collapse">
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">
                Customer Name
              </TableHead>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">Company</TableHead>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">
                Phone Number
              </TableHead>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">Email</TableHead>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">Country</TableHead>
              <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-left">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((customer, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors even:bg-gray-50/40">
                <TableCell className="py-3 px-2 sm:px-4 font-medium text-gray-800 whitespace-nowrap">
                  {customer.name}
                </TableCell>
                <TableCell className="py-3 px-2 sm:px-4 whitespace-nowrap">{customer.company}</TableCell>
                <TableCell className="py-3 px-2 sm:px-4 whitespace-nowrap">{customer.phone}</TableCell>
                <TableCell className="py-3 px-2 sm:px-4 truncate max-w-[180px]">{customer.email}</TableCell>
                <TableCell className="py-3 px-2 sm:px-4 whitespace-nowrap">{customer.country}</TableCell>
                <TableCell
                  className={`py-3 px-2 sm:px-4 font-semibold whitespace-nowrap ${
                    customer.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {customer.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
