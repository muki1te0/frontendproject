import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 1000],
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (product) => product.category !== "electronics"
        );
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSearch = (query) => {
    applyFilters(query, filters);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters); // Ensure searchQuery is used along with filters
  };

  const applyFilters = (query, currentFilters) => {
    const lowerCaseQuery = query.toLowerCase();

    const filtered = products.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery);

      const matchesCategory =
        currentFilters.category === "all" ||
        product.category === currentFilters.category;

      const matchesPrice =
        product.price >= currentFilters.priceRange[0] &&
        product.price <= currentFilters.priceRange[1];

      return matchesQuery && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  return (
    <>
      <NavBar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="border p-4 rounded shadow card">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mb-4"
              />
              <h3 className="font-bold">{product.title}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
