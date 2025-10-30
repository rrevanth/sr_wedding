/* ===================================
   Animation Controller
   =================================== */

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Callback for intersection observer
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible', 'revealed');
            
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}

// Create intersection observer
const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-fade-in, .scroll-scale-in, .scroll-blur-in, .event-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });
}

// Parallax effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Closing parallax
    const closingPattern = document.querySelector('.closing-pattern');
    if (closingPattern) {
        const closingSection = document.querySelector('.closing');
        if (closingSection) {
            const rect = closingSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (window.innerHeight - rect.top) * 0.3;
                closingPattern.style.transform = `translateY(${offset}px)`;
            }
        }
    }
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Smooth scroll to section
function smoothScrollTo(element) {
    if (!element) return;
    
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize ripple effect on buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .cta-button, .action-button, .share-button');
    
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
}

// Stagger animation for children
function staggerChildren(parent, delay = 100) {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * delay}ms`;
    });
}

// Initialize stagger animations
function initStaggerAnimations() {
    const countdown = document.querySelector('.countdown');
    if (countdown) {
        staggerChildren(countdown, 100);
    }
    
    const eventDetails = document.querySelectorAll('.event-details');
    eventDetails.forEach(details => {
        staggerChildren(details, 50);
    });
}

// Floating animation for decorative elements
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.event-icon');
    
    floatingElements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

// Scroll indicator hide on scroll
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.6';
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        lastScroll = currentScroll;
    });
    
    // Click to scroll
    scrollIndicator.addEventListener('click', () => {
        const saveTheDate = document.getElementById('saveTheDate');
        if (saveTheDate) {
            smoothScrollTo(saveTheDate);
        }
    });
}

// Card hover effect - Subtle glow and lift (removed wobbly tilt)
function initCardHoverEffects() {
    // Hover effects are now handled purely by CSS for better performance
    // No JavaScript manipulation needed - cards will glow and lift slightly on hover
    console.log('Card hover effects initialized (CSS-based)');
}

// Gradient animation
function initGradientAnimations() {
    const gradientElements = document.querySelectorAll('.hero-gradient, .closing-gradient');
    
    gradientElements.forEach(el => {
        el.classList.add('animated-gradient');
    });
}

// Performance: Debounce function
function debounce(func, wait) {
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

// Performance: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize all animations
function initAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('Reduced motion preference detected. Animations minimized.');
        return;
    }
    
    // Initialize animations
    initScrollAnimations();
    initRippleEffect();
    initStaggerAnimations();
    initFloatingElements();
    initScrollIndicator();
    initCardHoverEffects();
    initGradientAnimations();
    
    // Add parallax scroll listener (throttled for performance)
    window.addEventListener('scroll', throttle(requestParallaxUpdate, 10));
    
    console.log('Animations initialized');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Export functions for use in other modules
window.animationController = {
    smoothScrollTo,
    createRipple,
    staggerChildren,
    debounce,
    throttle
};
