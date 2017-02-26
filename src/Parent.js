import React, { Component } from 'react';
import Header from './Header/Header';
import LoginModal from './LoginModal/LoginModal';
import SignupModal from './SignupModal/SignupModal';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Parent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginModalOpen: false,
      loginEmail: '',
      loginPassword: '',
      signupPassword: '',
      signupEmail: '',
      signupUsername: '',
      signupBio: '',
      signupBirthDate: '',
      signupConfirmPassword: '',
      signupModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSignupSubmit(event) {
    event.preventDefault();
    axios.post('/api/players', {
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      confirmPassword: this.state.signupConfirmPassword,
      username: this.state.signupUsername,
      bio: this.state.signupBio,
      birthDate: this.state.signupBirthDate
    })
      .then(res => {
        const { id, avatar, username } = res.data;
        this.setState({
          userId: id,
          avatar,
          username,
          signupModalOpen: false,
          signupEmail: '',
          signupPassword: '',
          signupConfirmPassword: ''
        })
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleLogout() {
    axios.delete('/api/token')
      .then(res => {
        this.setState({
          userId: '',
          avatar: '',
          username: ''
        })
        browserHistory.push('/');
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
        <Header userId={this.state.userId} toggleModal={this.toggleModal} username={this.state.username} handleLogout={this.handleLogout} />
        <div>
          {React.cloneElement(this.props.children)}
        </div>
        {
          this.state.loginModalOpen ? <LoginModal toggleModal={this.toggleModal} loginEmail={this.state.loginEmail} loginPassword={this.state.loginPassword} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
          :null
        }

        {
          this.state.signupModalOpen ? <SignupModal toggleModal={this.toggleModal} signupEmail={this.state.signupEmail} signupPassword={this.state.signupPassword} handleChange={this.handleChange} handleSignupSubmit={this.handleSignupSubmit} signupUsername={this.state.signupUsername} signupBio={this.state.signupBio} signupBirthDate={this.state.signupBirthDate} signupConfirmPassword={this.state.signupConfirmPassword} signupModalOpen={this.state.signupModalOpen} />
          :null
        }
      </div>
    );
  }
}

export default Parent;
