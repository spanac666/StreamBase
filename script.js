// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navigation = document.querySelector('.navigacija1');
    
    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navigation.classList.toggle('active');
    });
    
    // Close menu when clicking on a link (mobile)
    const navLinks = document.querySelectorAll('.navigacija1 a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburgerBtn.classList.remove('active');
                navigation.classList.remove('active');
            }
        });
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            navigation.classList.remove('active');
        }
    });
    
    // Handle form submission (optional enhancement)
    const form = document.querySelector('.registracija form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add any form validation or processing here if needed
            console.log('Form submitted');
        });
    }
});
