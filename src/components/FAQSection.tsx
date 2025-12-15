import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/reveal';
import { GlassCard } from '@/components/ui/glass-card';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get FAQ items from translations
  const faqItems: FAQItem[] = t('faq.items', { returnObjects: true }) as FAQItem[];

  return (
    <section 
      id="faq" 
      data-agid="section-faq"
      className="relative py-24 bg-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </Reveal>

        {/* FAQ List */}
        <StaggerContainer className="max-w-3xl mx-auto space-y-4">
          {Array.isArray(faqItems) && faqItems.map((item, index) => (
            <StaggerItem key={index}>
              <GlassCard 
                className="cursor-pointer transition-all"
                padding="md"
                hover={false}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-agid={`faq-item-${index}`}
              >
                <button
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-medium text-white pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-slate-400"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-slate-400 leading-relaxed border-t border-white/10 mt-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FAQSection;
