import React from "react";
import Search from "./search";
import { Navbar, Nav } from "react-bootstrap"

const NoAuthNav = () => (
  <Navbar bg="white" expand="md" fixed={"top"} >
    <Navbar.Brand href="/" className="text-primary rekr-brand">REKR</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Search />
      <a href="/login" className="rek-btn btn btn-secondary">Sign Up</a>
    </Navbar.Collapse>
  </Navbar>
)

export default NoAuthNav;
