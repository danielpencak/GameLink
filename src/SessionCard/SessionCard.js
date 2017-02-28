import React from 'react';
import './SessionCard.css'
import moment from 'moment'
import { Glyphicon } from 'react-bootstrap';

export default function SessionCard(props) {
  const { session } = props;
  return(
    <div className="SessionCard">
      <img src={ session.imageUrl } alt={ session.gameName } onError={missingImage}/>
      <div>
        <h2>{ session.gameName }</h2>
        <p>{session.locationName } </p>
        <p>{ moment(Number(session.time)).format('MMMM Do YYYY, h:mm a') }</p>
      </div>
      <div>
        <h2>
          <Glyphicon glyph="user" />
          { `${session.playerCount} of ${session.maxPlayers}` }
        </h2>
      </div>
    </div>
  )
}

function missingImage(event) {
  event.target.src='/img/not_found.png'
}
