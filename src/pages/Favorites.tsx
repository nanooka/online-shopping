import { Card, Col, Container, Row } from "react-bootstrap";
import { useFavorite } from "../context/FavoriteContext";
import { formatCurrency } from "../functions/formatCurrency";
import { renderStars } from "../functions/renderStars";
import { useNavigate } from "react-router-dom";
import StoreProduct from "../components/StoreProduct";

export default function Favorites() {
  const { favorites } = useFavorite();

  console.log(favorites);
  const navigate = useNavigate();

  return (
    <Container style={{ marginTop: "10em", marginBottom: "50px" }}>
      <div>
        <h1>Favorite Products</h1>
        {favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          // <Row xs={1} md={2} lg={3} className="g-5">
          //   {favorites.map((item) => (
          //     <Col
          //       key={item.id}
          //       onClick={() => navigate(`/${item.id}`, { state: { item } })}
          //     >
          //       <Card style={{ cursor: "pointer" }}>
          //         <Card.Img
          //           src={item.image}
          //           variant="top"
          //           height="200px"
          //           style={{ objectFit: "cover" }}
          //         />
          //         <Card.Body>
          //           <Card.Title>{item.title}</Card.Title>
          //           <Card.Title>{formatCurrency(item.price)}</Card.Title>
          //         </Card.Body>
          //         <div className="d-flex align-items-center gap-1 mb-3 ms-3">
          //           {renderStars(item.rating.rate)}
          //           {item.rating.rate}
          //         </div>
          //       </Card>
          //     </Col>
          //   ))}
          // </Row>
          <Row xs={1} md={2} lg={3} className="g-5">
            {favorites?.map((item) => (
              <Col
                key={item.id}
                onClick={() => navigate(`/${item.id}`, { state: { item } })}
              >
                <StoreProduct {...item} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}
