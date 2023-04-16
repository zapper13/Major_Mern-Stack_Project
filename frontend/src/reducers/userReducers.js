import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'

/**
 * This is a reducer function that handles user login actions and updates the state accordingly.
 * @param [state] - The initial state of the reducer, which is an empty object in this case.
 * @param action - The `action` parameter in this code refers to an object that describes the action
 * being performed. It typically has a `type` property that indicates the type of action being
 * performed, and may also have additional data in a `payload` property. The `switch` statement in this
 * code checks the `
 * @returns The userLoginReducer function returns an object with different properties based on the
 * action type received. If the action type is USER_LOGIN_REQUEST, it returns an object with a loading
 * property set to true. If the action type is USER_LOGIN_SUCCESS, it returns an object with a loading
 * property set to false and a userInfo property set to the action payload. If the action type is
 * USER_LOGIN_FAIL, it returns
 */
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for user registration, including loading,
 * success, failure, and logout actions.
 * @param [state] - The initial state of the reducer, which is an empty object in this case.
 * @param action - The `action` parameter in this code refers to an object that contains information
 * about the action being dispatched. It typically has a `type` property that describes the type of
 * action being performed, and may also have additional data in a `payload` property. The `switch`
 * statement in this reducer function
 * @returns The userRegisterReducer function returns an object with different properties based on the
 * action type received. If the action type is USER_REGISTER_REQUEST, it returns an object with the
 * loading property set to true. If the action type is USER_REGISTER_SUCCESS, it returns an object with
 * the loading property set to false and the userInfo property set to the action payload. If the action
 * type is USER_REGISTER_FAIL, it returns
 */
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that manages the state of user details, including loading, success,
 * failure, and resetting the user object.
 * @param [state] - The current state of the userDetailsReducer. If no state is provided, the default
 * state is an object with an empty user property.
 * @param action - The `action` parameter in this code refers to an object that contains information
 * about an action that has been dispatched. It has a `type` property that specifies the type of action
 * being performed, and may also have a `payload` property that contains additional data related to the
 * action. The reducer function
 * @returns The userDetailsReducer function returns an object with properties based on the action type.
 * If the action type is USER_DETAILS_REQUEST, it returns an object with the loading property set to
 * true. If the action type is USER_DETAILS_SUCCESS, it returns an object with the loading property set
 * to false and the user property set to the action payload. If the action type is USER_DETAILS_FAIL,
 * it returns an object with
 */
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles state updates for user profile updates, including loading,
 * success, error, and resetting the state.
 * @param [state] - The initial state of the reducer, which is an empty object by default.
 * @param action - The action parameter is an object that contains information about the action being
 * dispatched, including the type of action and any payload data associated with it. The reducer
 * function uses this information to determine how to update the state of the application.
 * @returns The userUpdateProfileReducer function returns an object with different properties based on
 * the action type received. If the action type is USER_UPDATE_PROFILE_REQUEST, it returns an object
 * with the loading property set to true. If the action type is USER_UPDATE_PROFILE_SUCCESS, it returns
 * an object with the loading property set to false, the success property set to true, and the userInfo
 * property set to the payload received in
 */
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

/**
 * This is a reducer function that manages the state of a user list, handling actions such as
 * requesting, succeeding, failing, and resetting the list.
 * @param [state] - The current state of the userListReducer. It is initialized with an object that has
 * a property "users" which is an empty array.
 * @param action - The `action` parameter in this code refers to an object that describes the action
 * being performed. It contains a `type` property that specifies the type of action being performed,
 * and may also contain additional data in a `payload` property. The `switch` statement in the code
 * checks the `type
 * @returns The `userListReducer` function returns an object with a `users` property that is
 * initialized to an empty array. Depending on the action type received, it may also include a
 * `loading` property set to `true` or `false`, an `error` property with an error message, or reset the
 * `users` property to an empty array.
 */
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles the state changes for deleting a user, including loading,
 * success, and error states.
 * @param [state] - The initial state of the reducer, which is an empty object in this case.
 * @param action - The `action` parameter in this code refers to an object that contains information
 * about the action being dispatched. It typically has a `type` property that describes the type of
 * action being performed, and may also have additional data or payload that is relevant to the action.
 * The `switch` statement in this
 * @returns The userDeleteReducer function returns an object with different properties based on the
 * action type received. If the action type is USER_DELETE_REQUEST, it returns an object with a loading
 * property set to true. If the action type is USER_DELETE_SUCCESS, it returns an object with a loading
 * property set to false and a success property set to true. If the action type is USER_DELETE_FAIL, it
 * returns an object
 */
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * This is a reducer function that handles state updates for user profile updates, including loading,
 * success, and error states.
 * @param [state] - The initial state of the reducer, which is an object with a property "user" set to
 * an empty object.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It has a `type` property that indicates the type of action being performed, and may also
 * have a `payload` property that contains additional data related to the action. The reducer function
 * uses this information to update the
 * @returns The userUpdateReducer function returns an object with different properties based on the
 * action type received. If the action type is USER_UPDATE_REQUEST, it returns an object with the
 * loading property set to true. If the action type is USER_UPDATE_SUCCESS, it returns an object with
 * the loading property set to false and the success property set to true. If the action type is
 * USER_UPDATE_FAIL, it returns an object
 */
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}
