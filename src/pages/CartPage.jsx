import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import NavBar from '../components/NavBar';
import axios from 'axios';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState(cartItems.map((item) => item.id));
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const allSelected = selectedItems.length === cartItems.length;

  // Fetch recommended products from the API
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=6');
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };
    fetchRecommendedProducts();
  }, []);

  const removeSelectedItems = () => {
    selectedItems.forEach((id) => dispatch(removeFromCart(id)));
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleSelectionChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id) // Deselect item
        : [...prevSelected, id] // Select item
    );
  };

  const totalSelected = cartItems.filter((item) => selectedItems.includes(item.id));
  const totalQuantity = totalSelected.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = totalSelected.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold mb-4">Cart</h1>
        {/* Select All and Delete Selected Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <span>Choose All</span>
            <button
              onClick={removeSelectedItems}
              className="ml-4 text-red-500 hover:underline"
            >
              Remove selected item
            </button>
          </div>
        </div>
        {/* Cart Items and Summary */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4 mb-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectionChange(item.id)}
                  className="mr-4"
                />
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      disabled={item.quantity === 1}
                      className="p-2 border rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="p-2 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Total Price</h2>
            <div className="flex justify-between mb-4">
              <span>Goods:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              disabled={totalQuantity === 0}
              className={`w-full py-3 text-white rounded-lg ${
                totalQuantity === 0 ? 'bg-gray-400' : 'bg-green-500'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
        {/* Recommended Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg">
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 mb-4">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => dispatch({ type: 'cart/addToCart', payload: item })}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
