import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.user.userInfo.wishlist || []);

  console.log("Wishlist items:", wishlist);

  return (
    <>
      <NavBar />
      <div className="p-6">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="border p-4 rounded shadow">
                  <img
                    src={item.image || "/default-image.png"}
                    alt={item.title || "Unnamed Item"}
                    className="h-48 w-full object-contain mb-4"
                  />
                  <h3 className="font-bold">{item.title || "Untitled Item"}</h3>
                  <p>${item.price || "0.00"}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
