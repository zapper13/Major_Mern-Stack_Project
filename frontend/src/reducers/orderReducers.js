import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from '../constants/orderConstants'

/**
 * This is a reducer function that handles the state changes for creating an order in a JavaScript
 * application.
 * @param [state] - The initial state of the reducer. If no state is provided, it defaults to an empty
 * object.
 * @param action - The `action` parameter in this reducer function represents the action object that is
 * dispatched by the application. It contains information about the action type and any payload data
 * that is associated with the action. The reducer function uses this information to update the state
 * of the application accordingly.
 * @returns The orderCreateReducer function returns an object that represents the state of the order
 * creation process. The initial state is an empty object. The function uses a switch statement to
 * handle different action types. If the action type is ORDER_CREATE_REQUEST, it returns an object with
 * a loading property set to true. If the action type is ORDER_CREATE_SUCCESS, it returns an object
 * with loading set to false, success set
 */
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for fetching and displaying order details.
 * @param [state] - The initial state of the order details, which includes a loading property set to
 * true, an empty array for order items, and an empty object for shipping address.
 * @param action - The `action` parameter in this code refers to an object that contains information
 * about the action being dispatched. It typically has a `type` property that describes the type of
 * action being performed, and may also have additional data or payload that is relevant to the action.
 * The reducer uses this information to determine
 * @returns The `orderDetailsReducer` function is returning an object with three properties: `loading`,
 * `orderItems`, and `shippingAddress`. The initial value of `loading` is set to `true`. The function
 * uses a switch statement to determine which action to perform based on the `action.type` value. If
 * the action type is `ORDER_DETAILS_REQUEST`, the function returns a new object with the `
 */
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for payment related actions in an order.
 * @param [state] - The initial state of the reducer, which is an empty object by default.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of action and any additional data needed to update the state. The
 * reducer uses this information to determine how to update the state based on the action type.
 * @returns The `orderPayReducer` function returns an object that represents the new state of the
 * application based on the action that was dispatched. The object has different properties depending
 * on the action type:
 */
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for delivering an order, including
 * loading, success, and error states.
 * @param [state] - The current state of the order deliver reducer. If no state is provided, it
 * defaults to an empty object.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of action and any additional data (payload) that may be needed to
 * update the state. The reducer function uses this information to determine how to update the state
 * based on the action type.
 * @returns The orderDeliverReducer function returns an object with different properties based on the
 * action type received. If the action type is ORDER_DELIVER_REQUEST, it returns an object with a
 * loading property set to true. If the action type is ORDER_DELIVER_SUCCESS, it returns an object with
 * a loading property set to false and a success property set to true. If the action type is
 * ORDER_DELIVER_FAIL,
 */
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state of a user's order list in a web application.
 * @param [state] - The current state of the order list, which is an object containing an array of
 * orders by default.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of the action and any payload data associated with it. The reducer
 * uses this information to determine how to update the state.
 * @returns The `orderListMyReducer` function returns an object with a `loading` property set to `true`
 * when the `ORDER_LIST_MY_REQUEST` action type is dispatched. It returns an object with a `loading`
 * property set to `false` and an `orders` property set to the `action.payload` when the
 * `ORDER_LIST_MY_SUCCESS` action type is dispatched. It returns an object
 */
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles actions related to fetching a list of orders, and updates
 * the state accordingly.
 * @param [state] - The initial state of the orderListReducer, which is an object with a property
 * "orders" set to an empty array.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of the action and any additional data needed to update the state. The
 * reducer uses this information to determine how to update the state.
 * @returns The `orderListReducer` function returns an object with a `loading` property set to `true`
 * when the `ORDER_LIST_REQUEST` action is dispatched, an object with a `loading` property set to
 * `false` and an `orders` property set to the `action.payload` when the `ORDER_LIST_SUCCESS` action is
 * dispatched, an object with a `loading` property set to `
 */
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
