/**
 * The Loader function returns a spinning animation indicating that content is loading.
 * @returns The Loader component is being returned, which renders a Spinner component from the
 * react-bootstrap library. The Spinner component displays a loading animation with a message
 * "Loading..." and some styling.
 */
import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: '40px auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
