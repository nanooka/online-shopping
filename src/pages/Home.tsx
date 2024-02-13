import { useEffect, useState } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import { useNavigate } from "react-router-dom";
import SelectCategory from "../components/SelectCategory";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [category, setCategory] = useState("category");
  const [list, setList] = useState<Array<ProductType>>([]);
  const [printedList, setPrintedList] = useState<Array<ProductType>>([]);
  const [startNumber, setStartNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setList(data);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    setPrintedList(list.slice(0, startNumber + 6));
  }, [list, startNumber]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setStartNumber((prevStartNumber) => prevStartNumber + 3);
    }, 1000);
  };

  useEffect(() => {
    setHasMore(startNumber + 3 < list.length);
  }, [list, startNumber]);

  const navigate = useNavigate();

  return (
    <InfiniteScroll
      dataLength={printedList.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <Spinner
          animation="border"
          variant="dark"
          style={{
            position: "absolute",
            left: "50%",
          }}
        />
      }
      scrollThreshold={0.9}
    >
      <Container style={{ marginTop: "10em", marginBottom: "50px" }}>
        <SelectCategory category={category} setCategory={setCategory} />
        <Row xs={1} md={2} lg={3} className="g-5">
          {printedList.map((item) =>
            item.title.toLowerCase().includes(search.search.toLowerCase()) &&
            (item.category === category || category === "category") ? (
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
    </InfiniteScroll>
  );
}
