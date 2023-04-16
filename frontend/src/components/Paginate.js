/**
 * This is a React component that renders pagination links based on the number of pages and current
 * page, with options for admin and search functionality.
 * @returns The `Paginate` component is being returned, which renders a `Pagination` component from the
 * `react-bootstrap` library. The `Pagination` component displays a series of page numbers that can be
 * clicked to navigate to different pages. The `pages`, `page`, `isAdmin`, and `keyword` props are used
 * to determine the number of pages to display, the current active page, and the URL
 */
import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
