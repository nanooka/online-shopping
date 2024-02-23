import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import Product from "../pages/Product";

type FavoriteProviderProps = {
  children: ReactNode;
};

type FavoriteItem = {
  id: number;
  name: string;
  // Add more properties as needed
};

type FavoriteContextType = {
  favorites: FavoriteItem[];
  isLoved: boolean;
  setIsLoved: (value: boolean) => void;
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorite() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    "favorites",
    []
  );
  const [isLoved, setIsLoved] = useState(false);

  useEffect(() => {
    // Retrieve favorites from localStorage on component mount
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, [setFavorites]);

  useEffect(() => {
    // Store favorites in localStorage whenever it changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    if (!favorites.some((favorite) => favorite.id === item.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
    setIsLoved(true);
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
    setIsLoved(false);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        isLoved,
        setIsLoved,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
