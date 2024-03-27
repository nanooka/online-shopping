import {
  Container,
  Image,
  Nav,
  Navbar as NavbarBs,
  Form,
  Button,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
// import { useState } from "react";
// import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatCurrency } from "../functions/formatCurrency";

interface SearchType {
  search: string;
  setSearch: (value: string) => void;
}
interface cartProductsType {
  userId: string;
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { rate: number; count: number };
  category: string;
  description: string;
  quantity: number;
}

export default function Navbar({ search, setSearch }: SearchType) {
  const userID = Cookies.get("userID");
  const token = localStorage.getItem("token");
  const [cartProducts, setCartProducts] = useState<Array<cartProductsType>>([]);
  // const { openCart, cartQuantity } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    async function getCartProducts() {
      try {
        const requestData = {
          userId: userID,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch("http://localhost:3000/cart/userCart", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestData),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch favorite products");
        }
        const cartItems = await response.json();
        setCartProducts(cartItems);
      } catch (err) {
        console.log(err);
      }
    }
    getCartProducts();
  }, [removeFromCart]);

  // useEffect(() => {
  //   console.log("cartProducts:", cartProducts);
  // }, [cartProducts]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  async function removeFromCart(productId: number) {
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
      // Remove the product from cartProducts state
      setCartProducts((prevCartProducts) =>
        prevCartProducts.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
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
                const product = cartProducts.find(
                  (i) => i.quantity === cartProduct.quantity
                );
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
          <Nav.Link to="/login" as={NavLink} className="d-none d-lg-block">
            Log In
          </Nav.Link>
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
                  onClick={() => removeFromCart(product.id)}
                >
                  &times;
                </Button>
              </Stack>
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total:{" "}
              {formatCurrency(
                cartProducts.reduce((total, cartProduct) => {
                  const product = cartProducts.find(
                    (i) => i.id === cartProduct.id
                  );
                  return total + (product.price || 0) * cartProduct.quantity;
                }, 0)
              )}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </NavbarBs>
  );
}
