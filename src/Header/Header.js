import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router';
import PlayerHeader from '../PlayerHeader/PlayerHeader';

export default function Header(props) {
  return (
    <Navbar className="Header" collapseOnSelect>
      <Link to={props.userId ? '/dashboard' : '/'}>GameLink</Link>
      <div className="account">
         {
          props.userId
          ? <PlayerHeader username={props.username} handleLogout={props.handleLogout} />
          : <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <Button name='loginModalOpen' onClick={props.toggleModal} bsStyle='primary'>Login</Button>
              </NavItem>
              <NavItem eventKey={2} href="#">
                <Button name='signupModalOpen' onClick={props.toggleModal} bsStyle='primary'>Signup</Button>
              </NavItem>
            </Nav>
        }
      </div>
    </Navbar>
  );
}
