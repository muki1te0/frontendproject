import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const JeweleryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error('Error fetching Jewelery products:', err));
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
        <NavBar onSearch={handleSearch} />
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
            {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <div key={product.id} className="border p-4 rounded shadow card">
                        <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
                        <h3 className="font-bold">{product.title}</h3>
                        <p className="text-gray-500">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    </>
    
  );
};

export default JeweleryPage;
