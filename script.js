// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Simple animation for elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('section, .fea-box, .schools, .learning-item, .value-item, .team-member, .carousel-item').forEach(el => {
    el.classList.add('reveal-up');
    observer.observe(el);
});

// Countdown timer for registration
function updateCountdown() {
    const now = new Date();
    const targetDate = new Date('2026-12-31T23:59:59'); // Registration deadline
    const diff = targetDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.querySelector('.date:nth-child(1)').innerHTML = `${days}<br>Days`;
        document.querySelector('.date:nth-child(2)').innerHTML = `${hours}<br>Hours`;
        document.querySelector('.date:nth-child(3)').innerHTML = `${minutes}<br>Mins`;
        document.querySelector('.date:nth-child(4)').innerHTML = `${seconds}<br>Secs`;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navigation ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.navigation ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    darkModeToggle.textContent = body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', body.getAttribute('data-theme'));
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    darkModeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smart Navbar: Hide on scroll down, show on scroll up
let lastScrollTop = 0;
const navbar = document.querySelector('nav');
const scrollThreshold = 10;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ignore small scrolls
    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
    
    // Transparent to solid transition
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Carousel Functionality
let currentSlideIndex = 0;
let carouselPosition = 0;

function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// School Carousel Navigation
function moveCarousel(direction) {
    // Find the closest carousel-track to the clicked button
    const button = event.target;
    const carouselContainer = button.closest('.carousel-container');
    const track = carouselContainer.querySelector('.carousel-track');
    const items = track.querySelectorAll('.carousel-item');
    const wrapper = carouselContainer.querySelector('.carousel-wrapper');
    
    if (!track || items.length === 0) return;
    
    // Get current transform value
    const currentTransform = window.getComputedStyle(track).transform;
    let currentX = 0;
    
    if (currentTransform && currentTransform !== 'none') {
        const matrix = currentTransform.match(/matrix.*\((.+)\)/)[1].split(', ');
        currentX = parseFloat(matrix[4]) || 0;
    }
    
    // Calculate dimensions
    const itemWidth = items[0].offsetWidth + 32; // Include 2rem gap
    const containerWidth = wrapper.offsetWidth;
    const visibleItems = Math.floor(containerWidth / itemWidth);
    const maxScroll = (items.length - visibleItems) * itemWidth;
    
    // Calculate new position
    let newX = currentX - (direction * itemWidth);
    
    // Clamp position
    newX = Math.max(-maxScroll, Math.min(0, newX));
    
    // Apply transform
    track.style.transform = `translateX(${newX}px)`;
}
