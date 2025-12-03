const Pagination = ({ page, pages, setPage }) => {
    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn"
            >
                Previous
            </button>
            <span className="pagination-text">
                Page {page} of {pages}
            </span>
            <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="btn"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
