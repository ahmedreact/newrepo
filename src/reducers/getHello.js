import { actionTypes as types } from '../constants'

const getHello = (state = {}, action) => {
  switch (action.type) {
    case types.GET_HELLO_SUCCESS:
      return action.data
    case types.GET_HELLO_FAILURE:
      return action.data
    default:
      return state
  }
}

export default getHello
