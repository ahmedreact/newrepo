import React from 'react'
import { Header, Container } from 'semantic-ui-react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { FooterLink } from '../Styled'

const ForgotPassword = () => (
  <Container>
    <div><Header as="h2">This Page is Under Construction</Header></div>
    <FooterLink to="/login">{'Ready to log in ?'}</FooterLink>
  </Container>
)

export default ForgotPassword
