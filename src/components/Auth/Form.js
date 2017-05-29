import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { TextField } from '../Styled'

const Form = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <TextField
      type="email"
      name="email"
      placeholder="Email address"
      title="Enter your email address"
      required
    />
    <TextField
      type="password"
      name="password"
      placeholder="Password"
      required
    />
    <Button type="submit">Log in</Button>
  </form>
)

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Form
