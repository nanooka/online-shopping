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

interface SearchType {
  search: string;
  setSearch: (value: string) => void;
}

export default function Navbar({ search, setSearch }: SearchType) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

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
          <Form
            className="position-relative"
            style={{ width: "300px" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
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
