const FilterBar = ({ search, setSearch, category, setCategory, sort, setSort }) => {
    return (
        <div className="filter-bar">
            <div className="filter-bar-desktop">
                {/* Search */}
                <div className="filter-search">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input"
                    />
                </div>

                <div className="filter-controls">
                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select"
                    >
                        <option value="All">All Categories</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Accessories">Accessories</option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="select"
                    >
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
