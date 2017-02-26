import React from 'react';
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

export default function LoginModal(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Body>
          <header>
            <h2>Login</h2>
          </header>
          <Form horizontal onSubmit={props.handleLoginSubmit}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl value={props.loginEmail} onChange={props.handleChange} name='loginEmail' type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl onChange={props.handleChange} value={props.loginPassword} name='loginPassword' type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button name='loginModalOpen' onClick={props.toggleModal}>
                  Close
                </Button>
                <Button bsStyle='primary' type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
