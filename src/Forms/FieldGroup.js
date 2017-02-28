import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      {
        label ?
        <ControlLabel>{label}</ControlLabel>
        :null
      }
      <FormControl {...props} />
    </FormGroup>
  );
}
