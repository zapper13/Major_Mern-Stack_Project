/**
 * The function exports a React component that renders a form container with a specified number of
 * columns.
 * @returns The `FormContainer` component is being returned. It is a functional component that takes in
 * a `children` prop and returns a `Container` component from `react-bootstrap` with a single `Row` and
 * `Col` component. The `children` prop is rendered inside the `Col` component.
 */
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
