import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

interface Props {
  forcePage: number;
  pagesAmount: number;
  initialPage?: number;
  onPageChange: (selectedPage: string) => void;
}

const Pagination = (props: Props) => {
  const { forcePage, pagesAmount, initialPage = 1, onPageChange } = props;

  const handlePageChange = (event: { selected: number }) => {
    onPageChange((event.selected + 1).toString());
  };

  return (
    <ReactPaginate
      breakLinkClassName={styles.breakLink}
      previousLinkClassName={styles.prevLink}
      nextLinkClassName={styles.nextLink}
      containerClassName={styles.container}
      pageLinkClassName={styles.link}
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageChange}
      pageRangeDisplayed={10}
      pageCount={pagesAmount}
      previousLabel="Previous"
      initialPage={initialPage - 1}
      renderOnZeroPageCount={undefined}
      disableInitialCallback
      marginPagesDisplayed={1}
      pageLabelBuilder={(page) => <span aria-hidden="true">{page}</span>}
      ariaLabelBuilder={(pageIndex) => `Go to page ${pageIndex}`}
      forcePage={forcePage - 1}
    />
  );
};

export default Pagination;
