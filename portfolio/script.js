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

// Hero Slideshow
class HeroSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.showSlide(0);
        this.startAutoSlide();
        this.bindEvents();
    }
    
    showSlide(index) {
        // Remove active class from all slides and indicators
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        });
        
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.prevSlide();
            this.startAutoSlide();
        });
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoSlide();
                this.showSlide(index);
                this.startAutoSlide();
            });
        });
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
        heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}

// Projects Slider
class ProjectsSlider {
    constructor() {
        this.projects = document.querySelectorAll('.project-card');
        this.prevBtn = document.querySelector('.prev-project');
        this.nextBtn = document.querySelector('.next-project');
        this.currentProject = 0;
        
        this.init();
    }
    
    init() {
        this.showProject(0);
        this.bindEvents();
    }
    
    showProject(index) {
        this.projects.forEach(project => project.classList.remove('active'));
        this.projects[index].classList.add('active');
        this.currentProject = index;
    }
    
    nextProject() {
        const next = (this.currentProject + 1) % this.projects.length;
        this.showProject(next);
    }
    
    prevProject() {
        const prev = (this.currentProject - 1 + this.projects.length) % this.projects.length;
        this.showProject(prev);
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextProject());
        this.prevBtn.addEventListener('click', () => this.prevProject());
    }
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Skills Animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--skill-level', level + '%');
        skill.classList.add('animate');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats counters
            if (entry.target.classList.contains('about')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                
                // Animate skills
                setTimeout(() => {
                    animateSkills();
                }, 500);
            }
            
            // Add fade-in animation to sections
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new HeroSlideshow();
    new ProjectsSlider();
    initMobileNav();
    initNavbarScroll();
    
    // Set up intersection observer for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
    
    // Show first section immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Add some interactive particles effect (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles effect
setTimeout(createParticles, 1000);