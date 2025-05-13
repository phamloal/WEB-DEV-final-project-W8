
document.addEventListener('DOMContentLoaded', () => {
    // Load categories
    loadCategories();
    
    // Load all products by default
    loadProducts('All');
    
    // Add event listener for sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Check if there's a category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        // Select the category from filter
        const categoryFilter = document.querySelector(`.category-filter[data-category="${categoryParam}"]`);
        if (categoryFilter) {
            // Simulate click on the category filter
            categoryFilter.click();
        } else {
            // If category doesn't exist, load all products
            loadProducts('All');
        }
    }
});

function loadCategories() {
    const categoryList = document.getElementById('category-filters');
    
    categories.forEach(category => {
        if (category === "All") return; // Skip "All" as it's already added in HTML
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#" class="category-filter" data-category="${category}">${category}</a>`;
        categoryList.appendChild(listItem);
    });
    
    // Add event listeners to category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Load products for selected category
            const category = filter.dataset.category;
            loadProducts(category);
        });
    });
}

function loadProducts(category) {
    const productsGrid = document.getElementById('products-grid');
    const productsCount = document.getElementById('products-count');
    const products = getProductsByCategory(category);
    
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No products found in this category.</p>';
        productsCount.textContent = 'No products found';
        return;
    }
    
    // Sort products based on current sort selection
    const sortSelect = document.getElementById('sort-select');
    const sortValue = sortSelect ? sortSelect.value : 'default';
    const sortedProducts = sortProducts(products, sortValue);
    
    sortedProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
    
    productsCount.textContent = `Showing ${sortedProducts.length} products`;
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products]; // Create a copy to avoid mutating the original array
    
    switch (sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return sortedProducts;
    }
}

function handleSort() {
    const sortSelect = document.getElementById('sort-select');
    const activeCategory = document.querySelector('.category-filter.active').dataset.category;
    
    loadProducts(activeCategory);
}
