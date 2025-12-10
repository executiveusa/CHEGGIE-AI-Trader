import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const DashboardShowcase = () => {
  const { t } = useTranslation();
  const metrics = t('dashboardShowcase.metrics', { returnObjects: true }) as Array<{
    label: string;
    value: string;
  }>;
  const highlights = t('dashboardShowcase.highlights', { returnObjects: true }) as Array<{
    badge: string;
    title: string;
    description: string;
  }>;

  return (
    <section id="overview" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {t('dashboardShowcase.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('dashboardShowcase.title')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('dashboardShowcase.description')}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="border-0 bg-gradient-card p-6 text-center shadow-md"
                >
                  <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative rounded-3xl border bg-card p-2 shadow-xl">
              <div className="absolute -left-10 top-10 hidden h-24 w-24 rounded-full bg-primary/10 blur-3xl md:block" />
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
                alt={t('dashboardShowcase.imageAlt')}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-6 -bottom-6 space-y-3 rounded-2xl border bg-background/95 p-6 shadow-lg backdrop-blur">
                {highlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <Badge className="mt-1 shrink-0 bg-gradient-primary text-xs uppercase">
                      {item.badge}
                    </Badge>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
