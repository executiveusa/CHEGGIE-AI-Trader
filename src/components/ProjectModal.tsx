import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image?: string;
  features?: string[];
  cta?: {
    text: string;
    href: string;
  };
}

export const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  features,
  cta,
}: ProjectModalProps) => {
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleEscapeKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onKeyDown={handleEscapeKey}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-border">
                <h2 id="modal-title" className="text-2xl font-bold text-foreground">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {image && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <p className="text-foreground/90 mb-6 leading-relaxed">
                  {description}
                </p>

                {features && features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-foreground/80"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xs mt-0.5">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cta && (
                <div className="px-6 py-4 border-t border-border bg-muted/30 flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6"
                  >
                    Close
                  </Button>
                  <Button
                    className="px-6 bg-gradient-primary"
                    asChild
                  >
                    <a href={cta.href} target="_blank" rel="noopener noreferrer">
                      {cta.text}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
