
document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProductDetail(productId);
    } else {
        // Redirect to products page if no ID provided
        window.location.href = 'products.html';
    }
});

function loadProductDetail(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        // Product not found, redirect to products page
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title and breadcrumb
    document.title = `${product.name} | TechTrove`;
    document.getElementById('product-breadcrumb').textContent = product.name;
    
    // Render product detail
    const productDetailContainer = document.getElementById('product-detail-container');
    
    productDetailContainer.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.category}</div>
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-detail-description">${product.description}</div>
            
            <div class="quantity-selector">
                <button class="quantity-btn" id="decrease-quantity">-</button>
                <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="10">
                <button class="quantity-btn" id="increase-quantity">+</button>
            </div>
            
            <div class="product-detail-actions">
                <button id="add-to-cart-btn" class="btn btn-primary">Add to Cart</button>
                <button id="buy-now-btn" class="btn btn-accent">Buy Now</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    
    // Quantity controls
    decreaseBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    });
    
    // Add to cart button
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCartWithQuantity(product.id, quantity);
    });
    
    // Buy now button
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCartWithQuantity(product.id, quantity);
        window.location.href = 'cart.html';
    });
    
    // Load related products
    loadRelatedProducts(productId, product.category);
}

function addToCartWithQuantity(productId, quantity) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    showAddToCartFeedback(`${quantity} × ${product.name}`);
}

function loadRelatedProducts(productId, category) {
    const relatedContainer = document.getElementById('related-products');
    const relatedProducts = getRelatedProducts(productId, category);
    
    relatedContainer.innerHTML = '';
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    relatedProducts.forEach(product => {
        relatedContainer.appendChild(createProductCard(product));
    });
}
