import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.items); // Access wishlist items from Redux
  const [filteredWishlist, setFilteredWishlist] = useState(wishlist); // Initial filtered list
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = wishlist.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredWishlist(filtered);
  };

  return (
    <>
      <NavBar onSearch={handleSearch} isListSearch={true} />
      <div className="p-6">
        {filteredWishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWishlist.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="border p-4 rounded shadow">
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
          <p className='text-center'>Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
