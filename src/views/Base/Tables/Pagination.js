import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

@inject('tableStore')
@withRouter
@observer
class Pagination extends Component {
    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = (page, spillYn) => {
        const currentPage = Math.max(0, Math.min(page, this.props.tableStore.totalPages));
        this.props.tableStore.setSpillYn(spillYn)
        this.props.tableStore.setCurrentPage(currentPage)
    };

    handleClick = (page, evt) => {
        evt.preventDefault();
        this.gotoPage(page, false);
    };

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.props.tableStore.currentPage - this.props.tableStore.pageNeighbours * 2 - 1, true);
    };

    handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.props.tableStore.currentPage + this.props.tableStore.pageNeighbours * 2 + 1, true);
    };

    fetchPageNumbers = () => {
        const totalPages = this.props.tableStore.totalPages;
        const currentPage = this.props.tableStore.currentPage;
        const pageNeighbours = this.props.tableStore.pageNeighbours;

        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;
            

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }
            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        if (!this.props.tableStore.allData) return null;

        if (this.totalPages === 1) return null;

        const { currentPage } = this.props.tableStore.currentPage;
        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <nav aria-label="Countries Pagination">
                    <ul className="pagination">
                        {pages.map((page, index) => {
                            if (page === LEFT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <a
                                            className="page-link"
                                            href="#"
                                            aria-label="Previous"
                                            onClick={this.handleMoveLeft}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                );

                            if (page === RIGHT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <a
                                            className="page-link"
                                            href="#"
                                            aria-label="Next"
                                            onClick={this.handleMoveRight}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                );

                            return (
                                <li
                                    key={index}
                                    className={`page-item${
                                        currentPage === page ? " active" : ""
                                        }`}
                                >
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={e => this.handleClick(page, e)}
                                    >
                                        {page}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Fragment>
        );
    }
}

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

export default Pagination;
