import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import SessionCard from '../SessionCard/SessionCard';
import Map from '../Map/Map';
import { Link } from 'react-router';

import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions: [],
      highlightedSession: -1
    }

    this.fetchNearbyGames = this.fetchNearbyGames.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount() {
    this.fetchNearbyGames();
  }

  fetchNearbyGames() {
    axios.get(`/api/sessions?lat=${this.props.coords.lat || 47.6062}&lng=${this.props.coords.lng || -122.3321}&radius=50`)
      .then(({ data }) => {
        console.log(data);
        this.setState({ sessions: data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  onMarkerClick(index) {
    this.setState({
      highlightedSession: index
    })
  }

  render () {
    return (
      <Grid className="Dashboard">
        <Row className="show-grid">
          <Col className="list" sm={6}>
            <h2>My Sessions</h2>
            <header>
              <h2>Nearby Sessions</h2>
              <Glyphicon glyph="refresh" onClick={this.fetchNearbyGames} />
            </header>
            { this.state.highlightedSession > -1 ?
              <Link to={`/session/${this.state.sessions[this.state.highlightedSession].sessionId}`}>
                <div className="highlighted">
                  <SessionCard session={this.state.sessions[this.state.highlightedSession]} />
                </div>
              </Link>
              :null
            }
            <div className="nearbyList">
              {
                this.state.sessions.map((session, index) => {
                  if (index === this.state.highlightedSession) {
                    return null;
                  }
                  return <Link to={`/session/${session.sessionId}`}>
                  <SessionCard key={ session.sessionId } session={ session } /> </Link>
                })
              }
            </div>
          </Col>
          <Col className="map" sm={6}>
            <Map coords={this.props.coords} sessions={this.state.sessions} onMarkerClick={this.onMarkerClick} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Dashboard;
