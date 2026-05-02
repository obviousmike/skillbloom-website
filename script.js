// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
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

        const dateElements = document.querySelectorAll('.date');
        if (dateElements.length >= 4) {
            dateElements[0].innerHTML = `${days}<br>Days`;
            dateElements[1].innerHTML = `${hours}<br>Hours`;
            dateElements[2].innerHTML = `${minutes}<br>Mins`;
            dateElements[3].innerHTML = `${seconds}<br>Secs`;
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Hamburger menu toggle — Drawer Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navigation ul');

// Create drawer overlay
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function openDrawer() {
    navMenu.classList.add('active');
    hamburger.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeDrawer();
    } else {
        openDrawer();
    }
});

// Close drawer when clicking overlay
navOverlay.addEventListener('click', closeDrawer);

// Close drawer when clicking on a link
document.querySelectorAll('.navigation ul li a').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        darkModeToggle.textContent = body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', body.getAttribute('data-theme'));
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme && darkModeToggle) {
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
const progressBar = document.createElement('div');

progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Reading Progress Bar Logic
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    progressBar.style.width = scrolled + "%";

    // Smart Navbar: Hide on scroll down, show on scroll up
    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;

    // Don't hide navbar if mobile menu is open
    if (navMenu && navMenu.classList.contains('active')) return;

    if (!navbar) return;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
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
function moveCarousel(direction, button) {
    // Find the closest carousel-track to the clicked button
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

// Automatically add Breadcrumb Navigation on subpages
window.addEventListener('DOMContentLoaded', () => {
    const isHomepage = document.getElementById('home');
    if (!isHomepage) {
        const breadcrumbNav = document.createElement('div');
        breadcrumbNav.className = 'breadcrumb-nav glass-card';
        
        const path = window.location.pathname.replace(/\/$/, "");
        // Handle both /fashion and /fashion.html for Vercel clean URLs
        const fileName = path.split('/').pop() || 'index.html';
        const pageName = fileName.replace('.html', '').split('?')[0].split('#')[0].replace(/-/g, ' ');
        
        // Friendly name mapping
        const pageTitles = {
            'fashion': 'Fashion Design',
            'beauty': 'Beauty & Cosmetology',
            'art': 'Creative Art',
            'entrepreneurship': 'Business',
            'formulation': 'Product Formulation',
            'admission': 'Admission',
            'about': 'About Us'
        };

        let breadcrumbHTML = `<a href="index.html"><i class="fas fa-home"></i> Home</a> <span> / </span>`;
        
        // Check if it's a school page to add the intermediate step
        const schoolPages = ['fashion', 'beauty', 'art', 'entrepreneurship', 'formulation'];
        if (schoolPages.includes(pageName)) {
            breadcrumbHTML += `<a href="index.html#schools">Schools</a> <span>/</span>`;
        }

        // Add current page
        const currentTitle = pageTitles[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
        breadcrumbHTML += `<a href="#" style="color: var(--primary-color); font-weight: 700; pointer-events: none;">${currentTitle}</a>`;
        
        breadcrumbNav.innerHTML = breadcrumbHTML;
        document.body.appendChild(breadcrumbNav);
    }

    // Animated number counters for stats section
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    
                    if (isNaN(numericValue)) return;
                    
                    let current = 0;
                    const duration = 2000;
                    const step = Math.max(1, Math.floor(numericValue / (duration / 16)));
                    
                    const counter = setInterval(() => {
                        current += step;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(counter);
                        }
                        el.textContent = current + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    }, 16);
                    
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }
});

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 500); // minimum show time
    }
});
