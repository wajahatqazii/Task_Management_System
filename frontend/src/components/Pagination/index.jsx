import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ meta, setFilters, filters }) => {
  const { hasNextPage, hasPreviousPage, page, pageCount } = meta;
  const handlePageChange = (newPage) => {
    // Handle page change, e.g., fetch new data based on the newPage
    setFilters({ ...filters, page: newPage });
  };

  const renderPageNumbers = () => {
    const pagesToShow = 5;

    if (pageCount <= pagesToShow) {
      // Render all page numbers if there are less than or equal to 5 pages
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      // Render a range of 5 page numbers, followed by a "Next" button
      const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
      const endPage = Math.min(pageCount, startPage + pagesToShow - 1);

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    }
  };

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={!hasPreviousPage}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
      />

      {renderPageNumbers().map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === page}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      {pageCount > 5 && <Pagination.Ellipsis disabled />}

      {pageCount > 5 && (
        <Pagination.Item
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
        >
          Next
        </Pagination.Item>
      )}

      <Pagination.Last
        onClick={() => handlePageChange(pageCount)}
        disabled={!hasNextPage}
      />
    </Pagination>
  );
};

export default PaginationComponent;
