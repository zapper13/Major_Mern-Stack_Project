/**
 * This is a React component that renders a search box with a submit button and allows the user to
 * search for products.
 * @returns A functional component named SearchBox is being returned. It renders a Form with a text
 * input and a submit button. The value of the text input is stored in the state variable 'keyword'
 * using the useState hook. When the form is submitted, the submitHandler function is called which
 * prevents the default form submission behavior, checks if the keyword is not empty, and redirects the
 * user to the search results page
 */
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} style={{display: "inline-flex"}}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
      ></Form.Control>
      &nbsp;&nbsp;
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
