import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const gradientMap = ['from-primary to-accent', 'from-accent to-primary', 'from-secondary to-secondary-glow'];

export const IntegrationsSection = () => {
  const { t } = useTranslation();
  const stack = t('integrations.stack', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section id="integrations" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-primary text-xs uppercase">
            {t('integrations.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {stack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full overflow-hidden border-0 bg-card p-8 shadow-lg">
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradientMap[index % gradientMap.length]}`} />
                <h3 className="text-xl font-semibold mb-4">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
