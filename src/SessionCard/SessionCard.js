import React from 'react';
import './SessionCard.css'

export default function SessionCard(props) {
  const { session } = props;
  return(
    <div className="SessionCard">
      <img src={ session.imageUrl } alt={ session.gameName }/>
      <div>
        <h2>{ session.gameName }</h2>
        <div>{ session.locationName }</div>
      </div>
      <div>
        <h2>{ `${session.playerCount} of ${session.maxPlayers}` }</h2>
      </div>
    </div>
  )
}
