import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={(event) => onPageChange(event.selected)}
        forcePage={currentPage}
        containerClassName={
          "pagination flex justify-center items-center space-x-2"
        }
        activeClassName={"active bg-blue-500 text-white rounded-lg px-3 py-1"}
        pageClassName={"page-item rounded-md"}
        pageLinkClassName={
          "page-link text-white hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
        }
        previousClassName={"page-item"}
        previousLinkClassName={
          "btn btn-outline text-blue-500 border-blue-500 hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
        }
        nextClassName={"page-item"}
        nextLinkClassName={
          "btn btn-outline text-green border-green hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
        }
        breakLabel={"..."}
        breakClassName={"break-me text-blue-500"}
      />
    </div>
  );
};

export default Pagination;
