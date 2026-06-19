import { useState } from 'react';
import { Menu, X, Phone, Anchor, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface TopNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenQuote: () => void;
}

export default function TopNavBar({ activeTab, onTabChange, onOpenQuote }: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'empresa', label: 'Empresa' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'rastreo', label: 'Rastreo de Envíos' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'wordpress', label: 'Exportar a WordPress' },
  ];

  const handleLinkClick = (tabId: ActiveTab) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-outline-variant fixed top-0 left-0 w-full z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick('inicio')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary">
            <Anchor className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-primary tracking-tight leading-none">
              Interfresh Cargo
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-secondary leading-none mt-1">
              Logística Global
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-200 outline-none ${
                    isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Button & Contact Info */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-on-surface-variant font-mono text-sm border-r border-outline-variant pr-6">
            <Phone className="w-4 h-4 text-secondary" />
            <span className="font-semibold">+54 9 11 1234-5678</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenQuote}
            className="bg-primary text-on-primary hover:bg-primary-container text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            id="nav-cta-btn"
          >
            Solicitar cotización
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary hover:text-secondary p-1 focus:outline-none"
          aria-label="Abrir menú"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-outline-variant overflow-hidden shadow-inner"
            id="mobile-menu-container"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-2 font-semibold text-base px-3 rounded-lg transition-colors ${
                      isActive ? 'bg-surface-container text-secondary' : 'hover:bg-surface text-on-surface-variant'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="h-px bg-outline-variant my-2" />
              <div className="flex justify-between items-center px-3 text-sm text-on-surface-variant font-mono">
                <span className="flex items-center gap-2 font-semibold">
                  <Phone className="w-4 h-4 text-secondary" />
                  +54 9 11 1234-5678
                </span>
              </div>
              <button
                onClick={() => {
                  onOpenQuote();
                  setMobileMenuOpen(false);
                }}
                className="bg-primary hover:bg-primary-container text-on-primary font-bold text-center py-3 rounded-lg text-sm transition-colors mt-2"
              >
                Solicitar cotización
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
