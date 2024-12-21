import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} from "../redux/slices/userSlice";
import { addToCart } from "../redux/slices/cartSlice";
import NavBar from "./NavBar";
import AuthModal from "./AuthModal";

const randomNames = [
  "John Doe",
  "Jane Smith",
  "Chris Evans",
  "Emily Davis",
  "Michael Johnson",
];
const randomFeedback = [
  "Amazing product, highly recommend!",
  "Good quality, but a bit pricey.",
  "Exceeded my expectations!",
  "Not as described, very disappointed.",
  "Works great, would buy again!",
];
const generateMockReviews = (count) =>
  Array.from({ length: count }, () => ({
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    review: randomFeedback[Math.floor(Math.random() * randomFeedback.length)],
  }));

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const existingProduct = products.find(
      (item) => item.id === parseInt(id, 10)
    );
    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product details:", err));
    }
  }, [id, products]);

  useEffect(() => {
    const mockReviewsDB = JSON.parse(localStorage.getItem("reviewsDB")) || {};
    const productReviews = mockReviewsDB[id]?.reviews || generateMockReviews(5);
    mockReviewsDB[id] = { reviews: productReviews }; // Save reviews in localStorage
    localStorage.setItem("reviewsDB", JSON.stringify(mockReviewsDB));
    setReviews(productReviews);

    const avgRating =
      productReviews.reduce((sum, r) => sum + r.rating, 0) /
      productReviews.length;
    setAverageRating(avgRating.toFixed(1));
  }, [id]);

  const handleCartToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (userInfo.cart.some((item) => item.id === product.id)) {
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
      const userName =
        isAuthenticated && userInfo.firstName && userInfo.lastName
          ? `${userInfo.firstName} ${userInfo.lastName}`
          : "Anonymous";
      const newReview = { name: userName, rating: userRating, review: userReview };
      const updatedReviews = [...reviews, newReview];
      const mockReviewsDB = JSON.parse(localStorage.getItem("reviewsDB")) || {};
      mockReviewsDB[id] = { reviews: updatedReviews };
      localStorage.setItem("reviewsDB", JSON.stringify(mockReviewsDB));
      setReviews(updatedReviews);

      const avgRating =
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
        updatedReviews.length;
      setAverageRating(avgRating.toFixed(1));

      setUserRating(null);
      setUserReview("");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-3/4 max-w-sm mx-auto lg:w-full lg:max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
            <p className="text-lg font-medium text-gray-700">
              Average Rating:{" "}
              <span className="text-yellow-500 ml-2">
                {"⭐".repeat(Math.round(averageRating))}
              </span>
              <span className="ml-2">({reviews.length} reviews)</span>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCartToggle}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {userInfo.cart.some((item) => item.id === product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlistToggle}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                {userInfo.wishlist.some((item) => item.id === product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Leave a Review</h3>
          <select
            value={userRating}
            onChange={(e) => setUserRating(Number(e.target.value))}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Rate this product</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} Star{value > 1 && "s"}
              </option>
            ))}
          </select>
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Write your review here..."
            className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-4 py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-700">No reviews yet. Be the first to write one!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-yellow-500">{`⭐`.repeat(review.rating)}</p>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => setIsAuthModalOpen(false)}
        onSignup={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default ProductDetails;
