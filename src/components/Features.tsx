import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Zap, FileText, Globe2 } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Brain,
    key: 'deepResearch',
    gradient: 'from-primary to-primary-glow',
  },
  {
    icon: Zap,
    key: 'realTime',
    gradient: 'from-accent to-primary',
  },
  {
    icon: FileText,
    key: 'reports',
    gradient: 'from-secondary to-secondary-glow',
  },
  {
    icon: Globe2,
    key: 'multilingual',
    gradient: 'from-primary to-accent',
  },
];

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all bg-gradient-card border-0">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 shadow-md`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
