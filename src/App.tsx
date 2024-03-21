import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import { useState } from "react";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Favorites from "./pages/Favorites";
import { FavoriteProvider } from "./context/FavoriteContext";

function App() {
  const [search, setSearch] = useState("");

  return (
    <ShoppingCartProvider>
      <FavoriteProvider>
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:product" element={<Product />} />
        </Routes>
      </FavoriteProvider>
    </ShoppingCartProvider>
  );
}

export default App;
