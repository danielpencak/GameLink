import React, { Component } from 'react';
import './PlayerHeader.css';
import { Button, Col } from 'react-bootstrap'

class PlayerHeader extends Component {
  constructor(props) {
    super(props)

    this.state = { menuIsOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }
  render() {
    const { props, state, toggleMenu } = this;
    return (
      <div className="PlayerHeader">
        <div className="playerIcon" onClick={ toggleMenu }>
          <Col className="username" smHidden xsHidden>
            {props.username}
          </Col>
          <img
            src={`https://robohash.org/${props.username}`}
            alt={`${props.username}'s Avatar`}
          />
        </div>
        {
          state.menuIsOpen
          ? <Button
              onClick={props.handleLogout}
              className="logOut"
              bsStyle="primary"
            >
              Logout
            </Button>
          : null
        }
      </div>
    );
  }
}

export default PlayerHeader;
