import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap"
import RekModal from './rek_modal';
import Search from "./search";

const Navigation = (props) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const profilePic = localStorage.getItem("profilePic");
  const hasPodcast = localStorage.getItem("hasPodcast");
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
        <Search />
        <Dropdown>
          <div>
            <Dropdown.Toggle as="div" >
              <img src={profilePic} alt="avatar" className="rounded-circle" width="35px"/>
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight={true}>
              <Dropdown.Item href={`/u/${username}`} >Profile</Dropdown.Item>
              {hasPodcast === "true" ?
                <Dropdown.Item href="/podcast-dashboard">Podcast Dashboard</Dropdown.Item>
                : <Dropdown.Item href="/create-podcast">Have a Podcast?</Dropdown.Item>}
              <Dropdown.Item onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </div>
        </Dropdown>
        <RekModal>
          <div href="#" className="rek-btn btn btn-secondary">Rek</div>
        </RekModal>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;
