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
            // Check if element has a span child (like in product features)
            const span = element.querySelector('span');
            if (span) {
                span.textContent = urduText;
            } else {
                element.textContent = urduText;
            }
        }
    });
    currentLang = 'ur';
    englishBtn.classList.remove('active');
    urduBtn.classList.add('active');
    // Recalculate BMI to update category text in Urdu
    if (document.getElementById('heightCm').value) {
        calculateBMI();
    }
}

// Function to translate to English
function translateToEnglish() {
    translatableElements.forEach(element => {
        if (element.getAttribute('data-urdu')) {
            element.classList.remove('urdu-text');
            const span = element.querySelector('span');
            const originalText = element.getAttribute('data-original');
            if (span) {
                span.textContent = originalText;
            } else {
                element.textContent = originalText;
            }
        }
    });
    currentLang = 'en';
    urduBtn.classList.remove('active');
    englishBtn.classList.add('active');
    // Recalculate BMI to update category text in English
    if (document.getElementById('heightCm').value) {
        calculateBMI();
    }
}

// Save original text
translatableElements.forEach(element => {
    const span = element.querySelector('span');
    element.setAttribute('data-original', span ? span.textContent : element.textContent);
});

// Initialize with Urdu as default language
translateToUrdu();

// Event Listeners for language toggle
englishBtn.addEventListener('click', translateToEnglish);
urduBtn.addEventListener('click', translateToUrdu);

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
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside menu and button
        if (!mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu function
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }

    // Update the smooth scrolling to work with mobile menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu first
                closeMobileMenu();
                
                // Wait a tiny bit for menu to close, then scroll
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
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

    // BMI Calculator Functionality
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const metricInputs = document.getElementById('metricInputs');
    const imperialInputs = document.getElementById('imperialInputs');
    
    metricBtn.addEventListener('click', function() {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    });
    
    imperialBtn.addEventListener('click', function() {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        imperialInputs.style.display = 'block';
        metricInputs.style.display = 'none';
    });
    
    // Gender Selection
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            genderBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Calculate BMI
    const calculateBtn = document.getElementById('calculateBmi');
    calculateBtn.addEventListener('click', calculateBMI);
    
    function calculateBMI() {
        let bmi;
        let heightCm = document.getElementById('heightCm').value;
        let weightKg = document.getElementById('weightKg').value;
        let heightFeet = document.getElementById('heightFeet').value;
        let heightInches = document.getElementById('heightInches').value;
        let weightPounds = document.getElementById('weightPounds').value;
        
        // Check if using metric or imperial
        if (metricBtn.classList.contains('active')) {
            // Metric calculation
            if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
                alert('Please enter valid height and weight in metric units');
                return;
            }
            
            let heightM = heightCm / 100;
            bmi = weightKg / (heightM * heightM);
        } else {
            // Imperial calculation
            if (!heightFeet || !weightPounds || heightFeet <= 0 || weightPounds <= 0) {
                alert('Please enter valid height and weight in imperial units');
                return;
            }

            weightPounds *= 2.20462;
            
            let totalInches = (parseInt(heightFeet) * 12) + (parseInt(heightInches) || 0);
            bmi = (weightPounds / (totalInches * totalInches)) * 703;
        }
        
        // Round to one decimal place
        bmi = Math.round(bmi * 10) / 10;
        
        // Display result
        document.getElementById('bmiValue').textContent = bmi;
        
        // Determine category
        let category, categoryText, categoryTextUrdu, color;
        if (bmi < 18.5) {
            category = 'underweight';
            categoryText = 'Underweight';
            categoryTextUrdu = 'کم وزن';
            color = '#3498db';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'normal';
            categoryText = 'Normal Weight';
            categoryTextUrdu = 'معمول وزن';
            color = '#2ecc71';
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'overweight';
            categoryText = 'Overweight';
            categoryTextUrdu = 'زیادہ وزن';
            color = '#f39c12';
        } else {
            category = 'obese';
            categoryText = 'Obese';
            categoryTextUrdu = 'موٹاپا';
            color = '#e74c3c';
        }
        
        // Get the appropriate text based on current language
        const displayText = currentLang === 'ur' ? categoryTextUrdu : categoryText;
        
        // Update category text
        document.getElementById('bmiCategory').innerHTML = 
            `<span style="color: ${color}; font-weight: 700;">${displayText}</span>`;
        
        // Update category detail
        document.getElementById('categoryDetail').textContent = displayText;
        document.getElementById('categoryDetail').setAttribute('data-current', displayText);
        
        // Calculate BMI Prime
        let bmiPrime = (bmi / 25).toFixed(2);
        document.getElementById('bmiPrime').textContent = bmiPrime;
        
        // Update scale marker position
        let markerPosition;
        if (bmi < 18.5) {
            markerPosition = (bmi / 18.5) * 20; // 0-20% of scale
        } else if (bmi <= 24.9) {
            markerPosition = 20 + ((bmi - 18.5) / (24.9 - 18.5)) * 30; // 20-50% of scale
        } else if (bmi <= 29.9) {
            markerPosition = 50 + ((bmi - 25) / (29.9 - 25)) * 30; // 50-80% of scale
        } else {
            markerPosition = 80 + Math.min(((bmi - 30) / 20) * 20, 20); // 80-100% of scale
        }
        
        document.getElementById('scaleMarker').style.left = `${markerPosition}%`;
        
        // Update healthy weight range
        let healthyRange = '18.5 - 24.9';
        document.getElementById('healthyRange').textContent = healthyRange;
        
        // Show health recommendations based on BMI
        let recommendations = document.getElementById('recommendations');
        let message = '';
        
        if (category === 'underweight') {
            message = 'Consider nutritional supplements and Shifa flour for healthy weight gain.';
        } else if (category === 'normal') {
            message = 'Maintain your healthy weight with Shifa natural flour for balanced nutrition.';
        } else if (category === 'overweight' || category === 'obese') {
            message = 'Shifa Diabetic Flour can help manage weight and improve metabolic health.';
        }
        
        recommendations.innerHTML = `
            <h4 class="translatable" data-urdu="صحت کے مشورے">Health Recommendations</h4>
            <p>${message}</p>
            <a href="#products" class="bmi-product-link translatable" data-urdu="ہمارے مصنوعات دیکھیں">View Our Products</a>
        `;
    }
    
    // Initialize with example values
    document.getElementById('heightCm').value = '170';
    document.getElementById('weightKg').value = '65';
    calculateBMI();
});