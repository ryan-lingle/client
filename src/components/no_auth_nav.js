import React from "react";
import Search from "./nav_search";
import { Navbar } from "react-bootstrap"

const NoAuthNav = () => (
  <Navbar bg="white" expand="md" fixed={"top"} >
    <Navbar.Brand href="/" className="text-primary rekr-brand">REKR</Navbar.Brand>
    <div id="no-auth-left">
      <Search />
      <a href="/login" className="rek-btn btn btn-secondary">Sign Up</a>
    </div>
  </Navbar>
)

export default NoAuthNav;
