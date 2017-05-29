import Offline from 'offline-plugin/runtime'
import PropTypes from 'prop-types'
import React from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
// import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'
// import Async from 'react-code-splitting'

import { ConnectedRouter } from 'react-router-redux'

import { store } from './store'
import Home from './components/Home'
import Login from './components/Auth/Login'
import { Body } from './components/Styled'
import ForgotPassword from './components/Auth/Forgot-Password'

// const Home = () => <Async load={import('./components/Home')} />

if (process.env.NODE_ENV === 'production') Offline.install()
const history = createHistory()

export const Root = ({ user }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Body>
        <Redirect from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/Forgot-Password" component={ForgotPassword} />
        {!user || !!user.token ? <Route path="/" /> : <Redirect to="/login" />}
      </Body>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  user: PropTypes.shape({}).isRequired,
}

export default connect(state => ({ user: state.user }))(Root)
if (!module.hot) render(<Root />, document.querySelector('react'))
