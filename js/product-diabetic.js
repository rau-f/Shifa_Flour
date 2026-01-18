// Language Toggle Functionality
const englishBtn = document.getElementById('englishBtn');
const urduBtn = document.getElementById('urduBtn');
const translatableElements = document.querySelectorAll('.translatable');

let currentLang = 'ur';

// Function to translate to Urdu
function translateToUrdu() {
    translatableElements.forEach(element => {
        const urduText = element.getAttribute('data-urdu');
        if (urduText) {
            element.classList.add('urdu-text');
            element.innerHTML = urduText;
        }
    });
    currentLang = 'ur';
    englishBtn.classList.remove('active');
    urduBtn.classList.add('active');
    
    // Toggle urdu-mode on nutrition table
    const nutritionTable = document.querySelector('.nutrition-table');
    if (nutritionTable) {
        nutritionTable.classList.add('urdu-mode');
    }
    
    // Update mobile menu text if it's open
    updateMobileMenuText();
}

// Function to translate to English
function translateToEnglish() {
    translatableElements.forEach(element => {
        const originalText = element.getAttribute('data-original') || element.textContent;
        if (element.getAttribute('data-urdu')) {
            element.setAttribute('data-original', originalText);
            element.classList.remove('urdu-text');
            element.innerHTML = element.getAttribute('data-original');
        }
    });
    currentLang = 'en';
    urduBtn.classList.remove('active');
    englishBtn.classList.add('active');
    
    // Remove urdu-mode from nutrition table
    const nutritionTable = document.querySelector('.nutrition-table');
    if (nutritionTable) {
        nutritionTable.classList.remove('urdu-mode');
    }
    
    // Update mobile menu text if it's open
    updateMobileMenuText();
}

// Save original text
translatableElements.forEach(element => {
    element.setAttribute('data-original', element.innerHTML);
});

// Initialize with Urdu as default language
translateToUrdu();

// Event Listeners for language toggle
englishBtn.addEventListener('click', translateToEnglish);
urduBtn.addEventListener('click', translateToUrdu);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    
    // Change icon
    if (mobileNav.classList.contains('active')) {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    } else {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.mobile-menu-btn') && 
        !event.target.closest('.mobile-nav') &&
        mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    }
});

// Function to update mobile menu text based on language
function updateMobileMenuText() {
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        if (currentLang === 'ur') {
            const urduText = link.getAttribute('data-urdu');
            if (urduText) {
                link.innerHTML = urduText;
            }
        } else {
            const originalText = link.getAttribute('data-original');
            if (originalText) {
                link.innerHTML = originalText;
            }
        }
    });
}

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Initialize animations for elements already in view
fadeElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        element.classList.add('visible');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            }
        }
    });
});