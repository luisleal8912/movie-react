import React from "react";
import Pagination from "rc-pagination";
import "./Pagination.scss";

export default function PaginationMovies(props) {
  const { currentPage, totalItems, onChangePages } = props;

  return (
    <Pagination
      className="pagination"
      current={currentPage}
      total={totalItems}
      pageSize={20}
      onChange={onChangePages}
    />
  );
}
