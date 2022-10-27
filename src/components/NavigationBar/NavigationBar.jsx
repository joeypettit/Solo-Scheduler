import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function NavigationBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <Navbar bg="light" expand="lg" className="shadow">
    <Container className='mx-3'>
      <Navbar.Brand className="d-flex flex-row text-muted" href="#home">
        <div className='text-primary'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
          </svg>
        </div>
          <h1 className='mx-2 pe-3 border-bottom'>fecha</h1>
      </Navbar.Brand>
      </Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">
            </Nav.Link>
        <Nav.Link href="#home">
          <h4>Home</h4>
        </Nav.Link>
          <Nav.Link href="#home">
            <h4 onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</h4>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>


  );
}

export default NavigationBar;
