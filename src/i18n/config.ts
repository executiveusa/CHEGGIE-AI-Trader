import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  sr: {
    translation: {
      nav: {
        features: 'Mogućnosti',
        pricing: 'Cene',
        about: 'O nama',
        contact: 'Kontakt',
        login: 'Prijava',
        signup: 'Registruj se',
        dashboard: 'Kontrolna tabla',
        overview: 'Pregled',
        workflow: 'Tok rada',
        integrations: 'Integracije',
        faq: 'Česta pitanja',
      },
      hero: {
        title: 'AI-Pokrenuta Analiza Akcija i Poslovanja',
        subtitle: 'Brže, jeftinije i preciznije od Wall Street analitičara',
        cta: 'Započnite besplatno',
        learnMore: 'Saznajte više',
        watchDemo: 'Pogledajte demo',
        callSales: 'Pozovite prodaju',
        callSalesAria: 'Pozovite tim za prodaju',
      },
      languageSelection: {
        title: 'Izaberite vaš jezik',
        subtitle: 'Počnite vašu finansijsku analizu',
        continue: 'Nastavi',
      },
      features: {
        title: 'Moćne AI mogućnosti',
        deepResearch: {
          title: 'Dubinsko istraživanje',
          description: 'AI-pokrenuta analiza u realnom vremenu',
        },
        realTime: {
          title: 'Analiza u realnom vremenu',
          description: 'Trenutni uvidi u tržište',
        },
        reports: {
          title: 'Detaljni izveštaji',
          description: 'Sveobuhvatna finansijska analiza',
        },
        multilingual: {
          title: 'Višejezična podrška',
          description: 'Dostupno na više jezika',
        },
      },
      faq: {
        title: 'Često postavljana pitanja',
        subtitle: 'Pronađite odgovore na česta pitanja',
        items: [
          {
            question: 'Šta je AI analiza akcija?',
            answer: 'Naša AI analiza koristi napredne algoritme za procenu akcija, vesti i tržišnih trendova kako bi pružila precizne uvide za pametno investiranje.',
          },
          {
            question: 'Koliko košta servis?',
            answer: 'Nudimo različite planove od besplatnog do enterprise nivoa. Pogledajte našu sekciju cena za više detalja.',
          },
          {
            question: 'Da li mogu da promenim jezik?',
            answer: 'Da, naša platforma podržava srpski, engleski i španski jezik. Jezik možete promeniti u bilo kojem trenutku.',
          },
        ],
      },
      testimonials: {
        title: 'Šta naši korisnici kažu',
        subtitle: 'Pridružite se hiljadama zadovoljnih investitora',
        items: [
          {
            quote: 'Ova platforma je promenila moj pristup investiranju. AI analize su neverovatno precizne.',
            author: 'Marko Petrović',
            role: 'Investitor',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
          },
          {
            quote: 'Najbolji alat za brzu i pouzdanu analizu. Preporučujem svim svojim klijentima.',
            author: 'Ana Jovanović',
            role: 'Finansijski savetnik',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
          },
          {
            quote: 'Koristim za analizu tržišta i planiranje poslovanja. Jednostavno odličan servis.',
            author: 'Stefan Nikolić',
            role: 'Preduzetnik',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
          },
        ],
      },
      dashboardShowcase: {
        badge: 'Pregled platforme',
        title: 'Tržišna inteligencija u realnom vremenu',
        description: 'Dobijte trenutan pristup sveobuhvatnoj analizi akcija sa veštačkom inteligencijom koja proučava hiljade izvora podataka.',
        imageAlt: 'Pregled kontrolne table',
        metrics: [
          { label: 'Aktivni korisnici', value: '10K+' },
          { label: 'Analize danas', value: '2.5K' },
          { label: 'Stopa uspeha', value: '99.9%' }
        ],
        highlights: [
          { badge: 'AI', title: 'Pametna analiza', description: 'Pokreće GPT-5' },
          { badge: 'BRZO', title: 'Podaci u realnom vremenu', description: 'Ažuriranja ispod sekunde' },
          { badge: 'SIGURNO', title: 'Bankarska sigurnost', description: '256-bitna enkripcija' }
        ]
      },
      workflow: {
        title: 'Kako funkcioniše',
        subtitle: 'Tri jednostavna koraka do pametnijeg investiranja',
        cta: 'Počnite sa analizom sada',
        steps: [
          {
            title: 'Unesite vaš upit',
            description: 'Pitajte o bilo kojoj akciji, sektoru ili poslovnoj ideji',
            caption: 'AI na prirodnom jeziku razume kontekst'
          },
          {
            title: 'AI dubinsko istraživanje',
            description: 'Multi-agentni sistem analizira hiljade podataka',
            caption: 'Vesti u realnom vremenu, dokumenti, sentiment, tehnička analiza'
          },
          {
            title: 'Dobijte izveštaj za akciju',
            description: 'Preuzmite PDF ili interaktivnu kontrolnu tablu',
            caption: 'Rezime, KPI, analiza rizika, prognoze'
          }
        ]
      },
      integrations: {
        badge: 'Tehnološki stek',
        title: 'Pokreće industrijske lidere',
        subtitle: 'Alati na nivou preduzeća za pouzdanu analizu',
        stack: [
          {
            name: 'OpenAI GPT-5',
            description: 'Napredno rezovanje i razumevanje prirodnog jezika'
          },
          {
            name: 'Tržišni podaci u realnom vremenu',
            description: 'Fidovi uživo sa glavnih berzi širom sveta'
          },
          {
            name: 'Oblačna infrastruktura',
            description: '99.9% vreme rada sa automatskim skaliranjem'
          }
        ]
      },
      ctaSection: {
        title: 'Spremni za pametnija investiranja?',
        subtitle: 'Pridružite se hiljadama investitora koji koriste AI analizu',
        primary: 'Počnite besplatnu probu',
        secondary: 'Saznajte više'
      },
      pricing: {
        title: 'Jednostavne, transparentne cene',
        subtitle: 'Izaberite plan koji odgovara vašim potrebama',
        monthly: 'Mesečno',
        yearly: 'Godišnje',
        free: 'Besplatno',
        pro: 'Pro',
        enterprise: 'Preduzeće',
        freePlan: {
          price: '$0',
          period: '/mesec',
          features: [
            '5 analiza mesečno',
            'Osnovni izveštaji',
            'Podrška e-poštom',
            'Standardni uvidi',
          ],
          cta: 'Počnite',
        },
        proPlan: {
          price: '$29',
          period: '/mesec',
          features: [
            '100 analiza mesečno',
            'Napredni izveštaji',
            'Prioritetna podrška',
            'AI dubinsko istraživanje',
            'Izvoz izveštaja',
          ],
          cta: 'Počnite',
          popular: 'Najpopularnije',
        },
        enterprisePlan: {
          price: 'Prilagođeno',
          period: '',
          features: [
            'Neograničene analize',
            'Posvećena podrška',
            'Prilagođeni modeli',
            'API pristup',
            'Afilirat program',
          ],
          cta: 'Kontaktirajte nas',
        },
      },
      common: {
        loading: 'Učitavanje...',
        error: 'Greška',
        success: 'Uspeh',
        cancel: 'Otkaži',
        save: 'Sačuvaj',
        delete: 'Obriši',
        edit: 'Uredi',
      },
    },
  },
  en: {
    translation: {
      nav: {
        features: 'Features',
        pricing: 'Pricing',
        about: 'About',
        contact: 'Contact',
        login: 'Login',
        signup: 'Sign Up',
        dashboard: 'Dashboard',
        overview: 'Overview',
        workflow: 'Workflow',
        integrations: 'Integrations',
        faq: 'FAQ',
      },
      hero: {
        title: 'AI-Powered Stock & Business Analysis',
        subtitle: 'Faster, cheaper, and more accurate than Wall Street analysts',
        cta: 'Start Free',
        learnMore: 'Learn More',
        watchDemo: 'Watch Demo',
        callSales: 'Call Sales',
        callSalesAria: 'Call sales team',
      },
      languageSelection: {
        title: 'Choose Your Language',
        subtitle: 'Start your financial analysis journey',
        continue: 'Continue',
      },
      features: {
        title: 'Powerful AI Capabilities',
        deepResearch: {
          title: 'Deep Research',
          description: 'AI-powered real-time analysis',
        },
        realTime: {
          title: 'Real-Time Analysis',
          description: 'Instant market insights',
        },
        reports: {
          title: 'Detailed Reports',
          description: 'Comprehensive financial analysis',
        },
        multilingual: {
          title: 'Multilingual Support',
          description: 'Available in multiple languages',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions',
        items: [
          {
            question: 'What is AI stock analysis?',
            answer: 'Our AI analysis uses advanced algorithms to evaluate stocks, news, and market trends to provide accurate insights for smart investing.',
          },
          {
            question: 'How much does the service cost?',
            answer: 'We offer various plans from free to enterprise level. Check our pricing section for more details.',
          },
          {
            question: 'Can I change the language?',
            answer: 'Yes, our platform supports Serbian, English, and Spanish. You can change the language at any time.',
          },
        ],
      },
      testimonials: {
        title: 'What Our Users Say',
        subtitle: 'Join thousands of satisfied investors',
        items: [
          {
            quote: 'This platform has transformed my approach to investing. The AI analysis is incredibly accurate.',
            author: 'John Smith',
            role: 'Investor',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
          },
          {
            quote: 'The best tool for quick and reliable analysis. I recommend it to all my clients.',
            author: 'Sarah Johnson',
            role: 'Financial Advisor',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
          },
          {
            quote: 'I use it for market analysis and business planning. Simply excellent service.',
            author: 'Michael Brown',
            role: 'Entrepreneur',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
          },
        ],
      },
      dashboardShowcase: {
        badge: 'Platform Overview',
        title: 'Real-Time Market Intelligence',
        description: 'Get instant access to comprehensive stock analysis powered by AI that studies thousands of data sources.',
        imageAlt: 'Dashboard preview',
        metrics: [
          { label: 'Active Users', value: '10K+' },
          { label: 'Analyses Today', value: '2.5K' },
          { label: 'Success Rate', value: '99.9%' }
        ],
        highlights: [
          { badge: 'AI', title: 'Smart Analysis', description: 'Powered by GPT-5' },
          { badge: 'FAST', title: 'Real-time Data', description: 'Sub-second updates' },
          { badge: 'SECURE', title: 'Bank-grade Security', description: '256-bit encryption' }
        ]
      },
      workflow: {
        title: 'How It Works',
        subtitle: 'Three simple steps to smarter investing',
        cta: 'Start Analyzing Now',
        steps: [
          {
            title: 'Enter Your Query',
            description: 'Ask about any stock, sector, or business idea',
            caption: 'Natural language AI understands context'
          },
          {
            title: 'AI Deep Research',
            description: 'Multi-agent system analyzes thousands of data points',
            caption: 'Real-time news, filings, sentiment, technicals'
          },
          {
            title: 'Get Actionable Report',
            description: 'Download PDF or interactive dashboard',
            caption: 'Executive summary, KPIs, risk analysis, forecasts'
          }
        ]
      },
      integrations: {
        badge: 'Technology Stack',
        title: 'Powered by Industry Leaders',
        subtitle: 'Enterprise-grade tools for reliable analysis',
        stack: [
          {
            name: 'OpenAI GPT-5',
            description: 'Advanced reasoning and natural language understanding'
          },
          {
            name: 'Real-Time Market Data',
            description: 'Live feeds from major exchanges worldwide'
          },
          {
            name: 'Cloud Infrastructure',
            description: '99.9% uptime with automatic scaling'
          }
        ]
      },
      ctaSection: {
        title: 'Ready to Make Smarter Investments?',
        subtitle: 'Join thousands of investors using AI-powered analysis',
        primary: 'Start Free Trial',
        secondary: 'Learn More'
      },
      pricing: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'Choose the plan that fits your needs',
        monthly: 'Monthly',
        yearly: 'Yearly',
        free: 'Free',
        pro: 'Pro',
        enterprise: 'Enterprise',
        freePlan: {
          price: '$0',
          period: '/month',
          features: [
            '5 analyses per month',
            'Basic reports',
            'Email support',
            'Standard insights',
          ],
          cta: 'Get Started',
        },
        proPlan: {
          price: '$29',
          period: '/month',
          features: [
            '100 analyses per month',
            'Advanced reports',
            'Priority support',
            'AI deep research',
            'Export reports',
          ],
          cta: 'Get Started',
          popular: 'Most Popular',
        },
        enterprisePlan: {
          price: 'Custom',
          period: '',
          features: [
            'Unlimited analyses',
            'Dedicated support',
            'Custom models',
            'API access',
            'Affiliate program',
          ],
          cta: 'Contact Us',
        },
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
      },
    },
  },
  es: {
    translation: {
      nav: {
        features: 'Características',
        pricing: 'Precios',
        about: 'Acerca de',
        contact: 'Contacto',
        login: 'Iniciar sesión',
        signup: 'Registrarse',
        dashboard: 'Panel de control',
        overview: 'Descripción general',
        workflow: 'Flujo de trabajo',
        integrations: 'Integraciones',
        faq: 'Preguntas frecuentes',
      },
      hero: {
        title: 'Análisis de Acciones y Negocios con IA',
        subtitle: 'Más rápido, más barato y más preciso que los analistas de Wall Street',
        cta: 'Comenzar gratis',
        learnMore: 'Saber más',
        watchDemo: 'Ver demostración',
        callSales: 'Llamar a ventas',
        callSalesAria: 'Llamar al equipo de ventas',
      },
      languageSelection: {
        title: 'Elige tu idioma',
        subtitle: 'Comienza tu viaje de análisis financiero',
        continue: 'Continuar',
      },
      features: {
        title: 'Potentes Capacidades de IA',
        deepResearch: {
          title: 'Investigación Profunda',
          description: 'Análisis en tiempo real con IA',
        },
        realTime: {
          title: 'Análisis en Tiempo Real',
          description: 'Información instantánea del mercado',
        },
        reports: {
          title: 'Informes Detallados',
          description: 'Análisis financiero completo',
        },
        multilingual: {
          title: 'Soporte Multiidioma',
          description: 'Disponible en varios idiomas',
        },
      },
      faq: {
        title: 'Preguntas Frecuentes',
        subtitle: 'Encuentra respuestas a preguntas comunes',
        items: [
          {
            question: '¿Qué es el análisis de acciones con IA?',
            answer: 'Nuestro análisis de IA utiliza algoritmos avanzados para evaluar acciones, noticias y tendencias del mercado para proporcionar información precisa para inversiones inteligentes.',
          },
          {
            question: '¿Cuánto cuesta el servicio?',
            answer: 'Ofrecemos varios planes desde gratis hasta nivel empresarial. Consulta nuestra sección de precios para más detalles.',
          },
          {
            question: '¿Puedo cambiar el idioma?',
            answer: 'Sí, nuestra plataforma admite serbio, inglés y español. Puedes cambiar el idioma en cualquier momento.',
          },
        ],
      },
      testimonials: {
        title: 'Lo Que Dicen Nuestros Usuarios',
        subtitle: 'Únete a miles de inversores satisfechos',
        items: [
          {
            quote: 'Esta plataforma ha transformado mi enfoque de inversión. El análisis de IA es increíblemente preciso.',
            author: 'Carlos García',
            role: 'Inversor',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
          },
          {
            quote: 'La mejor herramienta para análisis rápidos y confiables. Lo recomiendo a todos mis clientes.',
            author: 'María López',
            role: 'Asesora Financiera',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
          },
          {
            quote: 'Lo uso para análisis de mercado y planificación empresarial. Simplemente un servicio excelente.',
            author: 'Antonio Martínez',
            role: 'Empresario',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
          },
        ],
      },
      dashboardShowcase: {
        badge: 'Resumen de la plataforma',
        title: 'Inteligencia de mercado en tiempo real',
        description: 'Obtenga acceso instantáneo a análisis completo de acciones impulsado por IA que estudia miles de fuentes de datos.',
        imageAlt: 'Vista previa del panel',
        metrics: [
          { label: 'Usuarios activos', value: '10K+' },
          { label: 'Análisis hoy', value: '2.5K' },
          { label: 'Tasa de éxito', value: '99.9%' }
        ],
        highlights: [
          { badge: 'IA', title: 'Análisis inteligente', description: 'Impulsado por GPT-5' },
          { badge: 'RÁPIDO', title: 'Datos en tiempo real', description: 'Actualizaciones en menos de un segundo' },
          { badge: 'SEGURO', title: 'Seguridad bancaria', description: 'Cifrado de 256 bits' }
        ]
      },
      workflow: {
        title: 'Cómo funciona',
        subtitle: 'Tres simples pasos para invertir de forma más inteligente',
        cta: 'Comenzar a analizar ahora',
        steps: [
          {
            title: 'Ingrese su consulta',
            description: 'Pregunte sobre cualquier acción, sector o idea de negocio',
            caption: 'IA en lenguaje natural entiende el contexto'
          },
          {
            title: 'Investigación profunda de IA',
            description: 'Sistema multi-agente analiza miles de puntos de datos',
            caption: 'Noticias en tiempo real, presentaciones, sentimiento, análisis técnico'
          },
          {
            title: 'Obtenga informe accionable',
            description: 'Descargue PDF o panel interactivo',
            caption: 'Resumen ejecutivo, KPI, análisis de riesgo, pronósticos'
          }
        ]
      },
      integrations: {
        badge: 'Stack tecnológico',
        title: 'Impulsado por líderes de la industria',
        subtitle: 'Herramientas de nivel empresarial para análisis confiables',
        stack: [
          {
            name: 'OpenAI GPT-5',
            description: 'Razonamiento avanzado y comprensión del lenguaje natural'
          },
          {
            name: 'Datos de mercado en tiempo real',
            description: 'Fuentes en vivo de las principales bolsas de todo el mundo'
          },
          {
            name: 'Infraestructura en la nube',
            description: '99.9% de tiempo de actividad con escalado automático'
          }
        ]
      },
      ctaSection: {
        title: '¿Listo para hacer inversiones más inteligentes?',
        subtitle: 'Únete a miles de inversores que usan análisis impulsado por IA',
        primary: 'Comenzar prueba gratuita',
        secondary: 'Saber más'
      },
      pricing: {
        title: 'Precios Simples y Transparentes',
        subtitle: 'Elige el plan que se adapte a tus necesidades',
        monthly: 'Mensual',
        yearly: 'Anual',
        free: 'Gratis',
        pro: 'Pro',
        enterprise: 'Empresa',
        freePlan: {
          price: '$0',
          period: '/mes',
          features: [
            '5 análisis por mes',
            'Informes básicos',
            'Soporte por correo',
            'Información estándar',
          ],
          cta: 'Comenzar',
        },
        proPlan: {
          price: '$29',
          period: '/mes',
          features: [
            '100 análisis por mes',
            'Informes avanzados',
            'Soporte prioritario',
            'Investigación profunda con IA',
            'Exportar informes',
          ],
          cta: 'Comenzar',
          popular: 'Más Popular',
        },
        enterprisePlan: {
          price: 'Personalizado',
          period: '',
          features: [
            'Análisis ilimitados',
            'Soporte dedicado',
            'Modelos personalizados',
            'Acceso a API',
            'Programa de afiliados',
          ],
          cta: 'Contáctanos',
        },
      },
      common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        cancel: 'Cancelar',
        save: 'Guardar',
        delete: 'Eliminar',
        edit: 'Editar',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('selectedLanguage') || 'sr',
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
