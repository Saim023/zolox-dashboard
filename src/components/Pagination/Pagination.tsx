import { useMemo, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const pages = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center gap-3 justify-center">
      <Button
        onClick={() => setCurrentPage(1)}
        className={`bg-blue-500 hover:bg-blue-600 cursor-pointer ${
          currentPage === 1 ? "hidden" : ""
        }`}
      >
        <FaAngleDoubleLeft />
      </Button>
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`bg-blue-500 hover:bg-blue-600 cursor-pointer ${
          currentPage === 1 ? "hidden" : ""
        }`}
      >
        Prev
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1.5 cursor-pointer transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className={`bg-blue-500 hover:bg-blue-600 cursor-pointer ${
          currentPage === totalPages ? "hidden" : ""
        }`}
      >
        Next
      </Button>
      <Button
        onClick={() => setCurrentPage(totalPages)}
        className={`bg-blue-500 hover:bg-blue-600 cursor-pointer ${
          currentPage === totalPages ? "hidden" : ""
        }`}
      >
        <FaAngleDoubleRight />
      </Button>
    </div>
  );
}
