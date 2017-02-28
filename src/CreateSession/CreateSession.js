import React, { Component } from 'react';
import { Form, FormGroup, Checkbox, ControlLabel, FormControl, Button } from 'react-bootstrap'
import axios from 'axios';
import FieldGroup from '../Forms/FieldGroup';
import './CreateSession.css'

class CreateSession extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterGames = this.filterGames.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  filterGames(game) {
    if (this.state.searchTerm.length < 3) {
      return false;
    }
    const exp = new RegExp(this.state.searchTerm, 'i');
    return game.name.match(exp);
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
        <Form>
          <FieldGroup
            type="text"
            label="Game"
            name="searchTerm"
            placeholder="Start typing a name"
            value={ this.state.searchTerm }
            onChange={ this.handleChange }
            className="search"
          />
          <div className="searchResults">
            {
              this.state.games.filter(this.filterGames).map( game =>
                <div className="gameResult" key={game.id}>
                  <div>
                    <img src={game.imageUrl} alt={game.name} onError={missingImage}/>
                  </div>
                  <div>
                    {game.name}
                  </div>
                </div>
              )
            }
          </div>
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

function missingImage(event) {
  event.target.src='/img/not_found.png'
}

export default CreateSession;
