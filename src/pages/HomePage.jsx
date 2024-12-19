import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Exclude electronics
        const filteredData = data.filter(
          (product) => product.category !== 'electronics'
        );
        setProducts(filteredData);
        setFilteredProducts(filteredData); // Initialize filtered products
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <NavBar 
      onSearch={handleSearch}
      // user={user}
      // onLogout={handleLogout}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div key={product.id} className="border p-4 rounded shadow card">
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
