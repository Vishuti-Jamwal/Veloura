import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axiosInstance';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="loading">Product not found</div>;

    return (
        <div className="container">
            <Link to="/products" className="back-link">
                &larr; Back to Products
            </Link>
            <div className="product-details-grid">
                <div className="product-image-container">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                    />
                </div>
                <div>
                    <h1>{product.name}</h1>
                    <p className="card-product-price">${product.price}</p>
                    <div className="product-info-section">
                        <h3 className="product-info-label">Category</h3>
                        <p className="product-info-text">{product.category}</p>
                    </div>
                    <div className="product-info-section">
                        <h3 className="product-info-label">Description</h3>
                        <p className="product-description">{product.description}</p>
                    </div>
                    <button className="btn btn-primary btn-block btn-large">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
