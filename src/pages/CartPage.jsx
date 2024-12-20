import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import NavBar from "../components/NavBar";
import axios from "axios";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState(
    cartItems.map((item) => item.id)
  );
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [deliveryMethods] = useState([
    { id: 1, name: "Taxi", price: 5.0 },
    { id: 2, name: "Plane", price: 20.0 },
    { id: 3, name: "Train", price: 10.0 },
  ]);
  const [selectedSizes, setSelectedSizes] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = "";
      return acc;
    }, {})
  );

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const allSelected = selectedItems.length === cartItems.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=6"
        );
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
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
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const totalSelected = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );
  const totalQuantity = totalSelected.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = totalSelected.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleBuyNow = () => {
    setShowOrderDetails(true);
  };

  const goToNextItem = () => {
    if (currentIndex < selectedItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finalTotalPrice = selectedDeliveryMethod
    ? totalPrice + selectedDeliveryMethod.price
    : totalPrice;

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const isSizeSelected = totalSelected.every(
    (item) => selectedSizes[item.id] !== ""
  );

  const isDeliveryMethodSelected = selectedDeliveryMethod !== null;

  const [savedTotalPrice, setSavedTotalPrice] = useState(0);
  const handleConfirmOrder = () => {
    setSavedTotalPrice(finalTotalPrice);
    selectedItems.forEach((id) => {
      dispatch(removeFromCart(id));
    });
    setSelectedItems([]);
    setShowOrderDetails(false);
    setOrderConfirmed(true);
  };

  return (
    <>
      <NavBar />
      {orderConfirmed && (
        <div className="mt-6 p-4 bg-green-200 rounded-lg">
          <h3 className="font-bold text-xl">Delivery Accepted</h3>
          <p className="mt-2">Total Bill: ${savedTotalPrice.toFixed(2)}</p>
          <p>Your order is confirmed. Thank you for shopping with us!</p>
        </div>
      )}
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold mb-4">Cart</h1>
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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="chooseDiv flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 mb-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectionChange(item.id)}
                  className="mr-4"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      disabled={item.quantity === 1}
                      className="p-2 border rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="p-2 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`size-${item.id}`} className="mr-2">
                      Select Size:
                    </label>
                    <select
                      id={`size-${item.id}`}
                      value={selectedSizes[item.id] || ""}
                      onChange={(e) =>
                        handleSizeChange(item.id, e.target.value)
                      }
                      className="p-2 border rounded-lg"
                    >
                      <option value="">Select Size</option>
                      <option value="S">Small</option>
                      <option value="M">Medium</option>
                      <option value="L">Large</option>
                      <option value="XL">X-Large</option>
                    </select>
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
          <div className="totalPriceDiv w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Total Price</h2>
            <div className="flex justify-between mb-4">
              <span>Goods:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Delivery Method</h3>
              <div>
                {deliveryMethods.map((method) => (
                  <label key={method.id} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method.id}
                      checked={selectedDeliveryMethod?.id === method.id}
                      onChange={() => setSelectedDeliveryMethod(method)}
                      className="mr-2"
                    />
                    {method.name} (${method.price.toFixed(2)})
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={
                totalQuantity === 0 ||
                !isSizeSelected ||
                !isDeliveryMethodSelected
              }
              className={`w-full py-3 text-white rounded-lg ${
                totalQuantity === 0 ||
                !isSizeSelected ||
                !isDeliveryMethodSelected
                  ? "bg-gray-400"
                  : "bg-green-500"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>

        {showOrderDetails && (
          <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div>
                  <p className="font-bold text-center text-lg">
                    {totalSelected[currentIndex]?.title}
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <img
                    src={totalSelected[currentIndex]?.image}
                    alt={totalSelected[currentIndex]?.name}
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="font-bold text-lg">
                    ${totalSelected[currentIndex]?.price.toFixed(2)}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Select Size</h3>
                  <select
                    value={selectedSizes[totalSelected[currentIndex]?.id] || ""}
                    onChange={(e) =>
                      handleSizeChange(
                        totalSelected[currentIndex]?.id,
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">X-Large</option>
                  </select>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={goToPreviousItem}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextItem}
                    disabled={currentIndex === totalSelected.length - 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total Price:</span>
                  <span>${finalTotalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-3 text-white bg-green-500 rounded-lg mb-4"
                >
                  Confirm Order
                </button>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="w-full py-3 text-white bg-red-500 rounded-lg"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </>
        )}
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
                  onClick={() =>
                    dispatch({ type: "cart/addToCart", payload: item })
                  }
                  className="w-full py-2 bg-blue-500 text-white rounded-lg"
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
