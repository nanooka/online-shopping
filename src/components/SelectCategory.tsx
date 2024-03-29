import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

interface SelectCategoryProps {
  category: string;
  setCategory: (value: string) => void;
}

function SelectCategory({ category, setCategory }: SelectCategoryProps) {
  return (
    <Container className="mb-5">
      <Form.Select
        className="select"
        aria-label="Default select example"
        style={{ marginTop: "10em", maxWidth: "300px" }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="category">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
      </Form.Select>
    </Container>
  );
}

export default SelectCategory;
