import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import {  useEffect, useState, type ReactNode } from "react";

// Types for popup configuration
export interface PopupCardProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  animation?: 'scale' | 'slide' | 'fade' | 'bounce';
  position?: 'center' | 'top' | 'bottom';
  customIcon?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const PopupCard = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  animation = 'scale',
  position = 'center',
  customIcon,
  footer,
  className = '',
}: PopupCardProps) => {
  
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-sm w-full mx-4',
    md: 'max-w-md w-full mx-4',
    lg: 'max-w-2xl w-full mx-4',
    xl: 'max-w-4xl w-full mx-4',
    full: 'max-w-[95vw] max-h-[95vh] w-full mx-4',
  };

  // Variant configurations
  const variantConfig = {
    default: {
      gradient: 'from-white via-gray-50 to-purple-50',
      border: 'border-gray-200/50',
      icon: <Info className="w-6 h-6 text-blue-500" />,
      iconBg: 'bg-blue-100',
    },
    success: {
      gradient: 'from-green-50 via-white to-emerald-50',
      border: 'border-green-200/50',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      iconBg: 'bg-green-100',
    },
    error: {
      gradient: 'from-red-50 via-white to-pink-50',
      border: 'border-red-200/50',
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      iconBg: 'bg-red-100',
    },
    warning: {
      gradient: 'from-yellow-50 via-white to-orange-50',
      border: 'border-yellow-200/50',
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      iconBg: 'bg-yellow-100',
    },
    info: {
      gradient: 'from-blue-50 via-white to-indigo-50',
      border: 'border-blue-200/50',
      icon: <Info className="w-6 h-6 text-blue-500" />,
      iconBg: 'bg-blue-100',
    },
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    scale: {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300,
        }
      },
      exit: { opacity: 0, scale: 0.8, y: 20 },
    },
    slide: {
      hidden: { opacity: 0, y: position === 'top' ? -100 : position === 'bottom' ? 100 : 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 300,
        }
      },
      exit: { opacity: 0, y: position === 'top' ? -100 : position === 'bottom' ? 100 : 50 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.3, rotate: -10 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 400,
        }
      },
      exit: { opacity: 0, scale: 0.3, rotate: 10 },
    },
  };

  // Position classes
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    bottom: 'items-end justify-center pb-16',
  };

  const currentVariant = variantConfig[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal Container */}
          <div className={`relative flex ${positionClasses[position]} w-full h-full p-4`}>
            <motion.div
              variants={modalVariants[animation] as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                relative ${sizeClasses[size]} 
                bg-gradient-to-br ${currentVariant.gradient}
                backdrop-blur-xl border ${currentVariant.border}
                rounded-3xl shadow-2xl
                max-h-[90vh] overflow-hidden
                ${className}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-tr-full" />

              {/* Header */}
              {(title || customIcon || showCloseButton) && (
                <div className="relative z-10 flex items-center justify-between p-6 pb-4">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    {(customIcon || currentVariant.icon) && (
                      <div className={`p-3 rounded-2xl ${currentVariant.iconBg} shadow-lg`}>
                        {customIcon || currentVariant.icon}
                      </div>
                    )}
                    
                    {/* Title */}
                    {title && (
                      <h2 className="text-[14px] md:text-2xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                        {title}
                      </h2>
                    )}
                  </div>

                  {/* Close Button */}
                  {showCloseButton && (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 rounded-xl bg-white/50 hover:bg-white/70 
                        backdrop-blur-sm border border-white/20 shadow-lg
                        text-gray-600 hover:text-gray-800 transition-all duration-200"
                      aria-label="Close popup"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 px-6 pb-6 overflow-y-auto modal-scrollbar max-h-[60vh]">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="relative z-10 px-6 py-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupCard;

// Hook for managing popup state
export const usePopup = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openPopup,
    closePopup,
    togglePopup,
  };
};
