import React from 'react';
import './PlayerCard.css';
import { Glyphicon } from 'react-bootstrap';

export default function PlayerCard(props) {
  return (
      <div className="PlayerCard">
        <img src={`https://robohash.org/${props.username}`} alt={`${props.username}'s Avatar`}/>
        <p>{props.username}</p>
        {
          props.isOwner ?
          <Glyphicon glyph="remove" onClick={() => props.handleDeletePlayer(props.playerId)} />
          :null
        }
      </div>
  );
}
