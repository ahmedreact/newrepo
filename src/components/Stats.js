import React from 'react'
import { connect } from 'react-redux'
import { Grid, Statistic } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Stats = ({ getHello }) => {
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Statistic>
            <Statistic.Label>Sales</Statistic.Label>
            <Statistic.Value>{getHello.sales}</Statistic.Value>
          </Statistic>
        </Grid.Column>
        <Grid.Column>
          <Statistic>
            <Statistic.Label>CR%</Statistic.Label>
            <Statistic.Value>{getHello.CR}</Statistic.Value>
          </Statistic>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Stats.propTypes = {
  getHello: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  getHello: state.getHello,
})
export default connect(mapStateToProps, { Stats })(Stats)
