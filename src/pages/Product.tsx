import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Product() {
  const location = useLocation();
  const [isLoved, setIsLoved] = useState(false);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(location.state?.item.id);

  const loveButtonHandler = () => {
    setIsLoved((current) => !current);
  };

  // console.log(quantity);

  return (
    <Container
      style={{
        marginTop: "10em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ maxWidth: "900px", padding: "40px", textAlign: "right" }}>
        {isLoved ? (
          <Icon.HeartFill
            onClick={loveButtonHandler}
            color="red"
            size={30}
            style={{
              cursor: "pointer",
              alignSelf: "end",
            }}
          />
        ) : (
          <Icon.Heart
            onClick={loveButtonHandler}
            color="red"
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
        {/* <Button
          style={{ width: "150px", alignSelf: "end", marginTop: "8px" }}
          onClick={() => increaseCartQuantity(location.state?.item.id)}
        >
          + Add to cart
        </Button> */}
        {quantity === 0 ? (
          <Button
            style={{ width: "150px", alignSelf: "end", marginTop: "8px" }}
            onClick={() => increaseCartQuantity(location.state?.item.id)}
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
                onClick={() => decreaseCartQuantity(location.state?.item.id)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button
                onClick={() => increaseCartQuantity(location.state?.item.id)}
              >
                +
              </Button>
            </div>
            <Button
              variant="danger"
              style={{ width: "150px" }}
              onClick={() => removeFromCart(location.state?.item.id)}
            >
              Remove
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
