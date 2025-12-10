import { Suspense, lazy } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroFull } from '@/components/hero/HeroFull';
import { Features } from '@/components/Features';
import { WorkflowSection } from '@/components/WorkflowSection';
import { IntegrationsSection } from '@/components/IntegrationsSection';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { Skeleton } from '@/components/ui/skeleton';

const MediaCards = () => (
  <section className="relative isolate bg-slate-950 py-20 text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_55%)]" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Finance Meets Lifestyle Mastery</h2>
        <p className="mt-4 text-lg text-white/70">
          Learn how Cheggie orchestrates your capital, habits, and decisions through intelligent agents and stunning
          visual storytelling.
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <FeatureCard
          title="Financial Independence Tools"
          description="Automated budgeting, allocations, and runway calculators synced with Flowise agents so you can act faster than the market."
          media={
            <img
              src="https://images.pexels.com/photos/6771609/pexels-photo-6771609.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Financial tools displayed on a laptop near the beach"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          }
        />
        <FeatureCard
          title="Lifestyle Design Framework"
          description="High-performance rituals, travel sprints, and wellness anchors curated for polyglot entrepreneurs living between cities."
          media={
            <img
              src="https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Person planning lifestyle goals with skyline view"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          }
        />
        <FeatureCard
          title="Wealth Intelligence Loop"
          description="A continuous improvement system that audits code, UI, and strategy nightly—opening PRs with actionable insights for your team."
          media={
            <img
              src="https://images.pexels.com/photos/7567567/pexels-photo-7567567.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Data visualization interface with futuristic skyline"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          }
        />
      </div>
    </div>
  </section>
);

const LazyDashboardShowcase = lazy(() => import('@/components/DashboardShowcase'));
const LazyPricing = lazy(() => import('@/components/Pricing'));
const LazyTestimonials = lazy(() => import('@/components/TestimonialsSection'));
const LazyFAQ = lazy(() => import('@/components/FAQSection'));

const LoadingBlock = () => (
  <div className="flex h-72 items-center justify-center bg-muted/20">
    <Skeleton className="h-16 w-16 rounded-full" />
    <Skeleton className="ml-6 h-8 w-48" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="pt-16" aria-labelledby="page-title">
        <HeroFull />
        <MediaCards />
        <Suspense fallback={<LoadingBlock />}>
          <LazyDashboardShowcase />
        </Suspense>
        <Features />
        <WorkflowSection />
        <IntegrationsSection />
        <Suspense fallback={<LoadingBlock />}>
          <LazyPricing />
        </Suspense>
        <Suspense fallback={<LoadingBlock />}>
          <LazyTestimonials />
        </Suspense>
        <Suspense fallback={<LoadingBlock />}>
          <LazyFAQ />
        </Suspense>
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
