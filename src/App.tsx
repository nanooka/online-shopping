// import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
// import { SetStateAction, useState } from "react";
// import SelectCategory from "./components/SelectCategory";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  console.log("App", search);

  return (
    <>
      {/* <Navbar search={search} setSearch={setSearch} /> */}
      {/* <Navbar onSubmit={(value: SetStateAction<string>) => setSearch(value)} /> */}
      {/* <SelectCategory /> */}
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
