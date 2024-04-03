import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import Cookies from "js-cookie";

interface CartItem {
  userId: string;
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { rate: number; count: number };
  category: string;
  description: string;
  quantity: number;
}

interface CartContextType {
  cartProducts: CartItem[];
  setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
  getCartProducts: (userID: string, token: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const getCartProducts = async (userID: string, token: string) => {
    if (!token && !userID) return;
    try {
      const requestData = {
        userId: userID,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/cart/userCart", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorite products");
      }
      const cartItems: CartItem[] = await response.json();
      setCartProducts(cartItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Call the function when the component mounts
    const userID = Cookies.get("userID");
    const token = localStorage.getItem("token");
    getCartProducts(userID, token);
  }, []); // Empty dependency array so it only runs once

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, getCartProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
