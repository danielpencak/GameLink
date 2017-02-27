import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import SessionCard from '../SessionCard/SessionCard';

import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions: []
    }
  }

  componentDidMount() {
    axios.get('/api/sessions?lat=47.9999&lng=-122.5555&radius=50')
      .then(({ data }) => {
        console.log(data);
        this.setState({ sessions: data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (
      <Grid className="Dashboard">
        <Row className="show-grid">
          <Col className="list" sm={6}>
            <h2>My Sessions</h2>
            <h2>Nearby Sessions</h2>
            <div className="nearbyList">
              {
                this.state.sessions.map(session =>
                  <SessionCard key={ session.sessionId } session={ session } />
                )
              }
            </div>
          </Col>
          <Col className="map" sm={6}>col2</Col>
        </Row>
      </Grid>
    );
  }
}

export default Dashboard;
