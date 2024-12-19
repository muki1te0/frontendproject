import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import JeweleryPage from './pages/JeweleryPage';
import HomePage from './pages/HomePage'; 
import ProductDetails from './components/ProductDetails.js';
import WishlistPage from './components/WishlistPage.jsx';
import CartPage from './components/CartPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/jewelery" element={<JeweleryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
