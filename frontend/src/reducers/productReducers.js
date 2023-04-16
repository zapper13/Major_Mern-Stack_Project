import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

/**
 * This is a reducer function that handles actions related to fetching a list of products, and updates
 * the state accordingly.
 * @param [state] - The current state of the productListReducer. If no state is provided, the default
 * state is an object with an empty array for the products key.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It has a `type` property that indicates the type of action being performed, and may also
 * have a `payload` property that contains additional data related to the action. The `action`
 * parameter is passed to the
 * @returns The productListReducer function is returning an object with properties based on the action
 * type. If the action type is PRODUCT_LIST_REQUEST, it returns an object with a loading property set
 * to true and an empty products array. If the action type is PRODUCT_LIST_SUCCESS, it returns an
 * object with a loading property set to false, a products property set to the action payload's
 * products array, a pages property set to
 */
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles actions related to fetching and updating product details in
 * a Redux store.
 * @param [state] - The current state of the product details, which includes the product object and its
 * reviews array.
 * @param action - The `action` parameter in this reducer function represents the action object that is
 * dispatched to update the state. It contains a `type` property that specifies the type of action
 * being performed and an optional `payload` property that contains any data associated with the
 * action. The reducer function uses the `type`
 * @returns The `productDetailsReducer` function returns an object with properties `loading`,
 * `product`, and `error`. The initial state of the `state` parameter is an object with a `product`
 * property that has an empty array for the `reviews` property. The function uses a switch statement to
 * determine which action type was dispatched and returns a new state object based on the action type.
 * If the action
 */
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for deleting a product, including loading,
 * success, and error states.
 * @param [state] - The initial state of the reducer, which is an empty object in this case.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It has a `type` property that specifies the type of action being performed, and may also
 * have a `payload` property that contains additional data related to the action. The reducer function
 * uses this information to update the
 * @returns The `productDeleteReducer` function returns an object with different properties based on
 * the action type received. If the action type is `PRODUCT_DELETE_REQUEST`, it returns an object with
 * `loading` set to `true`. If the action type is `PRODUCT_DELETE_SUCCESS`, it returns an object with
 * `loading` set to `false` and `success` set to `true`. If the action type is
 */
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for creating a product, including loading,
 * success, failure, and resetting the state.
 * @param [state] - The initial state of the reducer, which is an empty object in this case.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It has a `type` property that indicates the type of action being performed, and may also
 * have a `payload` property that contains additional data related to the action. The reducer function
 * uses this information to update the
 * @returns The `productCreateReducer` function returns an object that represents the state of the
 * product creation process. The initial state is an empty object `{}`. The function uses a switch
 * statement to handle different action types. If the action type is `PRODUCT_CREATE_REQUEST`, it
 * returns an object with `loading` set to `true`. If the action type is `PRODUCT_CREATE_SUCCESS`, it
 * returns an object with
 */
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles state updates for product updates in a Redux store.
 * @param [state] - The initial state of the reducer, which is an object with a property called
 * "product" set to an empty object.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of the action and any payload data associated with it. The reducer
 * uses this information to determine how to update the state.
 * @returns The `productUpdateReducer` function returns an object with different properties based on
 * the action type received. If the action type is `PRODUCT_UPDATE_REQUEST`, it returns an object with
 * `loading` set to `true`. If the action type is `PRODUCT_UPDATE_SUCCESS`, it returns an object with
 * `loading` set to `false`, `success` set to `true`, and `product` set to
 */
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for creating a product review, including
 * loading, success, and error states.
 * @param [state] - The initial state of the reducer, which is an empty object by default.
 * @param action - The `action` parameter in this reducer function represents the action object that is
 * dispatched by the Redux store. It contains information about the action type and any payload data
 * that is associated with the action. The reducer function uses this information to update the state
 * of the application.
 * @returns The `productReviewCreateReducer` function returns an object that represents the state of
 * the product review creation process. The initial state is an empty object `{}`. The function uses a
 * switch statement to handle different action types. If the action type is
 * `PRODUCT_CREATE_REVIEW_REQUEST`, it returns an object with `loading` set to `true`. If the action
 * type is `PRODUCT_CREATE_REVIEW_SUCCESS
 */
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for the top rated products in an
 * e-commerce website.
 * @param [state] - The current state of the productTopRatedReducer. If no state is provided, the
 * default value is an object with an empty array for the products key.
 * @param action - The `action` parameter in this code refers to an object that describes the action
 * being performed. It contains a `type` property that specifies the type of action being performed,
 * and may also contain additional data that is needed to perform the action. The reducer function uses
 * the `action` parameter to determine
 * @returns The `productTopRatedReducer` function returns an object with `loading`, `products`, and
 * `error` properties based on the action type received. If the action type is `PRODUCT_TOP_REQUEST`,
 * it returns an object with `loading` set to `true` and `products` set to an empty array. If the
 * action type is `PRODUCT_TOP_SUCCESS`, it returns an object with `loading
 */
export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
