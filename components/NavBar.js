/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Modal,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClose = () => setShowInstructions(false);
  const handleShow = () => setShowInstructions(true);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand>Chemis-Tree</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/compounds" className="navLink">
                Compounds
              </Nav.Link>
              <Nav.Link href="/trees" className="navLink">
                Trees
              </Nav.Link>
              <Nav.Link onClick={handleShow} className="navLink">
                Instructions
              </Nav.Link>
              <Nav.Link onClick={signOut} className="signOut">
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showInstructions} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome! How to use Chemis-Tree is as follows:</p>
          <p>1. Each element in the table can be viewed to learn about their structure and how they appear in nature.</p>
          <p>2. By clicking Compound Mode, you can click multiple elements to see if they make a compound, if they do you can view that compound in the Compounds tab.</p>
          <p>Note: due to the database being used, some compounds can be made that dont actually exist, and some that do have limited information</p>
          <p>3. The Trees tab allows you to group the compounds you have made by any given criteria.</p>
          <p>Ex: If you make multiple compounds with a base element such as Carbon, you can make a tree called Carbon, and keep a directory of those specific compounds.</p>
          <p>Note: Tree branches are random and do not indicate additional relationship</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
