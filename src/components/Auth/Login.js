import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

import { login } from '../../actions'

import { FormTitle, FooterLink } from '../Styled'
import Form from './Form'

const Login = ({ user, login }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const { email: { value: email }, password: { value: password } } = e.target
    login({ email, password })
  }

  return (
    <div>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleSubmit} />
      <FooterLink to="/Forgot-Password">
        {'Did you forget your password ?'}
      </FooterLink>
      {user.token && <Redirect to="/home" />}
      {user.failure
        ? <Message negative>Incorrect Username or Password </Message>
        : <p />}
    </div>
  )
}

Login.propTypes = {
  user: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { login })(Login)
