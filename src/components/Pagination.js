import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

/**
 * 7. Add pagination
 */

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    > * {
        margin-right: 0.8rem;
    }
    @media screen and (max-width: 1024px) {
        justify-content: center;
        margin-top: 0.8em;
    }   
`;

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    font-size: 14px;
    padding: 10px;
    border-radius: 2px;
    border: solid 1px #ffff;
    color: #ffffff;
    ${(props) => (props.disabled ? disabled : enabled)};
    ${(props) => (props.active ? active : '')};
`;

const enabled = `
    cursor: pointer;
    background-color: #392b58;
    transition: background-color 0.2s;

    &:hover {
        background-color: #a37ff6;
    }
`;

const active = `
    background-color: #a37ff6;
`

const disabled = `
  background-color: #969696;
`;


function Pagination(props) {
    const initialPage = 1;
    const [pager, setPager] = useState({})
    const { items, onChangePage } = props;

    const getPager = (totalItems, currentPage, pageSize, maxPagesToDisplay) => {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;

        maxPagesToDisplay = maxPagesToDisplay || 10;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= maxPagesToDisplay) {
            startPage = 1;
            endPage = totalPages;
        } else {
            let halfwayPoint = Math.ceil(maxPagesToDisplay / 2);
            let pastHalfwayPoint = Math.floor(maxPagesToDisplay / 2) + 1;
            let beforeHalfwayPoint = halfwayPoint - 1;
            if (currentPage <= pastHalfwayPoint) {
                startPage = 1;
                endPage = maxPagesToDisplay;
            } else if (currentPage + beforeHalfwayPoint >= totalPages) {
                startPage = totalPages - (maxPagesToDisplay - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - halfwayPoint;
                endPage = currentPage + beforeHalfwayPoint;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    const setPage = (page) => {
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        let newPager = getPager(items.length, page, 10, 10);
        let pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);
        setPager(newPager)
        onChangePage(pageOfItems);
    }

    useEffect(() => {
        if (items && items.length) {
            setPage(initialPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    if (!pager.pages || pager.pages.length <= 1) {
        return null;
    }

    return (
        <PaginationContainer>
            <PaginationButton onClick={() => setPage(1)} disabled={pager.currentPage === 1}>First</PaginationButton>
            <PaginationButton onClick={() => setPage(pager.currentPage - 1)} disabled={pager.currentPage === 1}>Previous</PaginationButton>
            {pager.pages.map((page, index) =>
                <PaginationButton key={index} onClick={() => setPage(page)} className={pager.currentPage === page ? 'active' : ''} active={pager.currentPage === page}>{page}</PaginationButton>
            )}
            <PaginationButton onClick={() => setPage(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages}>Next</PaginationButton>
            <PaginationButton onClick={() => setPage(pager.totalPages)} disabled={pager.currentPage === pager.totalPages}>Last</PaginationButton>
        </PaginationContainer>
    )
}

export default Pagination;