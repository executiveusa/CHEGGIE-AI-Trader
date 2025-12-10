import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const CTABanner = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl border bg-background/80 p-12 text-center shadow-glow backdrop-blur"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('ctaSection.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {t('ctaSection.subtitle')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-gradient-primary shadow-lg" asChild>
              <a href="/auth" className="flex items-center gap-2">
                {t('ctaSection.primary')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-2" asChild>
              <a href="#features">{t('ctaSection.secondary')}</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
