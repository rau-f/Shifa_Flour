// Floating grains animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingGrains = document.getElementById('floatingGrains');
    
    for (let i = 0; i < 20; i++) {
        const grain = document.createElement('div');
        grain.classList.add('grain');
        
        // Random size
        const size = Math.random() * 20 + 5;
        grain.style.width = `${size}px`;
        grain.style.height = `${size}px`;
        
        // Random position
        grain.style.left = `${Math.random() * 100}%`;
        grain.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        grain.style.animationDelay = `${Math.random() * 15}s`;
        
        floatingGrains.appendChild(grain);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = 'var(--white)';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        nav.style.gap = '15px';
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
});