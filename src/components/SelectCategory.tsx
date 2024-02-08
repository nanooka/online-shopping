import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { ProductType } from "../pages/Home";

interface SelectCategoryProps {
  list: Array<ProductType>;
  setFilteredItems: (value: Array<ProductType>) => void;
}

// const SelectCategory: React.FC<SelectCategoryProps> = ({
//   list,
//   setFilteredItems,
// }) => {
function SelectCategory({ list, setFilteredItems }: SelectCategoryProps) {
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;

    if (selectedValue === "Category") {
      setFilteredItems(list);
    } else {
      const filteredList = list.filter(
        (item) => item.category === selectedValue
      );
      setFilteredItems(filteredList);
    }
  }

  return (
    <Container className="mb-5">
      <Form.Select
        aria-label="Default select example"
        style={{ marginTop: "10em", maxWidth: "300px" }}
        onChange={handleSelect}
      >
        <option>Category</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
      </Form.Select>
    </Container>
  );
}

export default SelectCategory;
