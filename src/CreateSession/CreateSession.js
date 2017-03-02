import React, { Component } from 'react';
import { Form, FormGroup, Checkbox, Button, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap'
import axios from 'axios';
import './CreateSession.css'
import SearchGames from './SearchGames'
import GameInfo from '../GameInfo/GameInfo';
import InputMoment from 'input-moment';
import moment from 'moment';
import './InputMoment.css';
import SessionMap from './SessionMap'
import { browserHistory } from 'react-router';
import Geosuggest from 'react-geosuggest';

class CreateSession extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      searchTerm: '',
      gameSelected: this.props.isUpdated || false,
      hasBoard: true,
      game: {},
      sessionMinPlayers: 1,
      sessionMaxPlayers: 99,
      moment: moment(),
      locationName: '',
      locationCoords: {},
      description: '',
      placesBoxOpen: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterGames = this.filterGames.bind(this);
    this.handleSelectGame = this.handleSelectGame.bind(this);
    this.handleClearGame = this.handleClearGame.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSelectPlace = this.toggleSelectPlace.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  // Required by InputMoment
  onChange(time) {
    console.log(time.unix());
    this.setState({ moment: time });
  }

  handleCheckboxChange() {
    this.setState({ hasBoard: !this.state.hasBoard});
  }

  handleSelectGame(game) {
    this.setState({
      game,
      gameSelected: true,
      sessionMinPlayers: game.minPlayers,
      sessionMaxPlayers: game.maxPlayers
    });
  }

  filterGames(game) {
    if (this.state.searchTerm.length < 2) {
      return false;
    }
    const exp = new RegExp(this.state.searchTerm, 'i');
    return game.name.match(exp);
  }

  handleClearGame() {
    this.setState({
      game: {},
      gameSelected: false,
      searchTerm: ''
    })
  }

  componentDidMount() {
    axios.get('/api/games')
      .then(({ data }) => {
        this.setState({ games: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  setLocation(place) {
    const placeName = place.label.slice(0, place.label.indexOf(','))
    this.setState({
      locationName: `${placeName}, ${place.gmaps.formatted_address}`,
      locationCoords: place.location,
      placesBoxOpen: false
    })
  }

  toggleSelectPlace() {
    this.setState({ placesBoxOpen: !this.state.placesBoxOpen })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { game, sessionMinPlayers, sessionMaxPlayers, locationName, locationCoords, hasBoard, moment, description } = this.state;
    const session = {
      gameId: game.id,
      minPlayers: sessionMinPlayers,
      maxPlayers: sessionMaxPlayers,
      locationName,
      locationLat: locationCoords.lat,
      locationLng: locationCoords.lng,
      time: moment.unix() * 1000,
      description,
      hasBoard
    }
    axios.post('/api/sessions', session)
      .then(({ data }) => {
        data.imageUrl = this.state.game.imageUrl;
        data.gameName = this.state.game.name;
        this.props.addSession(data);
        browserHistory.push(`/session/${data.id}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="CreateSession">
        {
          this.props.isUpdated ?
          <h1>Update Session</h1>
          :
          <h1>Create Session</h1>
        }
        <div className="formWrapper">
          <div className="formCategory">
            <Glyphicon className="big" glyph="tower" />
            { !this.state.gameSelected
              ? <SearchGames games={this.state.games} handleSelectGame={this.handleSelectGame} filterGames={this.filterGames} handleChange={this.handleChange} searchTerm={this.state.searchTerm}/>

              : <GameInfo game={this.props.game || this.state.game} />
            }
            {
              this.props.isUpdated || !this.state.gameSelected ? null :
              <a onClick={this.handleClearGame}>Change</a>
            }
          </div>
          {
            this.state.gameSelected ?
            <Form onSubmit={this.props.handleSubmit || this.handleSubmit}>

            <div className="formCategory">
              <Glyphicon className="big" glyph="map-marker" />
              <div className="categoryWrapper">
                <h3>Place</h3>
                <FormGroup>
                  {
                    (this.props.isUpdated
                      ? this.props.placesBoxOpen
                      : this.state.placesBoxOpen
                    )
                    ? this.props.isUpdated
                        ? <Geosuggest onSuggestSelect={(place) => {this.props.setLocation(place)}}/>
                        : <Geosuggest onSuggestSelect={(place) => {this.setLocation(place)}}/>
                      : null
                  }
                  {
                    (this.props.isUpdated
                      ? !this.props.placesBoxOpen
                      : !this.state.placesBoxOpen
                    )
                    ? <div className="locationName">
                        <div>
                          { this.props.locationName || this.state.locationName }
                        </div>
                        <a onClick={ this.props.toggleSelectPlace || this.toggleSelectPlace }>
                          Change
                        </a>
                      </div>
                    : null
                  }
                  <SessionMap locationName={this.props.locationName || this.state.locationName} locationCoords={this.props.locationCoords || this.state.locationCoords} />
                </FormGroup>
              </div>
            </div>

            <div className="formCategory">
              <Glyphicon className="big" glyph="time" />
              <div className="categoryWrapper">
                <h3>Time</h3>
                <FormGroup>
                  <InputMoment moment={this.props.time || this.state.moment} onChange={this.props.onChange || this.onChange} />
                </FormGroup>
              </div>
            </div>

            <div className="formCategory">
              <Glyphicon className="big" glyph="user" />
              <div className="categoryWrapper">
                <h3>Players</h3>
                <FormGroup>
                  <div className="slider">
                    <span>
                      Min: {this.props.sessionMinPlayers || this.state.sessionMinPlayers}
                    </span>
                    <input type="range" value={this.props.sessionMinPlayers || this.state.sessionMinPlayers} onChange={this.props.handleChange || this.handleChange} name="sessionMinPlayers" min={this.props.minPlayers || this.state.game.minPlayers} max={this.props.sessionMaxPlayers || this.state.sessionMaxPlayers}/>
                  </div>
                  <div className="slider">
                    <span>
                      Max: {this.props.sessionMaxPlayers || this.state.sessionMaxPlayers}
                    </span>
                    <input type="range" value={this.props.sessionMaxPlayers || this.state.sessionMaxPlayers} onChange={this.props.handleChange || this.handleChange} name="sessionMaxPlayers" min={this.props.sessionMinPlayers || this.state.sessionMinPlayers} max={this.props.maxPlayers || this.state.game.maxPlayers}/>
                  </div>
                </FormGroup>
              </div>
            </div>

            <div className="formCategory">
              <Glyphicon className="big" glyph="ok" />
              <div className="categoryWrapper">
                <h3>Miscellaneous</h3>
                <FormGroup>
                  <Checkbox
                    checked={
                      this.props.isUpdated
                      ? this.props.hasBoard
                      : this.state.hasBoard
                    }
                    onChange={this.props.handleCheckboxChange || this.handleCheckboxChange}
                  >
                    I have the game materials
                  </Checkbox>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="e.g. &#34;Let&#39;s game and have some beers!&#34;"
                    value={this.props.description || this.state.description}
                    onChange={this.props.handleChange || this.handleChange}
                    name="description"
                  />
                </FormGroup>
              </div>
            </div>

            <Button className="submitForm" type="submit" bsStyle="primary">
              Submit
            </Button>
          </Form>
          :null
        }
        </div>
      </div>
    )
  }
}

export default CreateSession;
