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
// import { SetStateAction, useState } from "react";

interface SearchType {
  search: string;
  setSearch: (value: string) => void;
}

export default function Navbar({ search, setSearch }: SearchType) {
  // const [search, setSearch] = useState("");

  // function handleSearch(event: {
  //   preventDefault: () => void;
  //   target: { value: SetStateAction<string> }[];
  // }) {
  //   event.preventDefault();
  //   setSearch(event.target[0].value);
  // }

  // function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  console.log("Navbar", search);

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
            // onSubmit={handleSearch}
            // onSubmit={() => setSearch("nanuka")}
            // onSubmit={handleSearch}
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
