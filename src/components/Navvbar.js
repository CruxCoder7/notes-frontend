import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../logo.png";

function Navbbar({ auth }) {
  return (
    <Navbar
      style={{ backgroundColor: "#0A1929" }}
      className={styles.color_nav}
      expand="lg"
    >
      <Container style={{ backgroundColor: "#0A1929" }}>
        <Navbar.Brand href="/">
          <Image src={logo} rounded height="60" width="100"></Image>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#0A1929" }}
          className={styles.custom_toggler}
        ></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ backgroundColor: "#0A1929" }}>
            <Nav.Link
              as={Link}
              style={{
                fontSize: "20px",
                backgroundColor: "#0A1929",
                color: "rgb(102, 178, 255)",
              }}
              to="/"
            >
              Blogs
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{
                fontSize: "20px",
                backgroundColor: "#0A1929",
                color: "rgb(102, 178, 255)",
              }}
              to="/notes"
            >
              Notes
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{
                fontSize: "20px",
                backgroundColor: "#0A1929",
                color: "rgb(102, 178, 255)",
              }}
              to={auth ? "/compose/blogs" : "/admin"}
            >
              {auth ? <span>Compose</span> : <span>Admin</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbbar;
