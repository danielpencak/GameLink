import React, { Component } from 'react';
import { Modal, Row, Col, ControlLabel } from 'react-bootstrap';
import '../LoginModal/ModalStyles.css';
import Validation from 'react-validation';
import '../Validations';

class SignupModal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const validations = this.form.validateAll();
    const errors = Object.keys(validations);
    if (!errors.length) {
      return this.props.handleSignupSubmit();
    }
  }

  render() {
    const { props } = this;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Signup</h2>
            <Validation.components.Form ref={c => this.form = c} onSubmit={this.handleSubmit}>
              <Row controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  Email
                </Col>
                <Col sm={8}>
                  <Validation.components.Input validations={['email', 'required']} value={props.signupEmail} onChange={props.handleChange} name='signupEmail' type="email" placeholder="Email" />
                </Col>
              </Row>
              <Row controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel} sm={4}>
                  Username
                </Col>
                <Col sm={8}>
                  <Validation.components.Input validations={['required', 'alpha', 'username']} value={props.signupUsername} onChange={props.handleChange} name='signupUsername' type="text" placeholder="Username" />
                </Col>
              </Row>
              <Row controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                  Password
                </Col>
                <Col sm={8}>
                  <Validation.components.Input validations={['required', 'passwordLength', 'password']} onChange={props.handleChange} value={props.signupPassword} name='signupPassword' type="password" placeholder="Password" />
                </Col>
              </Row>
              <Row controlId="formHorizontalConfirmPassword">
                <Col componentClass={ControlLabel} sm={4}>
                  Confirm Password
                </Col>
                <Col sm={8}>
                  <Validation.components.Input validations={['required', 'passwordLength', 'password']} onChange={props.handleChange} value={props.signupConfirmPassword} name='signupConfirmPassword' type="password" placeholder="Confirm Password" />
                </Col>
              </Row>
              <Row controlId="formHorizontalBio">
                <Col componentClass={ControlLabel} sm={4}>
                  Bio
                </Col>
                <Col sm={8}>
                  <textarea onChange={props.handleChange} value={props.signupBio} name='signupBio' placeholder="Bio" />
                </Col>
              </Row>
              <Row controlId="formHorizontalBirthDate">
                <Col componentClass={ControlLabel} sm={4}>
                  Birth Date
                </Col>
                <Col sm={8}>
                  <input onChange={props.handleChange} value={props.signupBirthDate} name='signupBirthDate' type="date" placeholder="Birth Date" />
                </Col>
              </Row>
              <div>
                <div className="buttons">
                  <a name='signupModalOpen' onClick={props.toggleModal}>
                    Close
                  </a>
                  <button type="submit">
                    Sign up
                  </button>
                </div>
              </div>
            </Validation.components.Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

export default SignupModal;
