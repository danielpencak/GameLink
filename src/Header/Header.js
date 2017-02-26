import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import './Header.css';

export default function Header(props) {
  return (
    <Navbar className='Navbar' inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">GameHub</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
         {
          props.userId ? null
          :
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <Button name='loginModalOpen' onClick={props.toggleModal} bsStyle='primary'>Login</Button>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <Button name='signupModalOpen' onClick={props.toggleModal} bsStyle='primary'>Signup</Button>
            </NavItem>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
