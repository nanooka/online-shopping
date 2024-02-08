import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import { useNavigate } from "react-router-dom";
import SelectCategory from "../components/SelectCategory";

export interface ProductType {
  image: string;
  title: string;
  price: number;
  id: number;
  rating: { rate: number; count: number };
  category: string;
  description: string;
}

export default function Home(search: { search: string }) {
  console.log("home", search.search);
  const [category, setCategory] = useState("category");

  const [list, setList] = useState(Array<ProductType>);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const itemData = data.map((item: ProductType) => ({
        image: item.image,
        title: item.title,
        price: item.price,
        id: item.id,
        rating: item.rating,
        category: item.category,
        description: item.description,
      }));

      setList(itemData);
    }
    fetchItems();
  }, [search.search]);

  const navigate = useNavigate();

  return (
    <Container style={{ marginTop: "10em" }}>
      <SelectCategory category={category} setCategory={setCategory} />
      <Row xs={1} md={2} lg={3} className="g-5">
        {list?.map((item) =>
          item.title.toLowerCase().includes(search.search.toLowerCase()) &&
          (item.category === category || category == "category") ? (
            <Col
              key={item.id}
              onClick={() => navigate(`/${item.id}`, { state: { item } })}
            >
              <StoreProduct {...item} />
            </Col>
          ) : null
        )}
      </Row>
    </Container>
  );
}
