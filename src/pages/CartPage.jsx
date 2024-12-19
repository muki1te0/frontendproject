import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((state) => state.user.userInfo.cart || []);

  return (
    <>
      <NavBar />
      <div className="p-6">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cart.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div key={item.id} className="border p-4 rounded shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-contain mb-4"
                  />
                  <h3 className="font-bold">{item.title}</h3>
                  <p>${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default CartPage;
