import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ProductType } from "../pages/Home";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../functions/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [list, setList] = useState<Array<ProductType>>([]);
  // const [total, setTotal] = useState("0");

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setList(data);
    }
    fetchItems();
  }, []);

  const item = list.find((i) => i.id === id);
  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.image}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.title}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{ fontSize: ".65rem", marginLeft: ".5rem" }}
            >
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item?.price)}
        </div>
      </div>
      <div>{formatCurrency(item?.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item?.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
