const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

let analyticsLoaded = false;

const loadGoogleAnalytics = () => {
  if (!GA_ID || analyticsLoaded || typeof window === 'undefined') {
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`
  );

  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    transport_type: 'beacon',
  });

  analyticsLoaded = true;
};

export const initializeAnalytics = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadGoogleAnalytics();
  } else {
    window.addEventListener('DOMContentLoaded', loadGoogleAnalytics, { once: true });
  }
};

declare global {
  interface Window {
    dataLayer?: Array<unknown>;
  }
}
