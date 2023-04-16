import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

const url = "https://mernecommerce2.onrender.com";

/**
 * This function adds a product to the cart and saves the cart items to local storage.
 * @param id - The ID of the product being added to the cart.
 * @param qty - qty stands for quantity, which is the number of items the user wants to add to their
 * cart.
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${url}/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

/**
 * This function removes an item from the cart and updates the cart items in local storage.
 * @param id - The id parameter is the unique identifier of the item that needs to be removed from the
 * cart.
 */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

/**
 * This function saves the shipping address data to the Redux store and local storage.
 * @param data - The data parameter is an object that contains the shipping address information such as
 * the recipient's name, address, city, state, and zip code.
 */
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

/**
 * This is a JavaScript function that saves the payment method data to the Redux store and local
 * storage.
 * @param data - The data parameter is an object that contains the payment method information that the
 * user has selected. This information could include the payment method type (e.g. credit card,
 * PayPal), the payment method details (e.g. card number, expiration date), and any other relevant
 * information needed to process the payment.
 */
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
