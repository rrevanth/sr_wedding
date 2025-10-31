'use client';

import { useEffect, useRef, useState } from 'react';
import { weddingPages } from '@/lib/weddingData';
import Script from 'next/script';

declare global {
  interface Window {
    St: any;
  }
}

export default function FlipBook() {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 550, height: 733 });

  // Calculate responsive dimensions based on viewport
  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let width: number;
    let height: number;
    
    // Mobile devices (< 768px)
    if (viewportWidth < 768) {
      // Single page view on mobile, use most of the width with padding
      width = Math.min(viewportWidth * 0.85, 400);
      height = width * 1.33; // Maintain 3:4 aspect ratio
    }
    // Tablet devices (768px - 1024px)
    else if (viewportWidth < 1024) {
      width = Math.min(viewportWidth * 0.4, 450);
      height = width * 1.33;
    }
    // Desktop devices (>= 1024px)
    else {
      width = Math.min(viewportWidth * 0.35, 550);
      height = width * 1.33;
    }
    
    // Ensure dimensions don't exceed viewport height (with some padding)
    const maxHeight = viewportHeight * 0.7;
    if (height > maxHeight) {
      height = maxHeight;
      width = height / 1.33;
    }
    
    // Set minimum dimensions
    width = Math.max(width, 280);
    height = Math.max(height, 373);
    
    return { width: Math.round(width), height: Math.round(height) };
  };

  // Handle window resize with debouncing
  useEffect(() => {
    const handleResize = () => {
      const newDimensions = calculateDimensions();
      setDimensions(newDimensions);
    };

    // Set initial dimensions
    handleResize();

    // Debounce resize events
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Initialize StPageFlip
  useEffect(() => {
    if (!isLibraryLoaded || !bookRef.current) return;

    const pages = bookRef.current.querySelectorAll('.page');
    setTotalPages(pages.length);

    try {
      const St = window.St;
      const isMobile = window.innerWidth < 768;
      
      pageFlipRef.current = new St.PageFlip(bookRef.current, {
        width: dimensions.width,
        height: dimensions.height,
        size: 'stretch',
        minWidth: Math.round(dimensions.width * 0.6),
        maxWidth: Math.round(dimensions.width * 1.8),
        minHeight: Math.round(dimensions.height * 0.6),
        maxHeight: Math.round(dimensions.height * 1.8),
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        swipeDistance: isMobile ? 20 : 30,
        clickEventForward: true,
        usePortrait: isMobile,
        startPage: 1,
        drawShadow: true,
        flippingTime: isMobile ? 800 : 1000,
        useMouseEvents: true,
        autoSize: true,
        showPageCorners: !isMobile,
        disableFlipByClick: false,
      });

      pageFlipRef.current.loadFromHTML(pages);

      // Setup event listeners
      pageFlipRef.current.on('flip', (e: any) => {
        setCurrentPage(e.data);
        playPageTurnSound();
      });

      console.log('FlipBook initialized with dimensions:', dimensions);
    } catch (error) {
      console.error('Error initializing FlipBook:', error);
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy?.();
      }
    };
  }, [isLibraryLoaded, dimensions]);

  // Initialize audio element
  useEffect(() => {
    // Create audio element for page flip sound
    audioRef.current = new Audio('/assets/page-flip.mp3');
    audioRef.current.volume = 0.5; // Set volume to 50%
    audioRef.current.preload = 'auto';
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!pageFlipRef.current) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        pageFlipRef.current.flipNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        pageFlipRef.current.flipPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        pageFlipRef.current.flip(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        pageFlipRef.current.flip(totalPages - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const playPageTurnSound = () => {
    if (!audioRef.current) return;

    try {
      // Reset audio to beginning and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        // Ignore autoplay errors (browser may block autoplay)
        console.debug('Audio play prevented:', e);
      });
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  };

  const handlePrevPage = () => {
    pageFlipRef.current?.flipPrev();
  };

  const handleNextPage = () => {
    pageFlipRef.current?.flipNext();
  };

  const handleStartOver = () => {
    pageFlipRef.current?.flip(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSpreads = Math.ceil(totalPages / 2);
  const currentSpread = Math.floor(currentPage / 2);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js"
        onLoad={() => setIsLibraryLoaded(true)}
      />

      <div className="flipbook-container max-w-[1400px] mx-auto p-0 px-4 sm:px-6">
        <div ref={bookRef} id="book" className="book-wrapper">
          {weddingPages.map((page, index) => (
            <div key={index} className="page">
              {page.type === 'image' ? (
                <div className="page-content">
                  <img
                    src={page.content as string}
                    alt={page.alt || `Page ${index}`}
                    className="page-image w-full h-full object-cover block select-none pointer-events-none"
                  />
                </div>
              ) : page.type === 'intro' ? (
                <div className="page-content content-page intro-content">
                  <div className="intro-text text-center relative z-10">
                    <h1 className="intro-title font-serif text-[clamp(3rem,8vw,6rem)] text-[#8B7355] mb-4 tracking-wide drop-shadow-md">
                      {(page.content as any).title}
                    </h1>
                    <h2 className="intro-subtitle font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-[#2C2416] italic tracking-wide">
                      {(page.content as any).subtitle}
                    </h2>
                  </div>
                </div>
              ) : page.type === 'verse' ? (
                <div className="page-content content-page">
                  <div className="verse font-serif text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed text-[#2C2416] text-center mb-6 max-w-[95%]">
                    {(page.content as any).lines.map((line: string, i: number) => (
                      <p key={i} className="mb-2 italic drop-shadow-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                  {(page.content as any).details && (
                    <div className="details font-sans text-[clamp(0.875rem,2vw,1rem)] leading-normal text-[#6B5D4F] text-center p-4 bg-white/95 rounded-lg border border-[#E8DFD0] shadow-sm max-w-[95%]">
                      <p className="mb-0 font-medium">{(page.content as any).details}</p>
                    </div>
                  )}
                </div>
              ) : page.type === 'outro' ? (
                <div className="page-content content-page outro-content flex flex-col justify-center items-center gap-8">
                  <div className="verse outro-verse font-serif text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed text-[#2C2416] text-center mb-8 max-w-[95%]">
                    {(page.content as any).lines.map((line: string, i: number) => (
                      <p key={i} className="mb-2 italic drop-shadow-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={handleStartOver}
                    className="start-over-btn flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#8B7355] text-white border-none rounded-xl font-sans text-base sm:text-lg font-semibold cursor-pointer shadow-lg transition-all hover:bg-[#A0522D] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md z-10 mt-4 touch-manipulation"
                    aria-label="Start over from the beginning"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Start Over</span>
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="navigation-controls flex items-center justify-center gap-4 sm:gap-8 mt-6 py-4">
          <button
            id="prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="nav-button w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#E8DFD0] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all text-[#8B7355] shadow-sm hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div id="page-indicators" className="page-indicators flex gap-2 items-center">
            {Array.from({ length: totalSpreads }).map((_, i) => (
              <button
                key={i}
                className={`page-indicator w-2.5 h-2.5 rounded-full bg-[#E8DFD0] cursor-pointer transition-all border-none p-0 hover:bg-[#8B7D6B] hover:scale-110 ${
                  i === currentSpread ? 'active w-8 rounded-md bg-[#D4AF37]' : ''
                }`}
                onClick={() => pageFlipRef.current?.flip(i * 2)}
                aria-label={`Go to spread ${i + 1}`}
                aria-current={i === currentSpread ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            id="next-btn"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className="nav-button w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#E8DFD0] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all text-[#8B7355] shadow-sm hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
            aria-label="Next page"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'CustomFont';
          src: url('/assets/images/font.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .font-serif {
          font-family: 'CustomFont', Georgia, serif;
        }

        .book-wrapper {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0;
        }

        @media (max-width: 767px) {
          .book-wrapper {
            max-width: 100%;
          }
        }

        .stf__parent {
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: block;
        }

        .stf__parent,
        .stf__wrapper,
        .stf__block {
          padding: 0;
          margin: 0 auto;
        }

        .stf__wrapper {
          overflow: visible !important;
        }

        .stf__block {
          background: white;
        }

        .stf__item {
          background: white;
        }

        .stf__item .page-content {
          width: 100%;
          height: 100%;
        }

        .stf__item img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        .page {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.1);
        }

        .page-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
        }

        .content-page {
          background-image: url('/assets/texture.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 3rem 2rem;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        @media (max-width: 767px) {
          .content-page {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .content-page {
            padding: 1.5rem 1rem;
          }
        }

        .content-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.85);
          z-index: 0;
        }

        .content-page > * {
          position: relative;
          z-index: 1;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .start-over-btn:hover .animate-spin-slow {
          animation-duration: 1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
