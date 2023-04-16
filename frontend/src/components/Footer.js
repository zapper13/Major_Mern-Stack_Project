/**
 * This is a React functional component that renders a footer with a copyright notice.
 * @returns The Footer component is being returned, which contains a footer element with a Container,
 * Row, and Col element from the React Bootstrap library. The Col element contains the text "Copyright
 * © Online Outpost".
 */
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Online Outpost</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
