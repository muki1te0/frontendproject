import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct, getProducts } from '../redux/slices/productsSlice';
import NavBar from '../components/NavBar';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '' });
  const [reviews, setReviews] = useState([]);
  const [productIdForReviews, setProductIdForReviews] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCreate = () => {
    const newId = Date.now();
    const productToAdd = { id: newId, ...newProduct };
    dispatch(addProduct(productToAdd));
    setNewProduct({ title: '', price: '', description: '', image: '' });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSave = () => {
    dispatch(updateProduct(selectedProduct));
    setSelectedProduct(null);
  };

  const fetchReviews = (productId) => {
    setProductIdForReviews(productId);
    const reviewsDB = JSON.parse(localStorage.getItem('reviewsDB')) || {};
    setReviews(reviewsDB[productId]?.reviews || []);
  };

  const deleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    const reviewsDB = JSON.parse(localStorage.getItem('reviewsDB')) || {};
    reviewsDB[productIdForReviews] = { reviews: updatedReviews };
    localStorage.setItem('reviewsDB', JSON.stringify(reviewsDB));
    setReviews(updatedReviews);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        { }
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Title</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-200 px-4 py-2">{product.title}</td>
                  <td className="border border-gray-200 px-4 py-2">${product.price}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-green-500 hover:underline ml-4"
                      onClick={() => fetchReviews(product.id)}
                    >
                      Moderate Reviews
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        { }
        {productIdForReviews && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reviews for Product {productIdForReviews}</h2>
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="border p-4 rounded mb-4 flex justify-between">
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p>{review.review}</p>
                  </div>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => deleteReview(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        { }
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {selectedProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              selectedProduct ? handleSave() : handleCreate();
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={selectedProduct ? selectedProduct.title : newProduct.title}
              onChange={(e) =>
                selectedProduct
                  ? setSelectedProduct({ ...selectedProduct, title: e.target.value })
                  : setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="number"
              placeholder="Price"
              value={selectedProduct ? selectedProduct.price : newProduct.price}
              onChange={(e) =>
                selectedProduct
                  ? setSelectedProduct({ ...selectedProduct, price: e.target.value })
                  : setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <textarea
              placeholder="Description"
              value={selectedProduct ? selectedProduct.description : newProduct.description}
              onChange={(e) =>
                selectedProduct
                  ? setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  : setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={selectedProduct ? selectedProduct.image : newProduct.image}
              onChange={(e) =>
                selectedProduct
                  ? setSelectedProduct({ ...selectedProduct, image: e.target.value })
                  : setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              {selectedProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
