// ===================================
// Scroll Restoration
// ===================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Ensure page starts at top on load
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top first
    window.scrollTo(0, 0);
    
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ===================================
// Particle.js Configuration
// ===================================
// Simplified particle configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#00A896'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: true
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#008170',
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// ===================================
// Theme Management
// ===================================
const THEME_STORAGE_KEY = 'preferred-theme';
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');

function updateThemeToggle(theme, isUsingSystemTheme = false) {
    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector('i');
    const label = themeToggle.querySelector('.theme-toggle-text');
    const isLight = theme === 'light';

    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute(
        'aria-label',
        `Using ${theme} theme. Click to switch theme.`
    );

    if (icon) {
        icon.classList.toggle('fa-sun', isLight);
        icon.classList.toggle('fa-moon', !isLight);
    }

    if (label) {
        label.textContent = isLight ? 'Light' : 'Dark';
    }
}

function applyTheme(theme, isUsingSystemTheme = false) {
    body.setAttribute('data-theme', theme);
    updateThemeToggle(theme, isUsingSystemTheme);
}

function getBrowserTheme() {
    return systemThemeQuery.matches ? 'light' : 'dark';
}

function getStoredThemePreference() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
}

function syncThemeWithPreference() {
    const savedTheme = getStoredThemePreference();

    if (savedTheme) {
        applyTheme(savedTheme, false);
        return;
    }

    applyTheme(getBrowserTheme(), true);
}

syncThemeWithPreference();

const handleSystemThemeChange = (event) => {
    if (!getStoredThemePreference()) {
        applyTheme(event.matches ? 'light' : 'dark', true);
    }
};

if (typeof systemThemeQuery.addEventListener === 'function') {
    systemThemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemThemeQuery.addListener === 'function') {
    systemThemeQuery.addListener(handleSystemThemeChange);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme, false);
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Dynamic Experience Calculation
// ===================================
const CAREER_START_DATE = new Date('2019-07-01T00:00:00');
const experienceCounter = document.querySelector('[data-experience-counter="true"]');
const experienceTextElements = document.querySelectorAll('[data-experience-text="true"]');

function calculateYearsOfExperience() {
    const today = new Date();
    let years = today.getFullYear() - CAREER_START_DATE.getFullYear();
    const hasReachedWorkAnniversary =
        today.getMonth() > CAREER_START_DATE.getMonth() ||
        (today.getMonth() === CAREER_START_DATE.getMonth() && today.getDate() >= CAREER_START_DATE.getDate());

    if (!hasReachedWorkAnniversary) {
        years -= 1;
    }

    return Math.max(years, 0);
}

const yearsOfExperience = calculateYearsOfExperience();

if (experienceCounter) {
    experienceCounter.setAttribute('data-target', String(yearsOfExperience));
}

experienceTextElements.forEach((element) => {
    element.textContent = `${yearsOfExperience} years`;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Animated Counter for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ===================================
// Skill Progress Bar Animation
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// Project Filtering
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all') {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                if (categories && categories.includes(filter)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});


// ===================================
// Download Resume Handler
// ===================================

// ===================================
// Scroll Reveal Animation
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.glass-card, .timeline-item, .project-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// Typing Effect for Hero Title (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// Lazy Loading Images (if any are added)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Back to Top Button
// ===================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #008170 0%, #00A896 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 16px rgba(0, 129, 112, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 6px 20px rgba(0, 168, 150, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 16px rgba(0, 129, 112, 0.4)';
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

createBackToTopButton();


// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavigation, 10));
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Welcome to G Sanjay\'s Portfolio!', 'color: #00A896; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Amazon Connect Consultant | AWS Cloud Engineer', 'color: #008170; font-size: 14px;');
console.log('%c📧 Contact: Sanjayguru13@gmail.com', 'color: #005B41; font-size: 12px;');
console.log('%c💼 LinkedIn: https://www.linkedin.com/in/g-sanjay-513702163/', 'color: #005B41; font-size: 12px;');

// ===================================
// Page Load Performance Tracking
// ===================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00A896; font-size: 12px;');
});


// ===================================
// Initialize Everything
// ===================================
console.log('%c✅ All scripts initialized successfully!', 'color: #008170; font-size: 12px; font-weight: bold;');

// Made with Bob
