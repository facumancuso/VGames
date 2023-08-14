import React from 'react';
import styles from './styles/Pagination.module.css';

function Pagination({ currentPage, totalPages, paginate }) {
  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // Determine the range of page numbers to display (max 3)
  let start = Math.max(currentPage - 1, 1);
  let end = Math.min(start + 2, totalPages);
  if (end - start < 2) {
    start = Math.max(end - 2, 1);
  }

  return (
    <div className={styles.pagination}>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`${styles.button} ${currentPage === number ? styles.active : ''}`}
        >
          {number}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
