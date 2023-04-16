import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


/* This is defining a function called `addOrderItems` that uses the `asyncHandler` middleware to handle
any errors that may occur during the asynchronous execution of the function. The function takes in a
`req` (request) and `res` (response) object as parameters. */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

/* This code block is checking if there are any order items in the request body. If there are no order
items, it sets the response status to 400 (Bad Request) and throws an error message "No order
items". If there are order items, it creates a new order object with the provided information and
saves it to the database. */
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


/* `const getOrderById` is a function that uses the `asyncHandler` middleware to handle any errors that
may occur during the asynchronous execution of the function. It takes in a `req` (request) and `res`
(response) object as parameters. */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

/* This code block is checking if an order with the specified ID exists in the database. If it does, it
sends a JSON response with the order information. If it does not exist, it sets the response status
to 404 (Not Found) and throws an error message "Order not found". */
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

/* `const updateOrderToPaid` is a function that updates an order in the database to indicate that it
has been paid for. It uses the `asyncHandler` middleware to handle any errors that may occur during
the asynchronous execution of the function. */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


/* `const updateOrderToDelivered` is a function that updates an order in the database to indicate that
it has been delivered. It uses the `asyncHandler` middleware to handle any errors that may occur
during the asynchronous execution of the function. It first finds the order by its ID, then sets the
`isDelivered` property to `true` and the `deliveredAt` property to the current date and time.
Finally, it saves the updated order to the database and sends a JSON response with the updated order
information. If the order is not found, it sets the response status to 404 (Not Found) and throws an
error message "Order not found". */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


/* `const getMyOrders` is a function that uses the `asyncHandler` middleware to handle any errors that
may occur during the asynchronous execution of the function. It finds all orders in the database
that belong to the currently authenticated user (identified by `req.user._id`) and sends a JSON
response with the order information. */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})


/* `const getOrders` is a function that uses the `asyncHandler` middleware to handle any errors that
may occur during the asynchronous execution of the function. It finds all orders in the database and
populates the `user` field with the `id` and `name` properties. Finally, it sends a JSON response
with the order information. This function is exported along with other functions to be used in other
parts of the application. */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
