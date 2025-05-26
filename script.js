// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add animation on scroll for features
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .tech-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.querySelectorAll('.feature-card, .step, .tech-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    navbar.appendChild(mobileMenuBtn);
};

// Add mobile menu styles
const addMobileStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
                background: none;
                border: none;
                color: var(--primary-color);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--white);
                padding: 1rem;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .nav-links.show {
                display: flex;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-btn {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize mobile menu
createMobileMenu();
addMobileStyles();

// Add loading animation for tech stack images
document.querySelectorAll('.tech-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease-in';
    });
});

// Add hover effect for download button
const downloadBtn = document.querySelector('.download-button');
if (downloadBtn) {
    downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.transform = 'scale(1.05)';
    });
    
    downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.transform = 'scale(1)';
    });
} 