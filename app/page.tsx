'use client';

import { useEffect, useState } from 'react';
import FlipBook from '@/components/FlipBook';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F5EBE0]">
        <div className="container mx-auto px-4 py-8 max-w-[1600px]">
          {/* Header */}
          <header className="text-center mb-8 py-4">
            <h1 className="text-4xl md:text-5xl font-serif text-[#8B7355] mb-2 drop-shadow-md">
              You're Invited
            </h1>
            <p className="text-lg text-[#6B5D4F] italic">
              Join us in celebrating our special day
            </p>
          </header>

          {/* Flipbook */}
          <FlipBook />

          {/* Footer */}
          <footer className="text-center py-8 mt-8 text-[#6B5D4F]">
            <p className="text-xl font-serif text-[#8B7355] mb-4">
              We look forward to celebrating with you
            </p>
            <p className="text-sm text-[#8B7D6B] italic">
              Use arrow keys or swipe to navigate
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
