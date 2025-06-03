import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Paginations({
  currentPage,
  totalRecords,
  totalPages,
  setCurrentPage,
  limit,
  tableDataLength,
  showPagination,
}) {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex items-center justify-between bg-lightthemecolor text-darkthemecolor bdark:bg-darkthemecolor bdark:text-lightthemecolor pt-4">
      <div className="flex flex-1 flex-col-reverse gap-1 md:flex-row items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 relative z-10 bdark:text-white">
            Showing{" "}
            <span className="font-medium">
              {tableDataLength !== 0 ? (currentPage - 1) * limit + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(totalRecords, (currentPage - 1) * limit + tableDataLength)}
            </span>{" "}
            of <span className="font-medium">{totalRecords}</span> results
          </p>
        </div>

        <div>
          {/* Mobile Select Dropdown */}
          <nav className="isolate inline-flex gap-2 -space-x-px rounded-md shadow-sm relative z-10 md:hidden" aria-label="Pagination">
            <select
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              value={currentPage}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option disabled>Go to Page</option>
              {showPagination?.map((pageNumber, i) => (
                <option key={i} value={pageNumber}>
                  {pageNumber}
                </option>
              ))}
            </select>
            <div className="flex">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 rounded-l-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bdark:hover:bg-gray-600 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-2 rounded-r-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bdark:hover:bg-gray-600 disabled:opacity-50"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </nav>

          {/* Desktop Pagination */}
          <nav className="hidden md:flex">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {showPagination?.map((page, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > Math.max(...showPagination || [0]) && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </nav>
        </div>
      </div>
    </div>
  );
}
