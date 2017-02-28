import React, { Component } from 'react';
import { Form, FormGroup, Checkbox, ControlLabel, FormControl, Button } from 'react-bootstrap'
import axios from 'axios';
import FieldGroup from '../Forms/FieldGroup';
import './CreateSession.css'
import SearchGames from './SearchGames'
import GameInfo from '../GameInfo/GameInfo';

class CreateSession extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      searchTerm: '',
      showSearch: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterGames = this.filterGames.bind(this);
    this.handleSelectGame = this.handleSelectGame.bind(this);
    this.handleClearGame = this.handleClearGame.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSelectGame(game) {
    this.setState({
      game,
      showSearch: false
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
      game: null,
      showSearch: true,
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
          { this.state.showSearch ?
            <SearchGames games={this.state.games} handleSelectGame={this.handleSelectGame} filterGames={this.filterGames} handleChange={this.handleChange} searchTerm={this.state.searchTerm}/>

            :

            <div>
              <GameInfo game={this.state.game} />
              <Button bsStyle="primary" onClick={this.handleClearGame}>Change Game</Button>
            </div>

          }
          <Form>
          <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
          />
          <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
          />
          <FieldGroup
            id="formControlsFile"
            type="file"
            label="File"
          />

          <Checkbox checked readOnly>
            Checkbox
          </Checkbox>

          <FormGroup>
            <Checkbox inline>
              1
            </Checkbox>
            {' '}
            <Checkbox inline>
              2
            </Checkbox>
            {' '}
            <Checkbox inline>
              3
            </Checkbox>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Multiple select</ControlLabel>
            <FormControl componentClass="select" multiple>
              <option value="select">select (multiple)</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Textarea</ControlLabel>
            <FormControl componentClass="textarea" placeholder="textarea" />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Static text</ControlLabel>
            <FormControl.Static>
              email@example.com
            </FormControl.Static>
          </FormGroup>

          <Button type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateSession;
