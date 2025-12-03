import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="center-page">
            <h1 className="hero-title">
                Welcome to Veloura
            </h1>
            <p className="hero-subtitle">
                Discover the latest fashion trends for your unique style. Simple, elegant, and affordable.
            </p>
            <Link
                to="/products"
                className="btn btn-primary btn-large"
            >
                Shop Now
            </Link>
        </div>
    );
};

export default HomePage;
