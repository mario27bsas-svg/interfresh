import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Plane, Phone, Mail, MapPin, Globe, ArrowRight, ShieldCheck, Ship, MessageSquare } from 'lucide-react';

// Type definitions
import { ActiveTab, QuoteRequest } from './types';

// Custom Child Components
import TopNavBar from './components/TopNavBar';
import LandingPage from './components/LandingPage';
import AboutCompany from './components/AboutCompany';
import ServicesInfo from './components/ServicesInfo';
import QuoteForm from './components/QuoteForm';
import TrackPage from './components/TrackPage';
import ContactForm from './components/ContactForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [trackedQuoteId, setTrackedQuoteId] = useState<string>('');

  // Handle auto-scroll to the top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenQuoteWizard = () => {
    setActiveTab('cotizador');
  };

  const handleQuoteCreated = (quote: QuoteRequest) => {
    // We can show feedback if needed
    console.log('Quote registered in application state:', quote);
  };

  const handleNavigateToTracking = (quoteId: string) => {
    setTrackedQuoteId(quoteId);
    setActiveTab('rastreo');
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans" id="app-root">
      
      {/* 1. Header Navigation */}
      <TopNavBar 
        activeTab={activeTab === 'cotizador' ? 'inicio' : activeTab}
        onTabChange={(tab) => {
          setTrackedQuoteId(''); // clear previous trackers
          setActiveTab(tab);
        }}
        onOpenQuote={handleOpenQuoteWizard}
      />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-grow pt-20" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full flex flex-col items-center"
          >
            {activeTab === 'inicio' && (
              <LandingPage 
                onTabChange={setActiveTab}
                onOpenQuote={handleOpenQuoteWizard}
              />
            )}

            {activeTab === 'empresa' && (
              <AboutCompany />
            )}

            {activeTab === 'servicios' && (
              <ServicesInfo 
                onOpenQuote={handleOpenQuoteWizard}
              />
            )}

            {activeTab === 'cotizador' && (
              <QuoteForm 
                onQuoteCreated={handleQuoteCreated}
                onNavigateToTracking={handleNavigateToTracking}
              />
            )}

            {activeTab === 'rastreo' && (
              <TrackPage 
                initialQuoteId={trackedQuoteId}
              />
            )}

            {activeTab === 'contacto' && (
              <ContactForm />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 2. Standard Footer */}
      <footer className="bg-primary text-white border-t border-white/10 pt-16 pb-12 select-none" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-10">
            {/* Column 1 - Brand & Description */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-white">
                  <Plane className="w-5 h-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  Interfresh Cargo
                </span>
              </div>
              <p className="text-primary-container text-xs leading-relaxed font-sans font-light max-w-xs">
                Logística internacional de alta tecnología para el Cono Sur y el resto del mundo. Despachos blindados, seguridad total e ingeniería refrigerada.
              </p>
            </div>

            {/* Column 2 - Quick Navigation */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">
                Navegación
              </h4>
              <ul className="space-y-2 text-xs font-medium text-primary-container">
                <li>
                  <button onClick={() => setActiveTab('inicio')} className="hover:text-white transition-colors duration-150 outline-none">
                    Página de Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('empresa')} className="hover:text-white transition-colors duration-150 outline-none">
                    Acerca de la Empresa
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('servicios')} className="hover:text-white transition-colors duration-150 outline-none">
                    Nuestras Soluciones
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('rastreo')} className="hover:text-white transition-colors duration-150 outline-none">
                    Trazabilidad de Carga
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Specialties */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">
                Especialidades
              </h4>
              <ul className="space-y-2 text-xs text-primary-container font-sans font-light">
                <li>Fletes Marítimos Reefers</li>
                <li>Charters Aéreos Prioritarios</li>
                <li>Logística Terrestre Mercosur</li>
                <li>Despachos y Gestión Fiscal</li>
              </ul>
            </div>

            {/* Column 4 - Direct Contact details */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">
                Ayuda y Consultas
              </h4>
              <ul className="space-y-3 text-xs text-primary-container">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-secondary-container" />
                  <span>+54 9 11 1234-5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-secondary-container" />
                  <span>info@interfreshcargo.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-secondary-container" />
                  <span>C.A.B.A., República Argentina</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-primary-container font-mono tracking-wider">
            <span>&copy; {new Date().getFullYear()} Interfresh Cargo S.R.L. Todos los derechos reservados.</span>
            <div className="flex gap-4 items-center">
              <span className="hover:text-white cursor-pointer transition-colors">Términos Comerciales</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition-colors">Políticas de Privacidad</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary-container" /> SECURE CONEXION
              </span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
