import { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { HeroFull } from '@/components/hero/HeroFull';
import { TrackingSnapshot } from '@/components/TrackingSnapshot';
import { InsightsGrid } from '@/components/InsightsGrid';
import { AboutSection } from '@/components/AboutSection';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load FAQ section (kept but moved lower priority)
const LazyFAQ = lazy(() => import('@/components/FAQSection'));

const LoadingBlock = () => (
  <div className="flex h-72 items-center justify-center bg-slate-950">
    <div className="flex items-center gap-4">
      <Skeleton className="h-16 w-16 rounded-full bg-slate-800" />
      <Skeleton className="h-8 w-48 bg-slate-800" />
    </div>
  </div>
);

const Index = () => {
  const location = useLocation();

  // Handle scroll-to on navigation from other pages
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the state
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-950" data-agid="page-home">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main id="main-content" aria-labelledby="page-title">
        {/* HERO - Personal Voice */}
        <HeroFull />
        
        {/* TRACKING SNAPSHOT - What I'm watching now */}
        <TrackingSnapshot />
        
        {/* INSIGHTS GRID - Selected projects/insights */}
        <InsightsGrid />
        
        {/* ABOUT SECTION - Personal story */}
        <AboutSection />
        
        {/* FAQ Section - Optional */}
        <Suspense fallback={<LoadingBlock />}>
          <LazyFAQ />
        </Suspense>
        
        {/* CTA BANNER - Convert to dashboard */}
        <CTABanner />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
