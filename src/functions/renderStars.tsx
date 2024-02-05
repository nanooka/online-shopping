import * as Icon from "react-bootstrap-icons";

export function renderStars(rating: { rate: number; count: number }) {
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
