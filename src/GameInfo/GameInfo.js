import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './GameInfo.css';

export default function GameInfo(props) {
  return (
    <div className="GameInfo">
      <img src={props.game.imageUrl} alt={props.game.name} onError={missingImage} />
      <div>
        <h2>{props.game.name}</h2>
        <h3>
          <Glyphicon glyph="user" />
          { `${props.game.minPlayers} to ${props.game.maxPlayers}` }
        </h3>
        <p>
          {
            props.game.description ? props.game.description
            : "No description available"
          }
        </p>
      </div>
    </div>
  );
}

function missingImage(event) {
  event.target.src='/img/not_found.png'
}
