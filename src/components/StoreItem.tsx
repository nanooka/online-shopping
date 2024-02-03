import { Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

type StoreItemProps = {
  image: string;
  name: string;
  price: number;
  id: number;
  rating: { rate: number; count: number };
};

export default function StoreItem({
  image,
  name,
  price,
  id,
  rating,
}: StoreItemProps) {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
  }

  function renderStars(rating: { rate: number; count: number }) {
    const starIcons = [];
    const fullStars = Math.floor(rating.rate);
    const halfStar = rating.rate % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<Icon.StarFill key={i} color="orange" />);
    }

    if (halfStar) {
      starIcons.push(<Icon.StarHalf key="half" color="orange" />);
    }

    const emptyStars = 5 - starIcons.length;
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<Icon.Star key={`empty-${i}`} color="orange" />);
    }

    return starIcons;
  }

  return (
    <Card>
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
        {renderStars(rating)}
        {rating.rate}
      </div>
    </Card>
  );
}
