import React, { Component } from 'react';
import Header from './Header/Header';

class Parent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Parent;
