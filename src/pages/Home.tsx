import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

export default function Home() {
  const [list, setList] = useState<
    Array<{
      image: string;
      name: string;
      price: number;
      id: number;
      rating: { rate: number; count: number };
    }>
  >([]);

  useEffect(function () {
    async function fetchItems() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data);

      const itemData = data.map(
        (item: {
          image: string;
          title: string;
          price: number;
          id: number;
          rating: { rate: number; count: number };
        }) => ({
          image: item.image,
          name: item.title,
          price: item.price,
          id: item.id,
          rating: item.rating,
        })
      );
      setList(itemData);
    }
    fetchItems();
  }, []);

  return (
    <Container style={{ marginTop: "10em" }}>
      <Row xs={1} md={2} lg={3} className="g-5">
        {list?.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
