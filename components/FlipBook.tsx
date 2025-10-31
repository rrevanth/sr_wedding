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
  const audioContextRef = useRef<AudioContext | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Initialize StPageFlip
  useEffect(() => {
    if (!isLibraryLoaded || !bookRef.current) return;

    const pages = bookRef.current.querySelectorAll('.page');
    setTotalPages(pages.length);

    try {
      const St = window.St;
      pageFlipRef.current = new St.PageFlip(bookRef.current, {
        width: 550,
        height: 733,
        size: 'stretch',
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
        startPage: 1,
        drawShadow: true,
        flippingTime: 1000,
        useMouseEvents: true,
        autoSize: true,
        showPageCorners: true,
        disableFlipByClick: false,
      });

      pageFlipRef.current.loadFromHTML(pages);

      // Setup event listeners
      pageFlipRef.current.on('flip', (e: any) => {
        setCurrentPage(e.data);
        playPageTurnSound();
      });

      console.log('FlipBook initialized');
    } catch (error) {
      console.error('Error initializing FlipBook:', error);
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy?.();
      }
    };
  }, [isLibraryLoaded]);

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
          console.warn('Web Audio API not supported', e);
        }
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
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
    if (!audioContextRef.current) return;

    try {
      const now = audioContextRef.current.currentTime;

      // Whoosh sound
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.15);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      oscillator.start(now);
      oscillator.stop(now + 0.15);
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

      <div className="flipbook-container max-w-[1400px] mx-auto p-0">
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
                    className="start-over-btn flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white border-none rounded-xl font-sans text-lg font-semibold cursor-pointer shadow-lg transition-all hover:bg-[#A0522D] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md z-10 mt-4"
                    aria-label="Start over from the beginning"
                  >
                    <svg
                      className="w-6 h-6 animate-spin-slow"
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
        <div className="navigation-controls flex items-center justify-center gap-8 mt-6 py-4">
          <button
            id="prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="nav-button w-12 h-12 border-2 border-[#E8DFD0] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all text-[#8B7355] shadow-sm hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="nav-button w-12 h-12 border-2 border-[#E8DFD0] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all text-[#8B7355] shadow-sm hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
