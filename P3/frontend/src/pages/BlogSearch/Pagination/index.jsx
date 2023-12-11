import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];

    // Adding 'Previous' button
    pages.push(
        <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#search" onClick={() => onPageChange(currentPage - 1)}>Previous</a>
        </li>
    );

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <a className="page-link" href="#search" onClick={() => onPageChange(i)}>
                    {i}
                </a>
            </li>
        );
    }

    // Adding 'Next' button
    pages.push(
        <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#search" onClick={() => onPageChange(currentPage + 1)}>Next</a>
        </li>
    );

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages}
            </ul>
        </nav>
    );
}

export default Pagination;
