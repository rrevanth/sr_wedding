/* ===================================
   Main JavaScript - Modern Wedding Invitation
   =================================== */

// Audio controller
let audio = null;
let isPlaying = false;

function initAudio() {
    const audioToggle = document.getElementById('audioToggle');
    const volumeControl = document.getElementById('volumeControl');
    
    // Try to load audio file
    audio = new Audio('assets/audio/classical-indian-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    // Handle audio loading errors gracefully
    audio.addEventListener('error', () => {
        console.log('Audio file not found. Audio controls will be hidden.');
        const audioControl = document.getElementById('audioControl');
        if (audioControl) {
            audioControl.style.display = 'none';
        }
    });
    
    // Audio toggle
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                audioToggle.classList.remove('playing');
                isPlaying = false;
            } else {
                audio.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
                audioToggle.classList.add('playing');
                isPlaying = true;
            }
        });
    }
    
    // Volume control
    if (volumeControl) {
        volumeControl.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });
    }
}

// Map functionality
function openMap(location) {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
}

// Initialize map buttons
function initMapButtons() {
    const mapButtons = document.querySelectorAll('.view-map');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.getAttribute('data-location');
            if (location) {
                openMap(location);
            }
        });
    });
}

// Social sharing
function shareOnWhatsApp() {
    const text = 'Join us in celebrating the wedding of Revanth & Sravya! November 22-25, 2025 in Vizag and Hyderabad.';
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showCopySuccess();
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopyLink(url);
            });
    } else {
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy link. Please copy manually: ' + url);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const copyButton = document.getElementById('copyLink');
    if (!copyButton) return;
    
    const originalHTML = copyButton.innerHTML;
    
    copyButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
    `;
    copyButton.classList.add('success');
    
    setTimeout(() => {
        copyButton.innerHTML = originalHTML;
        copyButton.classList.remove('success');
    }, 2000);
}

// Initialize social sharing
function initSocialSharing() {
    const whatsappBtn = document.getElementById('shareWhatsApp');
    const facebookBtn = document.getElementById('shareFacebook');
    const copyBtn = document.getElementById('copyLink');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareOnWhatsApp);
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', shareOnFacebook);
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyLink);
    }
}

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadResources() {
    // Preload fonts
    const fonts = [
        'Cormorant Garamond',
        'Great Vibes',
        'Lato',
        'Marcellus'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        // Note: This is a placeholder. Actual font URLs would come from Google Fonts
    });
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                console.log('Performance Metrics:');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Connect Time: ${connectTime}ms`);
                console.log(`Render Time: ${renderTime}ms`);
            }, 0);
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize everything
function init() {
    console.log('Initializing wedding invitation...');
    
    // Initialize features
    initAudio();
    initMapButtons();
    initSocialSharing();
    initLazyLoading();
    preloadResources();
    logPerformanceMetrics();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    console.log('Wedding invitation initialized successfully!');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Service Worker registration (optional, for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Export for use in other modules
window.weddingApp = {
    openMap,
    shareOnWhatsApp,
    shareOnFacebook,
    copyLink
};
