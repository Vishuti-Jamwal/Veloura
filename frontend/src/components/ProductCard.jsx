import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card-product">
            <div>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-product-img"
                />
            </div>
            <div className="card-product-body">
                <h3 className="card-product-category">{product.category}</h3>
                <Link to={`/products/${product._id}`}>
                    <h2 className="card-product-title">
                        {product.name}
                    </h2>
                </Link>
                <p className="card-product-price">${product.price}</p>
                <Link
                    to={`/products/${product._id}`}
                    className="btn btn-block"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
