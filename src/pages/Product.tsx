import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useCart } from "../context/CartContext";
import { ProductType } from "./Home";

export default function Product() {
  const userID = Cookies.get("userID") || "";
  const token = (localStorage.getItem("token") || "") as string;

  const [isProductInFavorites, setIsProductInFavorites] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { cartProducts, getCartProducts } = useCart();

  useEffect(() => {
    const productIsInCart = cartProducts.some(
      (product) => product.id === location.state?.item.id
    );
    const quantity =
      cartProducts.find((product) => product.id === location.state?.item.id)
        ?.quantity || 0;
    setIsProductInCart(productIsInCart);
    setQuantity(quantity);
    console.log("isProductInCart", isProductInCart);
  }, [cartProducts, isProductInCart, location.state?.item.id]);

  // get user's favorites list
  useEffect(() => {
    async function getFavoriteProducts() {
      if (!token || !userID) return;
      try {
        const requestData = {
          userId: userID,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(
          "http://localhost:3000/favorites/userFavorites",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite products");
        }
        const favoriteProducts: ProductType[] = await response.json();
        const isFavorite = favoriteProducts.some(
          (favorite) => favorite.id === location.state?.item.id
        );
        setIsProductInFavorites(isFavorite);
        console.log(favoriteProducts);
      } catch (err) {
        console.log(err);
      }
    }
    getFavoriteProducts();
  }, [isProductInFavorites, location.state?.item.id, token, userID]);

  // add product to favorites
  async function addToFavorites() {
    if (!token || !userID) {
      navigate("/login");
    } else {
      try {
        const requestData = {
          userId: userID,
          id: location.state?.item.id,
          image: location.state?.item.image,
          title: location.state?.item.title,
          price: location.state?.item.price,
          rating: location.state?.item.rating,
          category: location.state?.item.category,
          description: location.state?.item.description,
        };
        console.log(requestData);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestData),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsProductInFavorites(true);
    }
  }

  // remove product from favorites
  async function removeFromFavorites() {
    try {
      const requestData = {
        userId: userID,
        id: location.state?.item.id,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/favorites/:id", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsProductInFavorites(false);
  }

  // add product to cart
  async function addToCart() {
    if (!token || !userID) {
      navigate("/login");
    } else {
      try {
        const requestData = {
          userId: userID,
          id: location.state?.item.id,
          image: location.state?.item.image,
          title: location.state?.item.title,
          price: location.state?.item.price,
          rating: location.state?.item.rating,
          category: location.state?.item.category,
          description: location.state?.item.description,
          quantity: 1,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestData),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setQuantity(quantity + 1);
        console.log("quantity: ", quantity);
        getCartProducts(userID, token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  // remove product from cart
  async function removingFromCart() {
    try {
      const requestData = {
        userId: userID,
        id: location.state?.item.id,
        image: location.state?.item.image,
        title: location.state?.item.title,
        price: location.state?.item.price,
        rating: location.state?.item.rating,
        category: location.state?.item.category,
        description: location.state?.item.description,
        quantity: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/cart/:id", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setQuantity(0);
    getCartProducts(userID, token);
  }

  // decrease quantity by 1 for "-" button
  async function decreaseProductQuantityInCart() {
    try {
      const requestData = {
        userId: userID,
        id: location.state?.item.id,
        image: location.state?.item.image,
        title: location.state?.item.title,
        price: location.state?.item.price,
        rating: location.state?.item.rating,
        category: location.state?.item.category,
        description: location.state?.item.description,
        quantity: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/cart/:id", {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setQuantity(quantity - 1);
      getCartProducts(userID, token);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <Container
      style={{
        marginTop: "10em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ maxWidth: "900px", padding: "40px", textAlign: "right" }}>
        {!isProductInFavorites ? (
          <Icon.Heart
            onClick={addToFavorites}
            color="#dc3545"
            size={30}
            style={{
              cursor: "pointer",
              alignSelf: "end",
            }}
          />
        ) : (
          <Icon.HeartFill
            onClick={removeFromFavorites}
            color="#dc3545"
            size={30}
            style={{
              cursor: "pointer",
              alignSelf: "end",
            }}
          />
        )}
        <Row>
          <Col xs={12} md={4}>
            <Card.Img src={location.state?.item.image} />
          </Col>
          <Col xs={12} md={8}>
            <Card.Body>
              <Card.Title>{location.state?.item.name}</Card.Title>
              <Card.Title>
                {formatCurrency(location.state?.item.price)}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-end gap-1 mb-3 ms-3">
                {renderStars(location.state?.item.rating.rate)}
                {location.state?.item.rating.rate}
              </div>
              <Card.Text>{location.state?.item.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <span style={{ fontStyle: "italic", color: "gray" }}>
          category: {location.state?.item.category}
        </span>
        {quantity === 0 ? (
          <Button
            variant="dark"
            style={{ width: "150px", alignSelf: "end", marginTop: "8px" }}
            onClick={addToCart}
          >
            + Add To Cart
          </Button>
        ) : (
          <div
            className="d-flex align-items-end flex-column"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button variant="dark" onClick={decreaseProductQuantityInCart}>
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button variant="dark" onClick={addToCart}>
                +
              </Button>
            </div>
            <Button
              variant="danger"
              style={{ width: "150px" }}
              onClick={removingFromCart}
            >
              Remove
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
