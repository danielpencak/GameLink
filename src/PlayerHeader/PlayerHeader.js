import React from 'react';
import './PlayerHeader.css';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export default function PlayerHeader(props) {
  return (
      <div className="PlayerHeader">
        <img src={`https://robohash.org/${props.username}`} alt={`${props.username}'s Avatar`}/>
        <NavDropdown title={props.username} id="player-menu-dropdown">
          <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
        </NavDropdown>
      </div>
  );
}
