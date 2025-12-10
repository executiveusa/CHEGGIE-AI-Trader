import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const planConfigs = [
  { nameKey: 'free', detailsKey: 'freePlan' },
  { nameKey: 'pro', detailsKey: 'proPlan', highlightKey: 'popular' },
  { nameKey: 'enterprise', detailsKey: 'enterprisePlan' },
] as const;

export const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planConfigs.map((plan, index) => {
            const isPro = plan.detailsKey === 'proPlan';
            const planScope = `pricing.${plan.detailsKey}` as const;
            const features = t(`${planScope}.features`, {
              returnObjects: true,
            }) as string[];
            return (
              <motion.div
                key={plan.detailsKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={isPro ? 'md:-mt-4' : ''}
              >
                <Card className={`p-8 h-full relative ${
                  isPro ? 'border-primary shadow-glow bg-gradient-card' : 'bg-card'
                }`}>
                  {plan.highlightKey && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary">
                      {t(`${planScope}.${plan.highlightKey}`)}
                    </Badge>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {t(`pricing.${plan.nameKey}`)}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {t(`${planScope}.price`)}
                      </span>
                      <span className="text-muted-foreground">
                        {t(`${planScope}.period`)}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      isPro ? 'bg-gradient-primary shadow-glow' : ''
                    }`}
                    variant={isPro ? 'default' : 'outline'}
                  >
                    {t(`${planScope}.cta`)}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
