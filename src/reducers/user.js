import { actionTypes as types } from '../constants'

const user = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.data
    case types.LOGIN_FAILURE:
      return action.data
    default:
      return state
  }
}

export default user
