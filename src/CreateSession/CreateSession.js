import React, { Component } from 'react';
import { Form, FormGroup, Checkbox, Button } from 'react-bootstrap'
import axios from 'axios';
import FieldGroup from '../Forms/FieldGroup';
import './CreateSession.css'
import SearchGames from './SearchGames'
import GameInfo from '../GameInfo/GameInfo';
import InputMoment from 'input-moment';
import moment from 'moment';
import './InputMoment.css';

class CreateSession extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      searchTerm: '',
      gameSelected: false,
      hasBoard: true,
      game: {},
      sessionMinPlayers: 1,
      sessionMaxPlayers: 99,
      moment: moment(Date.now())
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterGames = this.filterGames.bind(this);
    this.handleSelectGame = this.handleSelectGame.bind(this);
    this.handleClearGame = this.handleClearGame.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  // Required by InputMoment
  onChange(moment) {
    this.setState({ moment });
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
    if (this.state.searchTerm.length < 3) {
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

  render() {
    return (
      <div className="CreateSession">
        <h2>Create Session</h2>
        <h3>Game</h3>
          { !this.state.gameSelected ?
            <SearchGames games={this.state.games} handleSelectGame={this.handleSelectGame} filterGames={this.filterGames} handleChange={this.handleChange} searchTerm={this.state.searchTerm}/>

            :

            <div>
              <GameInfo game={this.state.game} />
              <Button bsStyle="primary" onClick={this.handleClearGame}>Change Game</Button>
            </div>

          }
          {
            this.state.gameSelected ?
            <Form>
              <h3>Miscellaneous</h3>
              <FormGroup>
                <Checkbox checked={this.state.hasBoard} onChange={this.handleCheckboxChange}>
                  I have the game materials
                </Checkbox>
              </FormGroup>
              <h3>Players</h3>
              <FormGroup>
                <div className="slider">
                  <span>
                    Minimum Players: {this.state.sessionMinPlayers}
                  </span>
                  <input type="range" value={this.state.sessionMinPlayers} onChange={this.handleChange} name="sessionMinPlayers" min={this.state.game.minPlayers} max={this.state.sessionMaxPlayers}/>
                </div>
                <div className="slider">
                  <span>
                    Maximum Players: {this.state.sessionMaxPlayers}
                  </span>
                  <input type="range" value={this.state.sessionMaxPlayers} onChange={this.handleChange} name="sessionMaxPlayers" min={this.state.sessionMinPlayers} max={this.state.game.maxPlayers}/>
                </div>
              </FormGroup>
              <h3>Time</h3>
              <FormGroup>
                <InputMoment moment={this.state.moment} onChange={this.onChange} />
              </FormGroup>
              <Button type="submit" bsStyle="primary">
                Submit
              </Button>
            </Form>
            :null
          }
      </div>
    )
  }
}

export default CreateSession;
