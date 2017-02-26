import React from 'react';

export default function Session(props) {
  return (
    <div>
      Session

      { props.params.sessionId }
    </div>
  );
}
