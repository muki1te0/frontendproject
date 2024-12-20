import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import JewelryPage from "./pages/JewelryPage";
import ProductDetails from "./components/ProductDetails";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SignLog from "./components/SignLog";
import AccountPage from "./pages/AccountPage";
import { loadUserFromStorage } from "./redux/slices/userSlice";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<SignLog />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <Footer /> {/* Добавляем футер */}
      </div>
    </Router>
  );
};

export default App;
