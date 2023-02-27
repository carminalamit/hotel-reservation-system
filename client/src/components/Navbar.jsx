import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import { LoginModal } from "./LogInModal";
import { RegisterModal } from "./RegisterModal";

function ListExample() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li" className="nav-left">
          <Nav.Link className="text-light">The Richmonde Hotel & Suites</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className="nav-right">
          <Nav.Link
            className="text-light"
            eventKey="link-1"
            onClick={() => setShowRegister(true)}
          >
            Register
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className="nav-right">
          <Nav.Link
            className="text-light"
            eventKey="link-2"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} />
    </>
  );
}

export default ListExample;


