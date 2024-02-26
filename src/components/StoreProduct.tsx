import { useState } from "react";
import { Card } from "react-bootstrap";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import { ProductType } from "../pages/Home";

export default function StoreProduct({
  image,
  title,
  price,
  id,
  rating,
  category,
  description,
}: ProductType) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      style={{
        height: "100%",
        cursor: "pointer",
        boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Img
        src={image}
        variant="top"
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Title>{formatCurrency(price)}</Card.Title>
      </Card.Body>
      <div className="d-flex align-items-center gap-1 mb-3 ms-3">
        {renderStars(rating.rate)}
        {rating.rate}
      </div>
    </Card>
  );
}
