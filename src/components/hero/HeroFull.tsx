import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2000&q=80';
const HERO_VIDEO_POSTER =
  'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1400&q=70';
const HERO_VIDEO_SRC =
  'https://player.vimeo.com/external/443239466.sd.mp4?s=7d3182a9a3d93f4c52b58844f4a91821e75fcfcb&profile_id=165&oauth2_token_id=57447761';

const featureHighlights = [
  {
    label: 'Flowwise Agents',
    description: 'Adaptive wealth guidance that updates with your data.',
  },
  {
    label: 'Lifestyle Intelligence',
    description: 'Design rituals that keep your finances aligned with your goals.',
  },
  {
    label: 'Global Perspective',
    description: 'Cypress calm meets skyscraper ambition — your new baseline.',
  },
];

export const HeroFull = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Sunlit cypress beach leading into a modern skyline"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.35),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl space-y-6"
        >
          <Badge className="w-fit bg-white/10 text-white backdrop-blur-sm">Finance + Lifestyle</Badge>
          <h1 id="hero-heading" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Design Wealth. Live Free.
          </h1>
          <p className="max-w-3xl text-lg text-white/80 sm:text-xl">
            Your lifestyle, powered by financial intelligence. We harmonize personal rituals, capital flows, and
            global opportunities so every decision compounds toward freedom.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-14 rounded-full bg-emerald-500 px-8 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
              <Link to="/signup">Start My Journey →</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="h-14 rounded-full border-white/40 bg-white/10 px-8 text-lg text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <a href="/learn" aria-label="Explore how the Cheggie lifestyle system works">
                Explore the Framework
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-col gap-6 md:flex-row md:items-start"
        >
          <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-black/40 shadow-2xl shadow-black/60">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_VIDEO_POSTER}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-sm text-white/80">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
              Pexels lifestyle reel playing silently
            </div>
          </div>

          <ul className="grid flex-1 grid-cols-1 gap-4 text-base text-white/80 sm:grid-cols-2">
            {featureHighlights.map((item) => (
              <li key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">{item.label}</p>
                <p className="mt-3 text-lg text-white/90">{item.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFull;
