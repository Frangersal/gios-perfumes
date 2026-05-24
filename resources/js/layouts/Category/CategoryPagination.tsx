import React from 'react';

export default function CategoryPagination() {
    return (
        <nav aria-label="Category pagination">
            <ul className="pagination justify-content-center mb-0">
                <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo; Ant</span>
                    </a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">Sig &raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}