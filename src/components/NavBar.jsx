import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch, isListSearch = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <header className="p-4 bg-gray-800 text-white text-lg font-bold flex justify-between items-center">
      <Link to="/" className="text-4xl font-bold pr-5">Carry</Link>

      <nav className="flex gap-6">
        {!isListSearch && (
          <>
            <Link to="/men" className="hover:text-gray-400">Men</Link>
            <Link to="/women" className="hover:text-gray-400">Women</Link>
            <Link to="/jewelery" className="hover:text-gray-400">Jewelery</Link>
          </>
        )}
      </nav>

      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded p-2 text-black"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/wishlist" className="hover:text-gray-400">Wishlist</Link>
        <Link to="/cart" className="hover:text-gray-400">Cart</Link>
        <button className="hover:text-gray-400">Login</button>
        <button className="hover:text-gray-400">Signup</button>
      </div>
    </header>
  );
};

export default NavBar;
