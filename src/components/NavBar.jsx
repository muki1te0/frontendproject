import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const NavBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold pr-8">
        Carry
      </Link>

      {/* Categories */}
      <nav className="flex gap-6">
        <Link to="/men" className="hover:text-gray-400">
          Men
        </Link>
        <Link to="/women" className="hover:text-gray-400">
          Women
        </Link>
        <Link to="/jewelry" className="hover:text-gray-400">
          Jewelry
        </Link>
      </nav>

      {/* Search Box */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded p-2 text-black"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Authentication & Dropdown */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/auth")}
              className="hover:text-gray-400"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="hover:text-gray-400"
            >
              Signup
            </button>
          </>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={user?.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user?.username}</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-black rounded-md shadow-lg">
                <button
                  onClick={() => navigate("/account")}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
