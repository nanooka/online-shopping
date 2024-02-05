// import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
// import SelectCategory from "./components/SelectCategory";

function App() {
  return (
    <>
      <Navbar />
      {/* <SelectCategory /> */}
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
