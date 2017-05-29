import { actionTypes as types } from '../constants'

const getLogout = (state = {}, action) => {
  switch (action.type) {
    case types.GET_LOGOUT_SUCCESS:
      return action.data
    case types.GET_LOGOUT_FAILURE:
      return action.data
    default:
      return state
  }
}

export default getLogout
