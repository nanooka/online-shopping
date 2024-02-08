import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

interface SelectCategoryProps {
  list: {
    image: string;
    title: string;
    price: number;
    id: number;
    rating: { rate: number; count: number };
    category: string;
    description: string;
  }[];
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  list,
  setFilteredItems,
}) => {
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
};

export default SelectCategory;
