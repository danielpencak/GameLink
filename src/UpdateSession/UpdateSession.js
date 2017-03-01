import React, { Component } from 'react';
import CreateSession from '../CreateSession/CreateSession';
import axios from 'axios';
import moment from 'moment';
import { browserHistory } from 'react-router';

class UpdateSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasBoard: true,
      time: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/sessions/${this.props.params.sessionId}`)
      .then(({ data }) => {
        console.log(data);
        const game = {
          maxPlayers: data.gameMaxPlayers,
          minPlayers: data.gameMinPlayers,
          description: data.gameDescription,
          imageUrl: data.gameImageUrl,
          name: data.gameName,
          id: data.gameId
        }
        this.setState({
          playerCount: data.players.length,
          hasBoard: data.hasBoard,
          sessionMaxPlayers: data.maxPlayers,
          sessionMinPlayers: data.minPlayers,
          description: data.description,
          time: moment(Number(data.time)),
          locationName: data.locationName,
          locationCoords: data.locationCoords,
          minPlayers: data.gameMinPlayers,
          maxPlayers: data.gameMaxPlayers,
          game
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleCheckboxChange() {
    this.setState({ hasBoard: !this.state.hasBoard});
  }

  // Required by InputMoment
  onChange(time) {
    this.setState({ time });
  }

  setLocation(place) {
    this.setState({
      locationName: place.label,
      locationCoords: place.location
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { game, sessionMinPlayers, sessionMaxPlayers, locationName, locationCoords, hasBoard, time, description } = this.state;
    const session = {
      gameId: game.id,
      minPlayers: sessionMinPlayers,
      maxPlayers: sessionMaxPlayers,
      locationName,
      locationLat: locationCoords.lat,
      locationLng: locationCoords.lng,
      time: time.unix() * 1000,
      description,
      hasBoard
    }
    axios.patch(`/api/sessions/${this.props.params.sessionId}`, session)
      .then(({ data }) => {
        data.playerCount = this.state.playerCount;
        data.sessionId = data.id;
        data.imageUrl = this.state.game.imageUrl;
        data.gameName = this.state.game.name;
        this.props.updateSession(data);
        browserHistory.push(`/session/${data.id}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <CreateSession addSession={this.props.addSession} game={this.state.game}  isUpdated={true} hasBoard={this.state.hasBoard} description={this.state.description} sessionMinPlayers={this.state.sessionMinPlayers} sessionMaxPlayers={this.state.sessionMaxPlayers} handleChange={this.handleChange} handleCheckboxChange={this.handleCheckboxChange} minPlayers={this.state.minPlayers} maxPlayers={this.state.maxPlayers} onChange={this.onChange} time={this.state.time} locationName={this.state.locationName} locationCoords={this.state.locationCoords} setLocation={this.setLocation} handleSubmit={this.handleSubmit} />
    );
  }
}

export default UpdateSession;
