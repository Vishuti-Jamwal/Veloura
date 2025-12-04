import { useState, useEffect } from 'react';
import API from '../api/axiosInstance';

const AdminDashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
    });
    const [editingId, setEditingId] = useState(null);

    const fetchProducts = async () => {
        try {
            // Fetching all products for simplicity, or could paginate
            const { data } = await API.get('/products?limit=100');
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price), // Ensure price is a number
            };

            if (editingId) {
                await API.put(`/products/${editingId}`, payload);
            } else {
                await API.post('/products', payload);
            }
            setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
            setEditingId(null);
            fetchProducts(); // Refresh list
        } catch (error) {
            console.error(error);
            alert('Error saving product');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
        });
        setEditingId(product._id || product.id); // Handle both _id and id if necessary
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/products/${id}`);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error(error);
                alert('Error deleting product');
            }
        }
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>

            {/* Form */}
            <div className="admin-form">
                <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="textarea"
                    ></textarea>
                    <div className="admin-form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {editingId ? 'Update Product' : 'Add Product'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
                                }}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <div className="admin-product-cell">
                                        <img className="admin-product-img" src={product.imageUrl} alt="" />
                                        <div className="admin-product-name">{product.name}</div>
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="btn-link"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn-link btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
