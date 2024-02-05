// import { useEffect, useState } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import StoreProduct from "../components/StoreProduct";
// import { useNavigate } from "react-router-dom";
// import SelectCategory from "../components/SelectCategory";

// export default function Home() {
//   const [list, setList] = useState<
//     Array<{
//       image: string;
//       name: string;
//       price: number;
//       id: number;
//       rating: { rate: number; count: number };
//       category: string;
//       description: string;
//     }>
//   >([]);

//   useEffect(function () {
//     async function fetchItems() {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       console.log(data);

//       const itemData = data.map(
//         (item: {
//           image: string;
//           title: string;
//           price: number;
//           id: number;
//           rating: { rate: number; count: number };
//           category: string;
//           description: string;
//         }) => ({
//           image: item.image,
//           name: item.title,
//           price: item.price,
//           id: item.id,
//           rating: item.rating,
//           category: item.category,
//           description: item.description,
//         })
//       );
//       setList(itemData);
//     }
//     fetchItems();
//   }, []);

//   const navigate = useNavigate();

//   return (
//     <Container style={{ marginTop: "10em" }}>
//       <SelectCategory list={list} />
//       <Row xs={1} md={2} lg={3} className="g-5">
//         {list?.map((item) => (
//           <Col
//             key={item.id}
//             onClick={() => navigate(`/${item.id}`, { state: { item } })}
//           >
//             <StoreProduct {...item} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import { useNavigate } from "react-router-dom";
import SelectCategory from "../components/SelectCategory";

export default function Home() {
  const [list, setList] = useState<
    Array<{
      image: string;
      name: string;
      price: number;
      id: number;
      rating: { rate: number; count: number };
      category: string;
      description: string;
    }>
  >([]);

  const [filteredItems, setFilteredItems] = useState(list);

  useEffect(() => {
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
          category: string;
          description: string;
        }) => ({
          image: item.image,
          name: item.title,
          price: item.price,
          id: item.id,
          rating: item.rating,
          category: item.category,
          description: item.description,
        })
      );
      setList(itemData);
      setFilteredItems(itemData); // Initialize filteredItems with the entire list
    }
    fetchItems();
  }, []);

  const navigate = useNavigate();

  return (
    <Container style={{ marginTop: "10em" }}>
      <SelectCategory list={list} setFilteredItems={setFilteredItems} />
      <Row xs={1} md={2} lg={3} className="g-5">
        {filteredItems?.map((item) => (
          <Col
            key={item.id}
            onClick={() => navigate(`/${item.id}`, { state: { item } })}
          >
            <StoreProduct {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
