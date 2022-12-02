import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export default function Toaster(props) {
    const [show, setShow] = useState(props?.show);
  return (
    <Row>
    <Col xs={6}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        
        <Toast.Body>{props?.body}</Toast.Body>
      </Toast>
    </Col>
    <Col xs={6}>
      <Button onClick={() => setShow(true)}>Show Toast</Button>
    </Col>
  </Row>
  )
}
