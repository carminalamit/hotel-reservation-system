import React from 'react'
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
// import { FaLogout } from "react-icons/fa";


function Logout() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const navigate = useNavigate()
    function LogOut()
    {
        localStorage.clear();
        navigate('/')
    }
    return (
    <div>
        <Nav>
            <Nav.Item as="li" className="nav-left">
                <Nav.Link className="text-light">The Richmonde Hotel & Suites</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-right">
                <Nav.Link onClick={LogOut} className="text-light">Logout</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
  )
}

export default Logout
