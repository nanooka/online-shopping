import { useState } from "react";
import { Card } from "react-bootstrap";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import { Link } from "react-router-dom";

type StoreProductProps = {
  image: string;
  name: string;
  price: number;
  id: number;
  rating: { rate: number; count: number };
  category: string;
  description: string;
};

export default function StoreProduct({
  image,
  name,
  price,
  id,
  rating,
  category,
  description,
}: StoreProductProps) {
  // const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  //   currency: "USD",
  //   style: "currency",
  // });

  // function formatCurrency(number: number) {
  //   return CURRENCY_FORMATTER.format(number);
  // }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      style={{
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
        <Card.Title>{name}</Card.Title>
        <Card.Title>{formatCurrency(price)}</Card.Title>
      </Card.Body>
      <div className="d-flex align-items-center gap-1 mb-3 ms-3">
        {renderStars(rating.rate)}
        {rating.rate}
      </div>
    </Card>
  );
}
