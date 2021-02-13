import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="xl"
        bg="dark"
        variant="dark"
      >
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link as={Link} to="/Home">
            <Icon style={{ fontSize: 30 }}>home</Icon>
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link as={Link} to="/CRUD">
            <Icon style={{ fontSize: 30 }}>settings</Icon>
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link as={Link} to="/DatosGlobales">
            <Icon style={{ fontSize: 30 }}>menu_book</Icon>
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
