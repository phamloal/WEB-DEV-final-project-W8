
// Global variables
let cart = [];
const CART_STORAGE_KEY = 'techtrove_cart';

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const cartCountElement = document.getElementById('cart-count');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// Functions
function initApp() {
    loadCart();
    updateCartCount();
    
    // Load featured products on homepage
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        loadFeaturedProducts();
    }
}

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Toggle the bars to form an X
    const bars = mobileMenuBtn.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        // Simulating successful subscription
        newsletterMessage.textContent = 'Thank you for subscribing!';
        newsletterMessage.classList.add('success');
        emailInput.value = '';
        
        // Reset message after 3 seconds
        setTimeout(() => {
            newsletterMessage.textContent = '';
            newsletterMessage.classList.remove('success');
        }, 3000);
    } else {
        newsletterMessage.textContent = 'Please enter a valid email address';
        newsletterMessage.classList.add('error');
        
        // Reset message after 3 seconds
        setTimeout(() => {
            newsletterMessage.textContent = '';
            newsletterMessage.classList.remove('error');
        }, 3000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Product functions
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    const featuredProducts = getFeaturedProducts();
    
    featuredContainer.innerHTML = '';
    
    featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <a href="product-detail.html?id=${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
            </div>
        </a>
        <div class="product-actions">
            <button class="btn btn-primary full-width add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to Add to Cart button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product.id);
    });
    
    return card;
}

// Cart functions
function loadCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}

function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    showAddToCartFeedback(product.name);
}

function showAddToCartFeedback(productName) {
    // Create a feedback element
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.innerHTML = `<p>${productName} added to cart!</p>`;
    
    // Style the feedback element
    Object.assign(feedback.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'var(--success)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Add to body
    document.body.appendChild(feedback);
    
    // Trigger animation
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}
