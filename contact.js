document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic form validation
        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        simulateFormSubmission(name, email, message);
    });

    function simulateFormSubmission(name, email, message) {
        // In a real-world scenario, this would be an API call to your backend
        console.log('Form Submission Details:', { name, email, message });

        // Hide the form
        contactForm.style.display = 'none';

        // Show success message
        successMessage.style.display = 'block';

        // Optional: Reset form after successful submission
        contactForm.reset();

        // Optional: Automatically hide success message after some time
        setTimeout(() => {
            successMessage.style.display = 'none';
            contactForm.style.display = 'flex';
        }, 5000);
    }
});