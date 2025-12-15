import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe, Check, ArrowRight } from 'lucide-react';

const HERO_IMAGE_URL = '/stitch_language_selection/stitch_language_selection/language_selection/screen.png';
const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2000&q=80';

// Updated language definitions - Latin Serbian + Mexican Spanish
const languages = [
  { code: 'sr-Latn', name: 'Srpski', nativeName: 'Srpski (latinica)', flag: '🇷🇸', description: 'Serbian - Latin script' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', description: 'English' },
  { code: 'es-MX', name: 'Español', nativeName: 'Español (MX)', flag: '🇲🇽', description: 'Mexican Spanish' },
];

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [imageLoaded, setImageLoaded] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = () => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    localStorage.setItem('languageSelected', 'true');
    
    // Navigate to home or return path
    const returnTo = (location.state as { returnTo?: string })?.returnTo || '/';
    navigate(returnTo);
  };

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950" data-agid="page-language">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Language selection background"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-2xl">
            <div className="text-center space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                    <Globe className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('languageSelection.title')}
                </h1>
                <p className="text-slate-400">
                  {t('languageSelection.subtitle')}
                </p>
              </motion.div>

              {/* Language Options */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid gap-3 pt-4"
              >
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <button
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`w-full h-16 flex items-center gap-4 px-5 rounded-xl transition-all duration-300 ${
                        selectedLanguage === lang.code 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                      data-agid={`lang-option-${lang.code}`}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-white">{lang.nativeName}</span>
                        <span className="text-sm text-slate-400 block">{lang.description}</span>
                      </div>
                      {selectedLanguage === lang.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500"
                        >
                          <Check className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="pt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 text-white"
                    onClick={handleContinue}
                    data-agid="lang-continue"
                  >
                    {t('languageSelection.continue')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Selected language indicator */}
              <motion.p
                key={selectedLanguage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-slate-500"
              >
                {selectedLang?.flag} {selectedLang?.nativeName}
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelection;