import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Latin Serbian + Mexican Spanish
const languages = [
  { code: 'sr-Latn', name: 'Srpski (latinica)', flag: '🇷🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es-MX', name: 'Español (MX)', flag: '🇲🇽' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('selectedLanguage', code);
    localStorage.setItem('languageSelected', 'true');
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          data-agid="lang-switcher"
        >
          <span className="text-xl">{currentLang.flag}</span>
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-slate-900/95 backdrop-blur-xl border-white/10 min-w-[180px]"
        data-agid="lang-dropdown"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-white/10 focus:bg-white/10 text-slate-200 hover:text-white"
            data-agid={`lang-switch-${lang.code}`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="flex-1 font-medium">{lang.name}</span>
            <AnimatePresence>
              {i18n.language === lang.code && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
