import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import JewelryPage from "./pages/JewelryPage";
import ProductDetails from "./components/ProductDetails";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SignLog from "./components/SignLog";
import { loadUserFromStorage } from "./redux/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/jewelry" element={<JewelryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<SignLog />} />
      </Routes>
    </Router>
  );
};

export default App;
