import {
  Container,
  Image,
  Nav,
  Navbar as NavbarBs,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

export default function Navbar() {
  return (
    <NavbarBs className="bg-white shadow-sm mb-3 fixed-top">
      <Container>
        <NavbarBs.Brand
          href="/"
          className="d-flex flex-sm-column flex-lg-row align-items-center"
        >
          <Image src={"/logo.svg"} style={{ width: "80px" }} />
          <h1 className="d-none d-sm-block">Online Shop</h1>
        </NavbarBs.Brand>
        <Nav>
          {/* <Nav.Link
            to="/"
            as={NavLink}
            className="d-flex flex-sm-column flex-lg-row align-items-center"
          >
            <Image src={"/public/logo.svg"} style={{ width: "80px" }} />
            <h1 className="d-none d-sm-block">Online Shop</h1>
          </Nav.Link> */}
          {/* <input type="search" /> */}
          <Form className="position-relative" style={{ width: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search"
              // className="mr-sm-w"
              //   style={{ minWidth: "250px" }}
            />
            <Button type="submit" className="position-absolute top-0 end-0">
              <Icon.Search />
            </Button>
          </Form>
          <Nav.Link to="/login" as={NavLink} className="d-none d-lg-block">
            Log In
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
