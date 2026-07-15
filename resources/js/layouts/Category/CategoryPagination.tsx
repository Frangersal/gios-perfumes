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
        <nav aria-label="Paginación de categoría" className="gp-cat-pagination">
            <ul className="gp-cat-pagination__list">
                <li>
                    <button
                        type="button"
                        className="gp-cat-pagination__btn"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="Página anterior"
                    >
                        &laquo; Ant
                    </button>
                </li>

                {pages.map((page) => (
                    <li key={page}>
                        <button
                            type="button"
                            className={`gp-cat-pagination__btn${page === currentPage ? ' is-active' : ''}`}
                            onClick={() => onPageChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        type="button"
                        className="gp-cat-pagination__btn"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= lastPage}
                        aria-label="Página siguiente"
                    >
                        Sig &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}