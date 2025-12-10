import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const WorkflowSection = () => {
  const { t } = useTranslation();
  const steps = t('workflow.steps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    caption: string;
  }>;

  return (
    <section id="workflow" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('workflow.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('workflow.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-0 bg-card/80 p-8 shadow-lg">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-lg font-semibold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                <p className="text-sm font-medium text-primary/80">{step.caption}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Button size="lg" className="bg-gradient-primary shadow-glow hover:shadow-xl transition-all" asChild>
            <a href="#pricing" className="flex items-center gap-2">
              {t('workflow.cta')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
