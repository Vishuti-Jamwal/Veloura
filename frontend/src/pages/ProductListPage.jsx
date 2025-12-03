import { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await API.get('/products', {
                    params: {
                        search,
                        category,
                        sort,
                        page,
                    },
                });
                setProducts(data.products);
                setPages(data.pages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, category, sort, page]);

    return (
        <div className="container">
            <h1>Shop Our Collection</h1>

            <FilterBar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
            />

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <ProductGrid products={products} />
                    <Pagination page={page} pages={pages} setPage={setPage} />
                </>
            )}
        </div>
    );
};

export default ProductListPage;
