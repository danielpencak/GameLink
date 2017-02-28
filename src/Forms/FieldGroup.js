import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}
