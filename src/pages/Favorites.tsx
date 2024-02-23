import { Col, Container, Row } from "react-bootstrap";
import { useFavorite } from "../context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import StoreProduct from "../components/StoreProduct";

export default function Favorites() {
  const { favorites } = useFavorite();
  const navigate = useNavigate();

  return (
    <Container style={{ marginTop: "10em", marginBottom: "50px" }}>
      <div>
        <h1>Favorite Products</h1>
        {favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
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
