/**
 * The Meta function is a React component that sets the title, description, and keywords for a web page
 * using the Helmet library.
 * @returns The `Meta` component is being returned, which renders a `Helmet` component from the
 * `react-helmet` library. The `Helmet` component sets the title of the page and adds meta tags for
 * description and keywords. The values for these props can be passed in as props to the `Meta`
 * component, or default values will be used if they are not provided.
 */
import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Online Outpost',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
}

export default Meta
