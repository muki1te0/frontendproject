import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  removeFromCart as removeUserCartItem,
} from '../redux/slices/userSlice';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import NavBar from './NavBar';
import AuthModal from './AuthModal';  

localStorage.removeItem("reviewsDB"); 
console.log("Reviews database has been reset!");


const randomNames = [
  "John Doe",
  "Jane Smith",
  "Chris Evans",
  "Emily Davis",
  "Michael Johnson",
  "Sophia Brown",
  "David Wilson",
  "Olivia Martinez",
  "Emma Garcia",
  "James Anderson",
];

const randomFeedback = [
  "Amazing product, highly recommend!",
  "Good quality, but a bit pricey.",
  "Exceeded my expectations!",
  "Not as described, very disappointed.",
  "Works great, would buy again!",
  "Fast shipping and excellent quality.",
  "Poor packaging, but the product is fine.",
  "Exactly what I was looking for.",
  "Five stars for this one!",
  "Terrible customer service.",
];

const generateMockReviews = (count) =>
  Array.from({ length: count }, () => ({
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
    review: randomFeedback[Math.floor(Math.random() * randomFeedback.length)],
  }));

const mockReviewsDB = JSON.parse(localStorage.getItem("reviewsDB")) || {
  2: { reviews: generateMockReviews(5) }, // Product ID 2 has 5 reviews
  4: { reviews: generateMockReviews(3) }, // Product ID 4 has 3 reviews
  15: { reviews: generateMockReviews(8) }, // Product ID 15 has 8 reviews
  // Add more products with random review counts
};
localStorage.setItem("reviewsDB", JSON.stringify(mockReviewsDB));

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // Mocked reviews list
  const [userRating, setUserRating] = useState(null); // Current user's rating
  const [userReview, setUserReview] = useState(''); // Current user's review
  const [randomRating, setRandomRating] = useState(0); // Random average rating
  const [totalReviews, setTotalReviews] = useState(0); // Total reviews count
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  // Mock database for reviews
  const mockReviewsDB = JSON.parse(localStorage.getItem('reviewsDB')) || {
    2: {
      reviews: [
        { name: 'John D.', rating: 5, review: 'Amazing quality!' },
        { name: 'Sarah L.', rating: 4, review: 'Great, but a bit expensive.' },
      ],
    },
    15: {
      reviews: [
        { name: 'Emily K.', rating: 5, review: 'Perfect for winter!' },
        { name: 'Tom P.', rating: 3, review: 'It\'s okay, but not warm enough.' },
      ],
    },
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product details:', err));
  }, [id]);

  useEffect(() => {
    let productReviews = mockReviewsDB[id]?.reviews;
  
    if (!productReviews) {
      // Generate random reviews and ratings if the product doesn't exist in the mock database
      productReviews = generateMockReviews(Math.floor(Math.random() * 10) + 1); // Random number of reviews (1-10)
      mockReviewsDB[id] = { reviews: productReviews };
      localStorage.setItem("reviewsDB", JSON.stringify(mockReviewsDB)); // Save to localStorage
    }
  
    setReviews(productReviews);
    const avgRating =
      productReviews.length > 0
        ? (
            productReviews.reduce((sum, r) => sum + r.rating, 0) /
            productReviews.length
          ).toFixed(1)
        : 0;
    setRandomRating(avgRating);
    setTotalReviews(productReviews.length);
  }, [id]);
  ;
  

  const handleCartToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    const isInCart =
      cartItems.some((item) => item.id === product.id) ||
      userInfo.cart.some((item) => item.id === product.id);

    if (isInCart) {
      dispatch(removeFromCart(product.id)); // Redux action for global cart
      dispatch(removeUserCartItem(product.id)); // User-specific cart
    } else {
      dispatch(addToCart(product)); // Redux action for global cart
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      ); // User-specific cart
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (userInfo.wishlist.some((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
    }
  };

  const handleReviewSubmit = () => {
    if (userRating && userReview) {
      const userName = isAuthenticated && userInfo.firstName && userInfo.lastName
        ? `${userInfo.firstName} ${userInfo.lastName}`
        : "Anonymous";
  
      const newReview = {
        name: userName, 
        rating: userRating,
        review: userReview,
      };
  
      const updatedReviews = [...(mockReviewsDB[id]?.reviews || []), newReview];
  
      mockReviewsDB[id] = { reviews: updatedReviews };
      localStorage.setItem("reviewsDB", JSON.stringify(mockReviewsDB));
  
      setReviews(updatedReviews);
      const avgRating =
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
      setRandomRating(avgRating.toFixed(1));
      setTotalReviews(updatedReviews.length);
  
      setUserRating(null);
      setUserReview("");
    }
  };
  
  
  

  if (!product) return <div>Loading...</div>;

  return (
    <>
    <NavBar />
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      {/* Product Image and Details */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-3/4 max-w-sm mx-auto lg:w-full lg:max-w-md h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
          <p className="text-lg font-medium text-gray-700">
            Average Rating: 
            <span className="text-yellow-500 ml-2">
              {'⭐'.repeat(Math.round(randomRating))}
            </span>
            <span className="ml-2">({totalReviews} reviews)</span>
          </p>
          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-4 mt-4">
          <button
              className={`py-3 px-6 rounded-lg font-semibold text-white ${
                cartItems.some((item) => item.id === product.id)
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={handleCartToggle}
            >
              {cartItems.some((item) => item.id === product.id)
                ? 'Remove from Cart'
                : 'Add to Cart'}
            </button>
            <button
              className={`py-3 px-6 rounded-lg font-semibold text-white ${
                !!userInfo.wishlist?.some((item) => item.id === product.id)
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
              onClick={handleWishlistToggle}
            >
              {!!userInfo.wishlist?.some((item) => item.id === product.id)
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Leave a Review</h3>
        <select
          value={userRating}
          onChange={(e) => setUserRating(Number(e.target.value))}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Rate this product</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value} Star{value > 1 && 's'}</option>
          ))}
        </select>
        <textarea
          placeholder="Write your review here..."
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-4 py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>

      {/* Customer Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-700">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <p className="font-semibold text-gray-900">{review.name}</p>
              <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))
        )}
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
