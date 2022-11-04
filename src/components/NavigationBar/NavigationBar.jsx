import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react'

function NavigationBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);


  useEffect(()=>console.log('in navbar', !(Object.keys(user).length === 0) ));
  
  return (
    <Navbar bg="light" expand="sm" className="shadow">
        <Container className='ms-4'>
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
        <Container className='d-flex justify-content-end'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>  
              <Nav.Link href="#home">
                <h4 className='text-muted'>Home</h4>
              </Nav.Link>
                {/* if user is logged in, log out button will appear */}
                {!(Object.keys(user).length === 0)
                  ? <Nav.Link href="#home">
                      <h4 className='text-nowrap' onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</h4>
                    </Nav.Link>
                  : null}
            </Nav>      
          </Navbar.Collapse>
    </Navbar>


   );
 }

export default NavigationBar;
