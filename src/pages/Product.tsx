import { Card, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import { useState } from "react";

export default function Product() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      style={{
        marginTop: "10em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ maxWidth: "900px", padding: "40px", textAlign: "right" }}>
        <Row>
          <Col xs={12} md={4}>
            <Card.Img src={location.state.item.image} />
          </Col>
          <Col xs={12} md={8}>
            <Card.Body>
              <Card.Title>{location.state.item.name}</Card.Title>
              <Card.Title>
                {formatCurrency(location.state.item.price)}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-end gap-1 mb-3 ms-3">
                {renderStars(location.state.item.rating)}
                {location.state.item.rating.rate}
              </div>
              <Card.Text>{location.state.item.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <span style={{ fontStyle: "italic", color: "gray" }}>
          category:{" "}
          <Link
            to={"/"}
            style={{
              fontStyle: "italic",
              color: "gray",
              textDecoration: isHovered ? "underline" : "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {location.state.item.category}
          </Link>
        </span>
      </Card>
    </Container>
  );
}
