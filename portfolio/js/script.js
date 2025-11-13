// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Set initial theme
function setInitialTheme() {
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle theme on button click
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function toggleMobileMenu() {
    navMenu.classList.toggle('show');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('show');
}

// Active Navigation
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
}

// Skill Progress Bars Animation
const skillBars = document.querySelectorAll('.skills__bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const skillType = bar.getAttribute('data-skill');
            let width = '0%';
            
            switch(skillType) {
                case 'html':
                    width = '90%';
                    break;
                case 'css':
                    width = '85%';
                    break;
                case 'js':
                    width = '80%';
                    break;
                case 'python':
                    width = '75%';
                    break;
                case 'mysql':
                    width = '70%';
                    break;
                default:
                    width = '0%';
            }
            
            bar.style.width = width;
        }
    });
}

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const toast = document.getElementById('toast');

// Store form data in localStorage
function saveFormData() {
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        nameInput.value = formData.name || '';
        emailInput.value = formData.email || '';
        phoneInput.value = formData.phone || '';
        messageInput.value = formData.message || '';
    }
}

// Validate form fields
function validateForm() {
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        nameInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        nameInput.setAttribute('aria-invalid', 'false');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        emailInput.setAttribute('aria-invalid', 'false');
    }
    
    // Validate phone (optional but if provided, validate format)
    if (phoneInput.value.trim() !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/[\s\-\(\)]/g, ''))) {
            phoneInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            phoneInput.setAttribute('aria-invalid', 'false');
        }
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        messageInput.setAttribute('aria-invalid', 'false');
    }
    
    return isValid;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success toast
        showToast();
        
        // Clear form and localStorage
        contactForm.reset();
        localStorage.removeItem('contactFormData');
    }
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Skill Tabs
const tabButtons = document.querySelectorAll('.tab-btn');

function handleTabClick(e) {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Here you would typically show/hide different skill categories
    // For this example, we're just changing the active tab button
}

// Set current year in footer
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Initialize all functionality
function init() {
    // Set initial theme
    setInitialTheme();
    
    // Set current year
    setCurrentYear();
    
    // Load saved form data
    loadFormData();
    
    // Animate skill bars if they're already in view
    animateSkillBars();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Form event listeners
    contactForm.addEventListener('submit', handleFormSubmit);
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', saveFormData);
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        setActiveNavLink();
        toggleBackToTopButton();
        animateSkillBars();
    });
    
    // Tab button event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });
    
    // Back to top button
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);