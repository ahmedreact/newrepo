import { combineReducers } from 'redux'

import user from './user'
import getHello from './getHello'
import getLogout from './getHello'

const rootReducer = combineReducers({
  logger: (state = null, action) => {
    console.log('action', action)
    return state
  },
  user,
  getHello,
  getLogout,
})

export default rootReducer
