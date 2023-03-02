import React, { useState } from "react";
import { FaWifi, FaSwimmer, FaShuttleVan, FaCoffee } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";


function AutoLayoutExample() {
  return (
    <Container style={{boxShadow: "none"}}>
      <h3 className="services">Services</h3>
      <Row>
        <Col className="column">
          <FaCoffee />
          <h6 className="text">Breakfast</h6>
          <p className="text-p">We are pleased to offer our guests a complimentary continental breakfast each morning.</p>
        </Col>
        <Col className="column">
          <FaWifi />
          <h6 className="text">Wifi</h6>
          <p className="text-p">We offer high-speed WiFi throughout the hotel without any additional charge.</p>
        </Col>
        <Col className="column">
          <FaSwimmer />
          <h6 className="text">Amenities</h6>
          <p className="text-p">Access to world class amenities such as fitness center, infinity pool and many more.</p>
        </Col>
        <Col className="column">
          <FaShuttleVan />
          <h6 className="text">Shuttle</h6>
          <p className="text-p">Free shuttle service to and from the airport, nearby shopping centers and restaurants.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
