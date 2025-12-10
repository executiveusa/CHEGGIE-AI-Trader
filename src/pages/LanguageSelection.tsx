import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2000&q=80';

const languages = [
  { code: 'sr', name: 'Српски', nativeName: 'Српски', flag: '🇷🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
];

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('sr');
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleContinue = () => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    localStorage.setItem('languageSelected', 'true');
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
                  {t('languageSelection.title')}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {t('languageSelection.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid gap-4 pt-8"
              >
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <Button
                      variant={selectedLanguage === lang.code ? "default" : "outline"}
                      className={`w-full h-16 text-lg justify-start gap-4 transition-all duration-300 ${
                        selectedLanguage === lang.code 
                          ? 'ring-2 ring-primary shadow-lg shadow-primary/20' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedLanguage(lang.code)}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <span className="font-semibold">{lang.nativeName}</span>
                      {selectedLanguage === lang.code && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-xl"
                        >
                          ✓
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="pt-6"
              >
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 h-14 text-lg font-semibold"
                  onClick={handleContinue}
                >
                  {t('languageSelection.continue')}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelection;