import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Retrieve favorites from localStorage on component mount
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    // Store favorites in localStorage whenever it changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
