import {
  Container,
  Image,
  Nav,
  Navbar as NavbarBs,
  Form,
  Button,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface SearchType {
  search: string;
  setSearch: (value: string) => void;
}

// const quantity = 1;

export default function Navbar({ search, setSearch }: SearchType) {
  const { openCart, cartQuantity } = useShoppingCart();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // function handleFavorites() {
  //   console.log("clicked");
  // }

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
              // style={{ height: "50px" }}
            />
            <Button
              type="submit"
              className="position-absolute top-0 end-0"
              // style={{ height: "50px", width: "50px" }}
            >
              <Icon.Search />
            </Button>
          </Form>
          <Button
            onClick={openCart}
            variant="outline-primary"
            className="rounded-circle"
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
              marginLeft: "2rem",
              marginRight: "1rem",
            }}
          >
            <Icon.Cart2
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                left: "50%",
                bottom: "50%",
                transform: "translate(-50%, 50%)",
              }}
            />
            {/* {quantity > 0 ? ( */}
            <div
              className="rounded-circle bg-danger f-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(25%, -25%)",
              }}
            >
              {cartQuantity}
            </div>
            {/* ) : null} */}
          </Button>
          {/* <Button> */}
          <Link to={"/favorites"} style={{ alignSelf: "center" }}>
            <Icon.HeartFill
              // onClick={handleFavorites}
              color="#dc3545"
              size={30}
              style={{
                // cursor: "pointer",
                // alignSelf: "center",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Link>
          {/* </Button> */}
          <Nav.Link to="/login" as={NavLink} className="d-none d-lg-block">
            Log In
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
