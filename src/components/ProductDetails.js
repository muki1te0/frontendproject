import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} from '../redux/slices/userSlice';
import { addToCart } from '../redux/slices/cartSlice';
import NavBar from './NavBar';
import AuthModal from './AuthModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product details:', err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isInCart =
  Array.isArray(userInfo.cart) &&
  userInfo.cart.some((item) => item.id === product.id);
  const isInWishlist = userInfo.wishlist.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }));
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 h-auto object-cover rounded"
          />
          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-gray-900">${product.price}</p>
            <div className="flex gap-4">
              <button
                className={`py-2 px-4 rounded ${
                  isInCart
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={handleCartToggle}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  isInWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => {
          setIsAuthModalOpen(false);
          window.location.href = '/auth';
        }}
        onSignup={() => {
          setIsAuthModalOpen(false);
          window.location.href = '/auth';
        }}
      />
    </>
  );
};

export default ProductDetails;
