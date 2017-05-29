import { actionTypes as types, urls } from '../constants'
import { post, get } from '../helpers'

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN,
    body: { email, password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token
  const affiliateName = getState().user.affiliateName

  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN_WITH_TOKEN,
    body: { token, affiliateName },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}

export const getHello = () => (dispatch, getState) => {
  console.log('get hello called!!')
  const affiliate = getState().user.affiliateName
  const token = getState().user.token
  if (typeof token === 'undefined') return
  dispatch({ type: types.GET_HELLO_REQUEST })
  get({
    url: urls.GET_HELLO + affiliate,
    success: types.GET_HELLO_SUCCESS,
    failure: types.GET_HELLO_FAILURE,
    dispatch,
  })
}

export const getLogout = () => (dispatch, getState) => {
  console.log('get logout called!!')
  const user = getState().user.token
  if (typeof user !== 'undefined') return
  dispatch({ type: types.GET_LOGOUT_REQUEST })
  get({
    url: urls.GET_LOGOUT,
    success: types.GET_LOGOUT_SUCCESS,
    failure: types.GET_LOGOUT_FAILURE,
    dispatch,
  })
}
