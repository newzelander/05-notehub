import ReactPaginateModule from "react-paginate";
import type { ComponentType } from "react";

import css from "./Pagination.module.css";

interface ReactPaginateProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;

  containerClassName?: string;
  activeClassName?: string;
}

const ReactPaginate =
  (
    ReactPaginateModule as unknown as {
      default: ComponentType<ReactPaginateProps>;
    }
  ).default ?? ReactPaginateModule;

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
