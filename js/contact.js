
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');
    
    // Validate form
    if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
        formMessage.textContent = 'Please fill in all fields';
        formMessage.classList.add('error');
        return;
    }
    
    if (!validateEmail(emailInput.value.trim())) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.classList.add('error');
        return;
    }
    
    // In a real app, this would send the form data to a server
    // For demo purposes, simulate a successful submission
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate server request with a timeout
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
        }, 5000);
    }, 1500);
}
