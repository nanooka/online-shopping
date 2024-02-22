import { Container } from "react-bootstrap";
import { useFavorite } from "../context/FavoriteContext";

export default function Favorites() {
  const { favorites } = useFavorite();

  console.log(favorites);

  return (
    <Container style={{ marginTop: "10em", marginBottom: "50px" }}>
      <div>
        <h1>Favorite Products</h1>
        {favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          <div>
            {favorites.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                {/* Render other product details here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
