import React from 'react';
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import '../LoginModal/ModalStyles.css';

export default function SignupModal(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Body>
          <h2>Signup</h2>
          <Form horizontal onSubmit={props.handleSignupSubmit}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Email
              </Col>
              <Col sm={8}>
                <FormControl value={props.signupEmail} onChange={props.handleChange} name='signupEmail' type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={4}>
                Username
              </Col>
              <Col sm={8}>
                <FormControl value={props.signupUsername} onChange={props.handleChange} name='signupUsername' type="text" placeholder="Username" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl onChange={props.handleChange} value={props.signupPassword} name='signupPassword' type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalConfirmPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Confirm Password
              </Col>
              <Col sm={8}>
                <FormControl onChange={props.handleChange} value={props.signupConfirmPassword} name='signupConfirmPassword' type="password" placeholder="Confirm Password" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalBio">
              <Col componentClass={ControlLabel} sm={4}>
                Bio
              </Col>
              <Col sm={8}>
                <FormControl onChange={props.handleChange} value={props.signupBio} name='signupBio' componentClass="textarea" placeholder="Bio" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalBirthDate">
              <Col componentClass={ControlLabel} sm={4}>
                Birth Date
              </Col>
              <Col sm={8}>
                <FormControl onChange={props.handleChange} value={props.signupBirthDate} name='signupBirthDate' type="date" placeholder="Birth Date" />
              </Col>
            </FormGroup>
            <FormGroup>
              <div className="buttons">
                <button name='signupModalOpen' onClick={props.toggleModal}>
                  Close
                </button>
                <button type="submit">
                  Sign up
                </button>
              </div>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
