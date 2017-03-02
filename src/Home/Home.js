import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heroString: 'Find people gaming near you!'
    }

    this.getNearbyGames = this.getNearbyGames.bind(this)
    this.locationUnavailable = this.locationUnavailable.bind(this)
  }



  componentDidMount() {
    if ("geolocation" in navigator) {
      this.setState({
        heroString: 'Fetching games near you...'
      })
      navigator.geolocation.getCurrentPosition(this.getNearbyGames, this.locationUnavailable)
    }
    else {
      console.log('Geolocation unavailable');
    }
  }

  getNearbyGames(pos) {
    const coords = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }

    axios.get(`/api/sessions?lat=${coords.lat}&lng=${coords.lng}&radius=50`)
    .then(({ data }) => {
      this.setState({ heroString: `There are ${data.length || 'no'} games near you!` });
    })
    .catch(err => {
      console.log(err);
    })
  }

  locationUnavailable() {
    this.setState({ heroString: 'Find people gaming near you!'})
  }

  render() {
    return (
      <div className="Home">
        <div className="hero"
          style={{backgroundImage:'url(https://maps.googleapis.com/maps/api/staticmap?center=seattle&zoom=13&size=1200x300&scale=2&maptype=roadmap&key=AIzaSyCtST93n2hGc5ay2hN6DmtqnuB1zCKu1UA&style=feature:all|element:labels|visibility:off)'}}
          >
            <div className="banner">
              {this.state.heroString}
            </div>
          </div>
          <Grid>
            <Row>
              <Col sm={4}>
                <Glyphicon glyph="map-marker" />
                <div>We use maps to help you find people playing nearby</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="knight" />
                <div>Discover new games that are popular in your area</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="globe" />
                <div>Explore your city and its unique places</div>
              </Col>
            </Row>
          </Grid>
          <small>© 2017 Daniel Pencak & Emile Fleming</small>
        </div>
      );
  }
}

export default Home;
