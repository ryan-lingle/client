import React from "react";
import { Navbar, Nav, Dropdown, Form } from "react-bootstrap"
import ProfilePic from '../profile.png';
import RekModal from './rek_modal';

const Navigation = (props) => {
  const username = localStorage.getItem("username");
  return(
    <Navbar bg="white" expand="md" fixed={"top"} >
      <Navbar.Brand href="/" className="text-primary rekr-brand">REKR</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
          <Nav.Link href="/notifications">Notifications</Nav.Link>
        </Nav>
        <Form inline>
          <Form.Control type="text" placeholder="Search Rekr" className="mr-sm-2" />
        </Form>
        <Dropdown>
          <Dropdown.Toggle as="div" >
            <img src={ProfilePic} alt="avatar" className="rounded-circle" width="35px"/>
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight={true}>
            <Dropdown.Item href={`/u/${username}`} >Profile</Dropdown.Item>
            <Dropdown.Item href="/create-podcast">Have a Podcast?</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <RekModal>
          <div href="#" className="rek-btn btn btn-secondary">Rek</div>
        </RekModal>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;
