import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

/**
 * This is a reducer function that handles actions related to a shopping cart, including adding and
 * removing items, saving shipping address and payment method, and clearing the cart.
 * @param [state] - The initial state of the cart, which includes an empty array for cartItems and an
 * empty object for shippingAddress.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of action and any additional data (payload) needed to update the
 * state.
 * @returns The cartReducer function is returning a new state object based on the action type received.
 * If the action type is CART_ADD_ITEM, it checks if the item already exists in the cartItems array and
 * either updates the quantity or adds a new item. If the action type is CART_REMOVE_ITEM, it removes
 * the item from the cartItems array. If the action type is CART_SAVE_SHIPPING_ADDRESS, it
 */
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
