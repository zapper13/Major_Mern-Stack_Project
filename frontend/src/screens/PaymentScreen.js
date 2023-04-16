/**
 * The PaymentScreen function is a React component that displays a form for selecting a payment method
 * and dispatches an action to save the selected method.
 * @returns The PaymentScreen component is being returned, which contains a form for selecting a
 * payment method and a button to continue to the next step in the checkout process. The component also
 * includes a CheckoutSteps component to display the current step in the checkout process. If the user
 * has not yet entered a shipping address, they will be redirected to the shipping screen. When the
 * form is submitted, the selected payment method is
 */
import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2'>
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
