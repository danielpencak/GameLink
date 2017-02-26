import React, { Component } from 'react';
import Header from './Header/Header';
import LoginModal from './LoginModal/LoginModal';
import axios from 'axios';

class Parent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginModalOpen: false,
      loginEmail: '',
      loginPassword: ''
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  toggleModal({ target }) {
    this.setState({ [target.name]: !this.state[target.name]});
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value});
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    axios.post('/api/token', { email: this.state.loginEmail, password: this.state.loginPassword })
      .then(res => {
        const { id, avatar, username } = res.data;
        this.setState({
          userId: id,
          avatar,
          username,
          loginModalOpen: false,
          loginEmail: '',
          loginPassword: ''
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    axios.get('/api/players')
      .then(res => {
        const { id, avatar, username } = res.data;
        this.setState({
          userId: id,
          avatar,
          username
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        <Header userId={this.state.userId} toggleModal={this.toggleModal} />
        <div>
          {React.cloneElement(this.props.children)}
        </div>
        {
          this.state.loginModalOpen ? <LoginModal toggleModal={this.toggleModal} loginEmail={this.state.loginEmail} loginPassword={this.state.loginPassword} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
          :null
        }
      </div>
    );
  }
}

export default Parent;
