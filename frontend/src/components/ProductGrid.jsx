import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    if (!products || products.length === 0) {
        return <div className="loading">No products found.</div>;
    }

    return (
        <div className="grid grid-4">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
