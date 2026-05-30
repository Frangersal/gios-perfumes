import React from 'react';

interface CategoryPaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export default function CategoryPagination({ currentPage, lastPage, onPageChange }: CategoryPaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    const pageStart = Math.max(1, currentPage - 2);
    const pageEnd = Math.min(lastPage, pageStart + 4);
    const pages: number[] = [];

    for (let page = pageStart; page <= pageEnd; page += 1) {
        pages.push(page);
    }

    return (
        <nav aria-label="Category pagination">
            <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                    <button
                        type="button"
                        className="page-link bg-dark text-light border-secondary"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo; Ant</span>
                    </button>
                </li>

                {pages.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button
                            type="button"
                            className={`page-link border-secondary ${page === currentPage ? 'bg-light text-dark fw-semibold' : 'bg-dark text-light'}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage >= lastPage ? 'disabled' : ''}`}>
                    <button
                        type="button"
                        className="page-link bg-dark text-light border-secondary"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= lastPage}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">Sig &raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}