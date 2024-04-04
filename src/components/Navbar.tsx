import {
  Container,
  Image,
  Nav,
  Navbar as NavbarBs,
  Form,
  Button,
  Offcanvas,
  Stack,
  NavDropdown,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatCurrency } from "../functions/formatCurrency";
import { CartProductType, useCart } from "../context/CartContext";

interface SearchType {
  search: string;
  setSearch: (value: string) => void;
}

async function removeFromCart(
  productId: number,
  userID: string | undefined,
  token: string | null,
  setCartProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>
) {
  try {
    const requestData = {
      userId: userID,
      id: productId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:3000/cart/${productId}`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Failed to remove product from cart");
    }
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((item) => item.id !== productId)
    );
  } catch (error) {
    console.error("Error removing product from cart: ", error);
  }
}

export default function Navbar({ search, setSearch }: SearchType) {
  const userID = Cookies.get("userID");
  const token = localStorage.getItem("token");
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const { cartProducts, setCartProducts } = useCart();

  function handleLogout() {
    Cookies.remove("userID");
    localStorage.removeItem("token");
    setUserEmail("");
    setCartProducts([]);
    navigate("/");
  }

  useEffect(() => {
    if (userID && !userEmail) {
      fetch(`http://localhost:3000/users/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userID, userEmail]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <NavbarBs
      className="shadow-sm mb-3 fixed-top"
      style={{ backgroundColor: "#ebb3f4" }}
    >
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
              className="form-control"
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
            <Button
              type="submit"
              className="position-absolute top-0 end-0"
              variant="dark"
            >
              <Icon.Search />
            </Button>
          </Form>
          <Button
            onClick={openCart}
            variant="outline-dark"
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
              {cartProducts.reduce((total, cartProduct) => {
                return total + cartProduct.quantity;
              }, 0)}
            </div>
          </Button>
          <Link to={"/favorites"} style={{ alignSelf: "center" }}>
            <Icon.HeartFill
              color="#dc3545"
              size={30}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Link>
          {!token ? (
            <Nav.Link to="/login" as={NavLink} className="d-none d-lg-block">
              Log In
            </Nav.Link>
          ) : (
            <NavDropdown title={userEmail} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleLogout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton style={{ backgroundColor: "#f3e3f6" }}>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartProducts.map((product) => (
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex align-items-center"
                key={product.id}
              >
                <img
                  src={product.image}
                  style={{ width: "125px", height: "75px", objectFit: "cover" }}
                />
                <div className="me-auto">
                  <div>
                    {product.title}
                    {product.quantity > 1 && (
                      <span
                        className="text-muted"
                        style={{ fontSize: ".65rem", marginLeft: ".5rem" }}
                      >
                        x{product.quantity}
                      </span>
                    )}
                  </div>
                  <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(product.price)}
                  </div>
                  <div>{formatCurrency(product.price * product.quantity)}</div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    removeFromCart(product.id, userID, token, setCartProducts)
                  }
                >
                  &times;
                </Button>
              </Stack>
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total:{" "}
              {formatCurrency(
                cartProducts.reduce((total, cartProduct) => {
                  return (
                    total + (cartProduct.price || 0) * cartProduct.quantity
                  );
                }, 0)
              )}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </NavbarBs>
  );
}
