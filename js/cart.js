
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    
    // Add event listener for checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        cartEmptyMessage.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        return;
    }
    
    cartEmptyMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    
    let cartHTML = '';
    
    cart.forEach(item => {
        const product = getProductById(item.id);
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <p class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Add event listeners to quantity buttons and remove buttons
    const decreaseBtns = document.querySelectorAll('.decrease-btn');
    const increaseBtns = document.querySelectorAll('.increase-btn');
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    const removeBtns = document.querySelectorAll('.remove-item');
    
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => decreaseQuantity(btn.dataset.id));
    });
    
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => increaseQuantity(btn.dataset.id));
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => updateQuantity(input.dataset.id, input.value));
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
    
    // Update cart summary
    updateCartSummary();
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === parseInt(productId));
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === parseInt(productId));
    
    if (item && item.quantity < 10) {
        item.quantity += 1;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === parseInt(productId));
    
    if (item) {
        const newQuantity = parseInt(quantity);
        
        if (newQuantity >= 1 && newQuantity <= 10) {
            item.quantity = newQuantity;
        } else if (newQuantity < 1) {
            item.quantity = 1;
        } else {
            item.quantity = 10;
        }
        
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === parseInt(productId));
    
    if (index !== -1) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCart();
        
        // Show feedback
        showRemoveFromCartFeedback(removedItem.name);
    }
}

function showRemoveFromCartFeedback(productName) {
    // Create a feedback element
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.innerHTML = `<p>${productName} removed from cart</p>`;
    
    // Style the feedback element
    Object.assign(feedback.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#f97316', // Orange color
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

function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function handleCheckout() {
    // In a real app, this would navigate to a checkout page
    alert('This would proceed to checkout in a real app');
    
    // For demo purposes, we'll clear the cart
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    
    // Show success message
    const feedback = document.createElement('div');
    feedback.className = 'checkout-feedback';
    feedback.innerHTML = `
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with TechTrove.</p>
    `;
    
    // Style the feedback element
    Object.assign(feedback.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        width: '90%',
        maxWidth: '400px'
    });
    
    // Add to body
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}
