import React, { Component } from 'react';
import axios from 'axios';
import GameInfo from '../GameInfo/GameInfo';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import './Session.css';
import moment from 'moment';
import SessionMap from '../CreateSession/SessionMap';
import PlayerCard from '../PlayerCard/PlayerCard';
import { browserHistory } from 'react-router';

 class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: {
      },
      players: [],
      game: {}
    };

    this.handleDeletePlayer = this.handleDeletePlayer.bind(this);
    this.handleJoinSession = this.handleJoinSession.bind(this);
    this.joinButton = this.joinButton.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/sessions/${this.props.params.sessionId}`)
      .then(({ data }) => {
        const game = {
          maxPlayers: data.gameMaxPlayers,
          minPlayers: data.gameMinPlayers,
          description: data.gameDescription,
          imageUrl: data.gameImageUrl,
          name: data.gameName
        }
        const players = data.players;
        delete data.players;
        this.setState({
          session: data,
          game,
          players
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  joinButton() {
    const playerIsInSession = this.state.players.reduce((acc, player) => {
      if (player.id === this.props.userId) {
        acc = true;
      }
      return acc;
    }, false)

    if (playerIsInSession) {
      return <Button bsStyle="danger" onClick={() => { this.handleDeletePlayer(this.props.userId)}}>Leave Session</Button>
    }
    if (this.state.players.length >= this.state.session.maxPlayers) {
      return <Button bsStyle="primary" disabled>Session Full</Button>
    }
    return <Button bsStyle="primary" onClick={this.handleJoinSession}>Join Session</Button>
  }

  handleJoinSession() {
    axios.post(`/api/players_sessions/${this.state.session.id}`)
      .then(({ data }) => {
        const player = [{
          username: this.props.username,
          id: this.props.userId
        }]
        const players = this.state.players.concat(player);
        var newSession = JSON.parse(JSON.stringify(this.state.session));        newSession.playerCount = players.length;
        newSession.imageUrl = this.state.game.imageUrl;
        newSession.sessionId = newSession.id;
        this.setState({ players });
        this.props.addSession(newSession);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDeletePlayer(id) {
    axios.delete(`/api/players_sessions/${this.state.session.id}/${id}`)
      .then(({ data }) => {
        const players = this.state.players.filter(player => player.id !== id);
        if (id === this.props.userId) {
          this.props.leaveSession(this.state.session.id);
        }
        if (!players.length) {
          return browserHistory.push('/dashboard');
        }
        this.setState({ players });
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <Grid className="Session">
        <Row>
          <Col sm={9}>
            <div className="sessionRow">
              <Glyphicon className="big" glyph="tower" />
              <GameInfo game={this.state.game}/>
            </div>
            <div className="sessionRow">
              <Glyphicon className="big" glyph="envelope" />
              <p className="text">{this.state.session.description}</p>
            </div>
            <div className="sessionRow">
              <Glyphicon className="big" glyph="time" />
              <p className="text">{moment(Number(this.state.session.time)).format('MMMM Do, hh:mma')}</p>
            </div>
            <div className="sessionRow">
              <Glyphicon className="big" glyph="map-marker" />
              <p className="text">{this.state.session.locationName}</p>
            </div>
              <SessionMap locationCoords={this.state.session.locationCoords} locationName={this.state.session.locationName}/>
              {
                this.state.session.ownerId === this.props.userId ?
                  <Button bsStyle="primary" className="updateButton" onClick={() => {browserHistory.push(`/session/${this.props.params.sessionId}/edit`)}}>Update Session</Button>
                  : null
              }
          </Col>
          <Col sm={3}>
            <div className="playerHeader">
              <h3>
                <Glyphicon glyph="user" />
                {`${this.state.players.length} / ${this.state.session.maxPlayers}`}
              </h3>
            </div>
            {
              this.state.players.map(player => {
                return <PlayerCard username={player.username} key={player.id} isOwner={this.props.userId === this.state.session.ownerId} handleDeletePlayer={this.handleDeletePlayer} playerId={player.id} />
              })
            }
            {this.joinButton()}
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default Session;
