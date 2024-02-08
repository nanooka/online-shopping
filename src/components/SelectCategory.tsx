import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import { ProductType } from "../pages/Home";

interface SelectCategoryProps {
  category: string;
  setCategory: (value: string) => void;
}

function SelectCategory({ category, setCategory }: SelectCategoryProps) {
  console.log("selectCategory", category);
  return (
    <Container className="mb-5">
      <Form.Select
        aria-label="Default select example"
        style={{ marginTop: "10em", maxWidth: "300px" }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="category">Category</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
      </Form.Select>
    </Container>
  );
}

export default SelectCategory;
// hehehehehehe
