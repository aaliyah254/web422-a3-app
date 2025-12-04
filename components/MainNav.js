/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aaliyah Salat Student ID: 161973185 Date: 01/12/2025
*
*  Vercel App (Deployed) Link: https://web422-a3-app.vercel.app/login
*
********************************************************************************/  

import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const token = readToken(); 

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Aaliyah Salat {token && <> – Welcome {token.userName}</>}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">About</Nav.Link>
            </Nav>

            {token && (
              <Nav className="ms-auto">
                <NavDropdown title={token.userName} align="end" id="user-dropdown">
                  <NavDropdown.Item as={Link} href="/favourites">
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}

            {!token && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} href="/register">Register</Nav.Link>
                <Nav.Link as={Link} href="/login">Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br /><br />
    </>
  );
}