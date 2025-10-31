/**
 * Main Application Entry Point
 * Initializes the flipbook and handles application-level functionality
 */

// Global flipbook instance
let flipbook = null;

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wedding Invitation App Starting...');
    
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Initialize flipbook
    flipbook = new FlipBook();
    flipbook.init();
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        console.log('Flipbook initialized successfully');
        hideLoadingScreen();
    }, 500);
    
    // Setup additional features
    setupAdditionalFeatures();
    
    // Setup analytics (if needed)
    setupAnalytics();
});

/**
 * Hide the loading screen with animation
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Add a small delay for better UX
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 500);
}

/**
 * Setup additional features and enhancements
 */
function setupAdditionalFeatures() {
    // Handle window resize
    handleWindowResize();
    
    // Setup copy to clipboard functionality
    setupCopyToClipboard();
    
    // Check for browser compatibility
    checkBrowserCompatibility();
}

/**
 * Handle window resize events
 */
function handleWindowResize() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(() => {
            // StPageFlip handles resize automatically
            console.log('Window resized');
        }, 250);
    });
}

/**
 * Setup copy to clipboard functionality
 */
function setupCopyToClipboard() {
    // This can be used for copying venue addresses, etc.
    // Implementation can be added when specific content is available
    
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.copy;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast('Copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        });
    });
}

/**
 * Show a toast notification
 */
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 300);
    }, duration);
}

/**
 * Check browser compatibility and show warnings if needed
 */
function checkBrowserCompatibility() {
    // Check for 3D transform support
    const has3DSupport = 'WebKitCSSMatrix' in window || 'MSCSSMatrix' in window;
    
    if (!has3DSupport) {
        console.warn('3D transforms not supported, using fallback');
    }
    
    // Check for touch support
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (hasTouchSupport) {
        document.body.classList.add('touch-device');
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('Reduced motion preference detected');
        document.body.classList.add('reduced-motion');
    }
}

/**
 * Setup analytics tracking (optional)
 */
function setupAnalytics() {
    // This is a placeholder for analytics integration
    // You can add Google Analytics, Mixpanel, etc. here
    
    // Track page views
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Track page flips
    // This would require adding event listeners to the flipbook
}

/**
 * Track analytics events
 */
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    // Replace with actual analytics implementation
    
    if (typeof gtag !== 'undefined') {
        // Google Analytics
        gtag('event', eventName, eventData);
    } else if (typeof mixpanel !== 'undefined') {
        // Mixpanel
        mixpanel.track(eventName, eventData);
    } else {
        // Console log for development
        console.log('Analytics Event:', eventName, eventData);
    }
}

/**
 * Add to calendar functionality (optional enhancement)
 */
function addToCalendar(eventDetails) {
    // This can be implemented using a library like add-to-calendar-button
    // or by generating .ics files
    
    console.log('Add to calendar:', eventDetails);
    showToast('Calendar feature coming soon!');
}

/**
 * Share functionality (optional enhancement)
 */
function shareInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Wedding Invitation',
            text: 'Join us in celebrating our special day!',
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback: Copy link to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => showToast('Link copied to clipboard!'))
            .catch((error) => console.error('Error copying link:', error));
    }
}

/**
 * Handle errors gracefully
 */
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    
    // Show user-friendly error message
    // (Only in production, not during development)
    if (window.location.hostname !== 'localhost') {
        showToast('Something went wrong. Please refresh the page.');
    }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

/**
 * Log app initialization complete
 */
console.log('Wedding Invitation App Initialized Successfully');

// Export functions for potential use in console or other scripts
window.weddingApp = {
    flipbook,
    addToCalendar,
    shareInvitation,
    trackEvent
};
