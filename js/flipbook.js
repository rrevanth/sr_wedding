/**
 * FlipBook with StPageFlip Library
 * Creates realistic page flip animations
 */

class FlipBook {
    constructor() {
        this.pageFlip = null;
        this.currentPage = 0;
        this.audioContext = null;
        this.soundEnabled = true;
        this.totalPages = 0;
    }
    
    init() {
        const bookContainer = document.getElementById('book');
        
        if (!bookContainer) {
            console.error('Book container not found');
            return;
        }
        
        // Get all page elements
        const pages = document.querySelectorAll('#book .page');
        this.totalPages = pages.length;
        
        console.log('Initializing StPageFlip with', this.totalPages, 'pages');
        
        // Initialize StPageFlip
        this.pageFlip = new St.PageFlip(bookContainer, {
            width: 550, // Half of book width for single page
            height: 733, // Page height  
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,
            maxShadowOpacity: 0.5,
            showCover: true,
            mobileScrollSupport: false,
            swipeDistance: 30,
            clickEventForward: true,
            usePortrait: true,
            startPage: 1, // Start at page 1 to skip blank cover
            drawShadow: true,
            flippingTime: 1000,
            useMouseEvents: true,
            autoSize: true,
            showPageCorners: true,
            disableFlipByClick: false
        });
        
        // Load pages
        this.pageFlip.loadFromHTML(pages);
        
        // Ensure images are loaded
        this.ensureImagesLoaded();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize audio
        this.initAudioContext();
        
        // Create page indicators
        this.createPageIndicators();
        
        // Update initial state
        this.updateNavigationButtons();
        
        console.log('FlipBook initialized with StPageFlip');
    }
    
    ensureImagesLoaded() {
        // Get all images in the book
        const images = document.querySelectorAll('#book img');
        
        console.log('Found', images.length, 'images to load');
        
        images.forEach((img, index) => {
            // Force reload if not loaded
            if (!img.complete) {
                const src = img.src;
                img.src = '';
                img.src = src;
                console.log('Reloading image', index, ':', src);
            } else {
                console.log('Image', index, 'already loaded:', img.src);
            }
            
            // Add load event listener
            img.addEventListener('load', () => {
                console.log('Image loaded successfully:', img.src);
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', (e) => {
                console.error('Failed to load image:', img.src, e);
            });
        });
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevPage());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
        
        // Page flip events
        this.pageFlip.on('flip', (e) => {
            this.currentPage = e.data;
            this.playPageTurnSound();
            this.updateNavigationButtons();
            this.updatePageIndicators();
            console.log('Flipped to page:', e.data);
        });
        
        this.pageFlip.on('changeOrientation', (e) => {
            console.log('Orientation changed:', e.data);
        });
        
        this.pageFlip.on('changeState', (e) => {
            console.log('State changed:', e.data);
        });
        
        // Start Over button
        const startOverBtn = document.getElementById('start-over-btn');
        if (startOverBtn) {
            startOverBtn.addEventListener('click', () => this.startOver());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextPage();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevPage();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.startOver();
            } else if (e.key === 'End') {
                e.preventDefault();
                this.pageFlip.flip(this.totalPages - 1);
            }
        });
    }
    
    createPageIndicators() {
        const container = document.getElementById('page-indicators');
        if (!container) return;
        
        const totalPages = this.pageFlip.getPageCount();
        const totalSpreads = Math.ceil(totalPages / 2);
        
        container.innerHTML = '';
        
        for (let i = 0; i < totalSpreads; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'page-indicator';
            indicator.setAttribute('aria-label', `Go to spread ${i + 1}`);
            indicator.dataset.spread = i;
            
            if (i === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.pageFlip.flip(i * 2);
            });
            
            container.appendChild(indicator);
        }
        
        console.log('Created', totalSpreads, 'page indicators');
    }
    
    updatePageIndicators() {
        const indicators = document.querySelectorAll('.page-indicator');
        const currentSpread = Math.floor(this.currentPage / 2);
        
        indicators.forEach((indicator, index) => {
            if (index === currentSpread) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const totalPages = this.pageFlip.getPageCount();
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentPage >= totalPages - 1;
        }
    }
    
    nextPage() {
        this.pageFlip.flipNext();
    }
    
    prevPage() {
        this.pageFlip.flipPrev();
    }
    
    startOver() {
        this.pageFlip.flip(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    initAudioContext() {
        const createContext = () => {
            if (!this.audioContext) {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    console.log('Audio context initialized');
                } catch (e) {
                    console.warn('Web Audio API not supported', e);
                    this.soundEnabled = false;
                }
            }
        };
        
        document.addEventListener('click', createContext, { once: true });
        document.addEventListener('touchstart', createContext, { once: true });
    }
    
    playPageTurnSound() {
        if (!this.soundEnabled || !this.audioContext) {
            return;
        }
        
        try {
            const now = this.audioContext.currentTime;
            
            // Whoosh sound
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.15);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.08, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            
            // Paper rustle
            const bufferSize = this.audioContext.sampleRate * 0.1;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const noiseSource = this.audioContext.createBufferSource();
            const noiseGain = this.audioContext.createGain();
            const noiseFilter = this.audioContext.createBiquadFilter();
            
            noiseSource.buffer = noiseBuffer;
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 2000;
            
            noiseSource.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(this.audioContext.destination);
            
            noiseGain.gain.setValueAtTime(0.02, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            
            noiseSource.start(now);
            noiseSource.stop(now + 0.1);
        } catch (e) {
            console.warn('Error playing page turn sound:', e);
        }
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlipBook;
}
