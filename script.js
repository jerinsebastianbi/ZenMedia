document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate Hamburger
            const bars = menuBtn.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'translateY(4px) rotate(45deg)';
                bars[1].style.transform = 'translateY(-4px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'translateY(0) rotate(0)';
                bars[1].style.transform = 'translateY(0) rotate(0)';
            }
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click

            // Reset hamburger
            const bars = menuBtn.querySelectorAll('.bar');
            if (bars.length === 2) {
                bars[0].style.transform = 'translateY(0) rotate(0)';
                bars[1].style.transform = 'translateY(0) rotate(0)';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar scroll interaction
    const navbar = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
            navbar.style.boxShadow = 'none';
        }
    });
});
