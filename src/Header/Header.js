import React from 'react';
import './Header.css';
import { Link } from 'react-router';
import PlayerHeader from '../PlayerHeader/PlayerHeader';

export default function Header(props) {
  return (
    <nav className="Header">
      <Link to={props.userId ? '/dashboard' : '/'}>GameLink</Link>
         {
          props.userId
          ? <div className="account">
              <PlayerHeader username={props.username} handleLogout={props.handleLogout} />
            </div>
          : <div className="loginButtons">
              <button
                name='loginModalOpen'
                onClick={props.toggleModal}
              >
                Login
              </button>
              <button
                name='signupModalOpen'
                onClick={props.toggleModal}
              >
                Signup
              </button>
            </div>
        }
    </nav>
  );
}
