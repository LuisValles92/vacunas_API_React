import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="xl"
        bg="danger"
        variant="dark"
      >
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link as={Link} to="/Home">
              Home
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link as={Link} to="/CRUD">
              CRUD
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link as={Link} to="/DatosGlobales">
              Datos Globales
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
