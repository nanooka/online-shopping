import { useNavigate } from "react-router-dom";
import StoreProduct from "../components/StoreProduct";
import { Col, Container, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface ProductType {
  userId: string;
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { rate: number; count: number };
  category: string;
  description: string;
}

export default function Favorites() {
  const userID = Cookies.get("userID");
  const token = localStorage.getItem("token");
  const [userFavorites, setUserFavorites] = useState<Array<ProductType>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFavoriteProducts() {
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
        const favoriteProducts = await response.json();
        setUserFavorites(favoriteProducts);
      } catch (err) {
        console.log(err);
      }
    }
    getFavoriteProducts();
  }, []);
  console.log(userFavorites);

  return (
    <Container style={{ marginTop: "10em", marginBottom: "50px" }}>
      <div>
        <h1>Favorite Products</h1>
        {userFavorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-5">
            {userFavorites.map((item) => (
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
      {!token && !userID && <p> No favorite products yet</p>}
    </Container>
  );
}
