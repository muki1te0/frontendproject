import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const NavBar = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Added state for user dropdown
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const filterDropdownRef = useRef(null);

  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) onSearch(event.target.value);
  };

  const handleFilterApply = () => {
    if (onFilter) onFilter({ category, priceRange });
    setIsFilterDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle user dropdown menu
  const toggleUserDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
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
      {onSearch && (
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded p-2 text-black"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      )}

      {/* Filters */}
      {onFilter && (
        <div ref={filterDropdownRef} className="relative">
          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-8"
          >
            Filters
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white text-black rounded shadow-md p-4 w-64 z-50" 
            style={{
              right: 0, // Align dropdown to the right edge of the button
              maxWidth: '90vw', // Ensure it doesn't overflow
              overflowX: 'hidden', // Prevent horizontal scrolling
              boxSizing: 'border-box',
            }}
            >
              <div className="mb-4">
                <label className="block font-bold mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="all">All</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                  <option value="jewelery">Jewelry</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                    }
                    placeholder="Min"
                    className="w-1/2 p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value) || 0])
                    }
                    placeholder="Max"
                    className="w-1/2 p-2 border rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={handleFilterApply}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Authentication */}
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
              onClick={toggleUserDropdown}
            >
              <img
                src={userInfo?.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{userInfo?.username}</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-black rounded-md shadow-lg">
                <button
                  onClick={() => navigate("/account")}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Account
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-200"
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
