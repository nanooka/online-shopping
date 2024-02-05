// // import Dropdown from "react-bootstrap/Dropdown";
// // import DropdownButton from "react-bootstrap/DropdownButton";

// // function DropdownCategory() {
// //   return (
// //     <DropdownButton
// //       id="dropdown-basic-button"
// //       title="Categories"
// //       style={{ marginTop: "10em" }}
// //     >
// //       <Dropdown.Item href="#/Electronics">Electronics</Dropdown.Item>
// //       <Dropdown.Item href="#">Jewelery</Dropdown.Item>
// //       <Dropdown.Item href="#">Men's clothing</Dropdown.Item>
// //       <Dropdown.Item href="#">Women's clothing</Dropdown.Item>
// //     </DropdownButton>
// //   );
// // }

// // export default DropdownCategory;

// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";

// interface SelectCategoryProps {
//   list: {
//     image: string;
//     name: string;
//     price: number;
//     id: number;
//     rating: { rate: number; count: number };
//     category: string;
//     description: string;
//   }[];
// }

// const SelectCategory: React.FC<SelectCategoryProps> = ({ list }) => {
//   const [filteredItems, setFilteredItems] = useState(list);

//   function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
//     const selectedValue = event.target.value;

//     if (selectedValue === "Category") {
//       setFilteredItems(list);
//     } else {
//       const filteredList = list.filter(
//         (item) => item.category === selectedValue
//       );
//       setFilteredItems(filteredList);
//     }
//   }

//   return (
//     <Container>
//       <Form.Select
//         aria-label="Default select example"
//         style={{ marginTop: "10em", maxWidth: "300px" }}
//         onChange={handleSelect}
//       >
//         <option>Category</option>
//         <option value="electronics">Electronics</option>
//         <option value="jewelery">Jewelery</option>
//         <option value="men's clothing">Men's clothing</option>
//         <option value="women's clothing">Women's clothing</option>
//       </Form.Select>
//     </Container>
//   );
// };

// export default SelectCategory;

// SelectCategory.tsx
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

interface SelectCategoryProps {
  list: {
    image: string;
    name: string;
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
      // If "Category" is selected, show the entire list
      setFilteredItems(list);
    } else {
      // Filter the list based on the selected category
      const filteredList = list.filter(
        (item) => item.category === selectedValue
      );
      setFilteredItems(filteredList);
    }
  }

  return (
    <Container>
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
