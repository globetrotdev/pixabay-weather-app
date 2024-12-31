// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Pixabay Weather</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Pixabay Search</Nav.Link>
        <Nav.Link href="/weather">Weather Search</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppNavbar;
