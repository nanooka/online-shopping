import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import * as Icon from "react-bootstrap-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useFavorite } from "../context/FavoriteContext";
import { useState } from "react";
// import { useUserID } from "../context/UserIDContext";
import Cookies from "js-cookie";

export default function Product() {
  const userID = Cookies.get("userID");
  // console.log(userID);

  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  const location = useLocation();
  console.log(location.state);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const { addToFavorites, removeFromFavorites, favorites } =
    useFavorite() || {};

  const isProductInFavorites = favorites?.some(
    (favorite) => favorite.id === location.state?.item.id
  );

  const quantity = getItemQuantity(location.state?.item.id);

  async function adding() {
    try {
      const requestData = {
        userId: userID,
        productId: location.state?.item.id,
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
      // console.log("response: ", response);
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    if (addToFavorites) {
      addToFavorites(location.state?.item);
    }
  }

  async function removing() {
    try {
      const requestData = {
        userId: userID,
        productId: location.state?.item.id,
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
      // console.log("response: ", response);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    if (removeFromFavorites) {
      removeFromFavorites(location.state?.item.id);
    }
  }

  async function addToCart() {
    try {
      const requestData = {
        userId: userID,
        productId: location.state?.item.id,
        quantity: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    increaseCartQuantity(location.state?.item.id);
  }

  async function removingFromCart() {
    try {
      const requestData = {
        userId: userID,
        productId: location.state?.item.id,
        quantity: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/cart/remove", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // console.log("response: ", response);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    removeFromCart(location.state?.item.id);
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
            onClick={adding}
            color="#dc3545"
            size={30}
            style={{
              cursor: "pointer",
              alignSelf: "end",
            }}
          />
        ) : (
          <Icon.HeartFill
            onClick={removing}
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
            // onClick={() => increaseCartQuantity(location.state?.item.id)}
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
              <Button
                variant="dark"
                onClick={() => decreaseCartQuantity(location.state?.item.id)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button
                variant="dark"
                onClick={() => increaseCartQuantity(location.state?.item.id)}
              >
                +
              </Button>
            </div>
            <Button
              variant="danger"
              style={{ width: "150px" }}
              // onClick={() => removeFromCart(location.state?.item.id)}
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
