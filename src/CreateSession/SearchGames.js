import React from 'react';
import './SearchGames.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export default function SearchGames(props) {
  return (
    <div className="SearchGames">
      <FormGroup className="searchField">
        <FormControl type="text"
        name="searchTerm"
        placeholder="Start typing a game name"
        value={ props.searchTerm }
        onChange={ props.handleChange }
        className="search" />
      </FormGroup>
      <div className="searchResults">
        {
          props.games.filter(props.filterGames).map( game =>
            <div onClick={() => {props.handleSelectGame(game)}} className="gameResult" key={game.id}>
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
      {
        props.searchTerm.length > 1 ?
        <Button bsStyle="primary">Add New</Button>
        :null
      }
    </div>
  );
}

function missingImage(event) {
  event.target.src='/img/not_found.png'
}
