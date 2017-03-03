import React from 'react';
import { Modal, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import './ModalStyles.css';

export default function LoginModal(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Body>
          <h2>Login</h2>
          <Form horizontal onSubmit={props.handleLoginSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl value={props.loginEmail} onChange={props.handleChange} name='loginEmail' type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl onChange={props.handleChange} value={props.loginPassword} name='loginPassword' type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <div className="buttons">
                <a name='loginModalOpen' onClick={props.toggleModal}>
                  Close
                </a>
                <button type="submit">
                  Sign in
                </button>
              </div>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
