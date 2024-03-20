import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { renderStars } from "../functions/renderStars";
import { formatCurrency } from "../functions/formatCurrency";
import * as Icon from "react-bootstrap-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useFavorite } from "../context/FavoriteContext";
import { useEffect, useState } from "react";
import { useUserID } from "../context/UserIDContext";

export default function Product() {
  const { userID } = useUserID() || {};
  console.log(userID);

  const [data, setData] = useState(null);
  // const [userId, setUserId] = useState("");

  const token = localStorage.getItem("token");
  // console.log(token);

  // const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  // if (decodedToken) {
  //   setUserId(decodedToken.userId);
  // }
  // console.log(decodedToken);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const requestData = {
  //         userId: "65f6d8d5385977daf5cf053f",
  //         productId: "1",
  //       };

  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       };

  //       const response = await fetch("http://localhost:3000/favorites/add", {
  //         method: "POST",
  //         headers: headers,
  //         body: JSON.stringify(requestData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       // const responseData = await response.json();

  //       // setResponseData(responseData);

  //       // Parse JSON response
  //       const jsonData = await response.json();

  //       // Update state with fetched data
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const location = useLocation();

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const { addToFavorites, removeFromFavorites, favorites } =
    useFavorite() || {};

  const isProductInFavorites = favorites?.some(
    (favorite) => favorite.id === location.state?.item.id
  );

  const quantity = getItemQuantity(location.state?.item.id);
  // console.log(favorites);

  /////////////

  // const token = localStorage.getItem("token");
  // console.log(token);

  // function adding() {
  //   if (addToFavorites) {
  //     addToFavorites(location.state?.item);
  //   }
  // }

  // const info = async () => {
  //   console.log("infoshi");
  //   try {
  //     const response = await fetch("http://localhost:3000/favorites/add");
  //     const jj = await response.json();
  //     console.log("jj", jj);
  //   } catch (error) {
  //     console.log("error: nn", error);
  //   }
  // };

  // async function info() {
  //   const response = await fetch("http://localhost:3000/favorites/getId");
  //   const data = await response.json();
  //   console.log(data);
  // }

  // info();

  async function adding() {
    // info();
    try {
      const requestData = {
        userId: userID,
        productId: location.state?.item.id,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/favorites/add", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      console.log("response: ", response);
      const jsonData = await response.json();

      // Update state with fetched data
      setData(jsonData);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    if (addToFavorites) {
      addToFavorites(location.state?.item);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async function info() {
  //   try {
  //     const response = await fetch("http://localhost:3000/favorites/add");
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log("errorr", error);
  //   }
  // }

  return (
    <Container
      style={{
        marginTop: "10em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ maxWidth: "900px", padding: "40px", textAlign: "right" }}>
        {!isProductInFavorites ? (
          <Icon.Heart
            // onClick={() => {
            //   if (addToFavorites) {
            //     addToFavorites(location.state?.item);
            //   }
            // }}
            onClick={adding}
            // onClick={info}
            color="#dc3545"
            size={30}
            style={{
              cursor: "pointer",
              alignSelf: "end",
            }}
          />
        ) : (
          <Icon.HeartFill
            onClick={() => {
              if (removeFromFavorites) {
                removeFromFavorites(location.state?.item.id);
              }
            }}
            color="#dc3545"
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
        {quantity === 0 ? (
          <Button
            variant="dark"
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
                variant="dark"
                onClick={() => decreaseCartQuantity(location.state?.item.id)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button
                variant="dark"
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
