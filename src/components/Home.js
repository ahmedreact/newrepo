import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Grid, Header, Button } from 'semantic-ui-react'
import Stats from './Stats'
import { Blue } from './Styled'
import { store } from '../store'
import { getHello, getLogout } from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }
  componentWillMount() {
    store.dispatch(getHello())
  }
  logout() {
    //TODO: debug logout action to get desired response (async calls)
    window.localStorage.removeItem('state')
    store.dispatch(getLogout())
    this.setState({ user: null })
    window.location = ''
  }

  render() {
    return (
      <div>
        {this.state.user.token
          ? <Container>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      {"You're logged in as "}
                      <Blue>{this.state.user.email}</Blue>
                    </Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header>
                      Affiliate Name: {this.state.user.affiliateName}
                    </Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Button onClick={this.logout.bind(this)}>Logout</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Stats />
            </Container>
          : <Redirect to="/login" />}
      </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.shape({}).isRequired,
  getHello: PropTypes.shape({}).isRequired,
  getLogout: PropTypes.shape({}).isRequired,
}
export default connect(state => ({
  user: state.user,
  getHello: state.getHello,
  getLogout: state.getLogout,
}))(Home)
