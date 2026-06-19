import { useState, FormEvent } from 'react';
import { 
  Ship, Plane, Truck, FileText, Warehouse, Phone, Mail, MapPin, 
  CheckCircle2, ArrowRight, Shield, Globe, Award, Sparkles, 
  HeartHandshake, ChevronRight, User, Briefcase, ChevronDown, Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab } from '../types';

interface LandingPageProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenQuote: () => void;
}

export default function LandingPage({ onTabChange, onOpenQuote }: LandingPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [cargoType, setCargoType] = useState('Seleccione...');
  const [detailMsg, setDetailMsg] = useState('');

  // Predefined service details and images links
  const portImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjeEzXVqqjELd0-3JxUoY31v64hOPK1dAl6XINJllM2Ob1PnbpEAkYcuRoOvlJKDb8uKsZqo86uB8o8NTKhAUVFFdCBBWkSGQ8tTBlrEe0bAX8OzZbkSHRbRQMXpv2ZAmxlBigHMg4a32_WUljbOt7D6UoagglVXW-j2rdkoEKOjYlr2GQxX5bc8GOprhI5UPvakTGFVZMMYoEa8aXxe6YdF8gWwFGR7jNCwCE7WdXdaX2tUg3cAr8j_8A-e-vahJXaoSuSvZSM88';
  const coldStorageImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB607SufZoZUBrIHgs3DeInV-GeygtIY5JdYOVD0q7OdmsBG33rrFy_jOIf7Gr1Q5VnNfJbHHerZmb2HbeH011SY0QzuQy7uoXlI8bSjDXQrNxj6z3x96soTe1ZqR5KUcpelHAc8uzRA70dgx3ZZJw8L5ovazuLfbaRATmhs8lK2eDz_tf9p7GMGpMBj1LqwNcHJ9NIiznWnE2gPH9Ar9AKRZtsyo5UAmyHZuRzqz2vwmZ55iCvQD6uk5o6Ccp5pMNxPKIqUPaW1-4';
  const globalRouteMap = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCX_89MzJMKQOUfocfihXHG8kxXrQLYGaroQsXCgxKYl0Y-FubLO57HxgHYMLeiqraDR7aWve_ElL6cqC4GRiTLP86l31p0k0dePJZ6tO_kezaBGh5CI2gRrnLF2VdJ8tPrt0PXWCUacBT_FupXS0S2q8ATfQrU0yz0BZYWTTFEVjV4U-Sjf0ooJ6BGoLNxB7716cM_I8hR31eqHUTRm5dd259MuTSwaPuX3fCbgJS_O-3CtdZdW8wWncEa1XpvRyybcCS6TWra-k';
  
  // Custom airplane generated image
  const airplaneImg = '/src/assets/images/cargo_plane_hangar_1781832583283.jpg';

  const handleQuickFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setFormSubmitted(true);
    setTimeout(() => {
      onOpenQuote();
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 2. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Hero background showing large cargo ships and cranes at a busy port during sunset, conveying global scale and logistics capability" 
            className="w-full h-full object-cover scale-105 filter brightness-95" 
            src={portImg}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-secondary-container/20 border border-secondary-container/30 text-secondary-container px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Líderes en Logística de Exportación e Importación
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white max-w-5xl tracking-tight leading-tight md:leading-none mb-6 drop-shadow-xl"
          >
            Tu carga, en cualquier parte del mundo, <span className="text-secondary-container decoration-2">sin complicaciones</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-surface-container-highest max-w-3xl mb-12 drop-shadow-md font-sans font-light"
          >
            Casi 30 años de experiencia conectando Argentina con el mundo mediante transporte marítimo, aéreo y terrestre de alta tecnología.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <button
              onClick={onOpenQuote}
              className="bg-on-tertiary-container text-white text-sm font-bold px-10 py-4 rounded-xl hover:bg-tertiary transition-all hover:scale-105 active:scale-95 shadow-lg shadow-tertiary-container/20 flex items-center justify-center gap-2"
            >
              Cotizar mi envío
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTabChange('contacto')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 backdrop-blur-md flex items-center justify-center"
            >
              Hablar con un asesor
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Barra de confianza / Metrics */}
      <section className="relative z-20 -mt-16 max-w-6xl mx-auto w-full px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-8 shadow-xl border border-outline-variant/40"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y divide-outline-variant/30 lg:divide-y-0 lg:divide-x">
            <div className="flex flex-col items-center pt-4 lg:pt-0">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-secondary tracking-tight mb-2">+29</span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-mono">Años de Experiencia</span>
            </div>
            <div className="flex flex-col items-center pt-4 lg:pt-0">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-secondary tracking-tight mb-2">+50k</span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-mono">Envíos Gestionados</span>
            </div>
            <div className="flex flex-col items-center pt-4 lg:pt-0">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-secondary tracking-tight mb-2">60+</span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-mono">Países Conectados</span>
            </div>
            <div className="flex flex-col items-center pt-4 lg:pt-0">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-secondary tracking-tight mb-2">+1.5k</span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-mono">Clientes Activos</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Nuestros Servicios (Bento Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Soluciones Globales</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4 leading-tight">Logística Integral a su Medida</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min"
        >
          {/* Marítimo (Large Bento Entry) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 bg-white rounded-2xl p-8 border border-outline-variant/60 hover:shadow-xl hover:border-secondary-container transition-all duration-300 group flex flex-col justify-between min-h-[300px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center text-secondary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Ship className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-secondary bg-surface-container px-3 py-1 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">FCL / LCL</span>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-display font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Transporte Marítimo</h3>
              <p className="text-on-surface-variant font-sans text-sm md:text-base max-w-xl leading-relaxed mb-6">
                Soluciones integrales de fletes FCL/LCL, refrigerado inteligente (especialidad en reefers para frutas/carnes) y carga general desde/hacia los principales puertos de América, Europa, Asia y África.
              </p>
            </div>
            <button 
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-secondary text-sm font-bold hover:gap-2 transition-all outline-none"
            >
              Consultar fletes marítimos <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Aéreo */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-outline-variant/60 hover:shadow-xl hover:border-secondary-container transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-surface-container text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Plane className="w-6 h-6" />
            </div>
            <div className="mt-6 flex-grow">
              <h3 className="text-lg font-display font-bold text-primary mb-2">Transporte Aéreo</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Envíos urgentes de alta prioridad, chárteres exclusivos y consolidaciones mundiales con acceso directo a bodegas aéreas de primer nivel.
              </p>
            </div>
            <button 
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-secondary text-xs font-bold hover:gap-2 transition-all group-hover:text-primary outline-none mt-4"
            >
              Saber más <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Terrestre */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-outline-variant/60 hover:shadow-xl hover:border-secondary-container transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-surface-container text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Truck className="w-6 h-6" />
            </div>
            <div className="mt-6 flex-grow">
              <h3 className="text-lg font-display font-bold text-primary mb-2">Transporte Terrestre</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Red confiable de camiones con cobertura local e internacional en el bloque de integración del Mercosur, garantizando entregas de última milla.
              </p>
            </div>
            <button 
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-secondary text-xs font-bold hover:gap-2 transition-all outline-none mt-4"
            >
              Saber más <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Aduana */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-outline-variant/60 hover:shadow-xl hover:border-secondary-container transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-surface-container text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <div className="mt-6 flex-grow">
              <h3 className="text-lg font-display font-bold text-primary mb-2">Despacho de Aduana</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Asesoría aduanera integral, clasificación arancelaria y despachos simplificados para agilizar la entrada y salida de mercancía.
              </p>
            </div>
            <button 
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-secondary text-xs font-bold hover:gap-2 transition-all outline-none mt-4"
            >
              Saber más <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Almacenaje */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-outline-variant/60 hover:shadow-xl hover:border-secondary-container transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-surface-container text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Warehouse className="w-6 h-6" />
            </div>
            <div className="mt-6 flex-grow">
              <h3 className="text-lg font-display font-bold text-primary mb-2">Almacenaje y Distribución</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Depósitos fiscales ubicados estratégicamente, control estricto de control de inventarios WMS y logística integrada de última milla.
              </p>
            </div>
            <button 
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-secondary text-xs font-bold hover:gap-2 transition-all outline-none mt-4"
            >
              Saber más <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Por qué elegirnos */}
      <section className="bg-surface py-24 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Garantía de Excelencia</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4 leading-tight">Por qué elegir a Interfresh Cargo</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Servicio Personalizado</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Asignamos ejecutivos de cuenta dedicados con respuestas inmediatas para entender tus requerimientos logísticos específicos.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Asesoramiento Experto</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Optimizamos las rutas físicas, costos portuarios y tiempos aduanales gracias a nuestro profundo conocimiento técnico del mercado.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Flexibilidad Extrema</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Adaptabilidad de contingencia ante huelgas, clima o bloqueos imprevistos para asegurar que la mercadería no sufra demoras graves.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Cobertura Global Completa</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Una red de agentes corresponsales sólidos establecidos en más de 60 países en sintonía con las principales regulaciones locales.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Seguridad y Blindaje</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Protocolos minuciosos de precinto, seguros todo riesgo personalizados y sistemas de monitoreo satelital continuo para tu tranquilidad.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-outline-variant/50 shadow-sm flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-2">Competitividad Tarifaria</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Tarifas negociadas por volumen directamente con navieras y aerolíneas líderes mundiales de primer nivel.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Cómo trabajamos (Proceso) */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Proceso Transparente</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4 leading-tight">Metodología de Trabajo</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[44%] left-[12%] right-[12%] h-[2px] bg-secondary/20 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4 shadow-sm border-4 border-white transition-transform hover:scale-105">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary bg-surface-container px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-mono">Paso 1</span>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Cotización</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Análisis exhaustivo de requerimientos y emisión inmediata de propuesta comercial balanceada.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4 shadow-sm border-4 border-white transition-transform hover:scale-105">
                <Warehouse className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary bg-surface-container px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-mono">Paso 2</span>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Booking & Doc.</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Reserva de espacio certificado con las aerolíneas o navieras y confección de documentación de aduana.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4 shadow-sm border-4 border-white transition-transform hover:scale-105">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary bg-surface-container px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-mono">Paso 3</span>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Seguimiento</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Monitoreo satelital constante de coordenadas e informes automáticos de estado vía email/WhatsApp.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4 shadow-sm border-4 border-white transition-transform hover:scale-105">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary bg-surface-container px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-mono">Paso 4</span>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Entrega Final</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Arribo seguro al puerto receptor y coordinación de entrega ágil de última milla con el cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Especialización */}
      <section className="py-24 bg-white border-y border-outline-variant/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-on-tertiary-container bg-tertiary-fixed px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-on-tertiary-container"></span>
                </span>
                Carga Especializada
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-6 leading-snug">
                Expertos de Confianza en Cargas Sensibles
              </h2>
              <p className="text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed font-sans">
                Entendemos con precisión absoluta la criticidad de la temperatura y el tiempo. Somos referentes número uno en la logística de perecederos con tecnología de frío continua para evitar mermas financieras.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-on-surface">
                  <CheckCircle2 className="w-5.5 h-5.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-sm md:text-base">Exportación integral de frutas frescas y vegetales con control de atmósfera de reefer.</span>
                </li>
                <li className="flex items-start gap-3 text-on-surface">
                  <CheckCircle2 className="w-5.5 h-5.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-sm md:text-base">Logística certificada de carnes finas de exportación y pescados ultracongelados.</span>
                </li>
                <li className="flex items-start gap-3 text-on-surface">
                  <CheckCircle2 className="w-5.5 h-5.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-sm md:text-base">Cadena de frío ininterrumpida y trazable para fármacos biológicos y productos lácteos.</span>
                </li>
              </ul>

              <button 
                onClick={onOpenQuote}
                className="bg-primary hover:bg-primary-container text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
              >
                Consultar por Carga Sensible
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-2 scale-102 transform z-0" />
              <div className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/60">
                <img 
                  alt="Especialistas en carga refrigerada y sensible" 
                  className="w-full h-[400px] object-cover hover:scale-102 transition-transform duration-500" 
                  src={coldStorageImg}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cobertura Global Map section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center bg-surface relative">
        <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Presencia en Continentes</span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4 leading-tight">Conectamos Argentina con el Mundo</h2>
        <p className="text-on-surface-variant max-w-3xl mx-auto mb-12 font-sans text-sm md:text-base leading-relaxed">
          Rutas comerciales estratégicamente consolidadas hacia los centros económicos principales de importación, eliminando transbordos innecesarios.
        </p>

        <div className="relative rounded-2xl overflow-hidden bg-[#244f8f] shadow-2xl mb-12 border border-primary/20 max-w-5xl mx-auto">
          <img 
            alt="Mapa de rutas logísticas globales desde Argentina" 
            className="w-full h-auto object-contain opacity-95 mix-blend-screen py-4 md:py-8 px-2 md:px-6" 
            src={globalRouteMap}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md px-4 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold text-secondary-container tracking-wider flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-secondary-container animate-ping" />
            GLOBAL ROUTES ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-5xl mx-auto mt-8">
          <div className="border-l-2 border-secondary pl-4 py-2 hover:bg-white/40 transition-colors rounded-r-lg">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wide mb-1">Asia & Medio Oriente</h4>
            <p className="text-on-surface-variant text-xs leading-relaxed">Frecuencia directa cada 10 días a Shanghái, Singapur, Dubái, Busan y Yokohama.</p>
          </div>
          <div className="border-l-2 border-secondary pl-4 py-2 hover:bg-white/40 transition-colors rounded-r-lg">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wide mb-1">Norteamérica</h4>
            <p className="text-on-surface-variant text-xs leading-relaxed">Salidas fijas semanales con despacho consolidado en Miami, Houston y Nueva York.</p>
          </div>
          <div className="border-l-2 border-secondary pl-4 py-2 hover:bg-white/40 transition-colors rounded-r-lg">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wide mb-1">Europa</h4>
            <p className="text-on-surface-variant text-xs leading-relaxed">Conexión con agentes locales en Róterdam, Hamburgo, Amberes y puerto de Génova.</p>
          </div>
          <div className="border-l-2 border-secondary pl-4 py-2 hover:bg-white/40 transition-colors rounded-r-lg">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wide mb-1">Latinoamérica</h4>
            <p className="text-on-surface-variant text-xs leading-relaxed">Red consolidada terrestre de camiones térmicos y furgones en todo el Mercosur.</p>
          </div>
        </div>
      </section>

      {/* 9. CTA Final / Formulario */}
      <section className="bg-primary relative overflow-hidden py-24 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(255, 255, 255) 0%, transparent 20%)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10 items-center">
          <div>
            <span className="text-secondary-container font-mono text-xs font-bold uppercase tracking-widest block mb-4">¿Tiene dudas de flete?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-6 leading-tight">
              ¿Listo para optimizar su cadena de suministro?
            </h2>
            <p className="text-base md:text-lg text-primary-container font-light mb-10 leading-relaxed font-sans">
              Complete el formulario rápido y uno de nuestros expertos se pondrá en contacto en un plazo menor a 2 horas hábiles con una propuesta preliminar adaptada.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                <Mail className="w-5 h-5 text-secondary-container" />
                <div>
                  <div className="text-xs text-primary-container font-semibold font-mono">E-MAIL DIRECTO</div>
                  <div className="font-semibold text-white">cotizaciones@interfreshcargo.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-secondary-container" />
                <div>
                  <div className="text-xs text-primary-container font-semibold font-mono">SEDE CENTRAL</div>
                  <div className="font-semibold text-white">Buenos Aires, Argentina (Headquarters)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 text-xs font-mono text-secondary-container bg-primary/40 rounded-bl-xl rounded-tr-2xl">
              AUTO-REGISTRATION
            </div>

            <h3 className="text-xl font-display font-bold mb-6 text-white flex items-center gap-1.5">
              Solicitud de Contacto Rápido
            </h3>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary-container/20 border border-secondary-container/40 p-6 rounded-xl text-center flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="w-16 h-16 bg-secondary-container text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-secondary-container mb-2">¡Recibido con Éxito!</h4>
                <p className="text-surface-container-highest text-sm leading-relaxed max-w-sm mb-4">
                  Redirigiéndote ahora al asistente interactivo de cotización para que configures los detalles de tu flete inmediatamente.
                </p>
                <span className="text-xs text-secondary-container/80 flex items-center gap-1 font-mono">
                  Redireccionando <span className="animate-bounce">...</span>
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleQuickFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-primary-fixed mb-1.5 font-semibold flex items-center gap-1">
                      <User className="w-3 h-3 text-secondary-container" /> Nombre Completo
                    </label>
                    <input 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="bg-white/5 border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-sm h-11" 
                      placeholder="Ej. Juan Pérez" 
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-primary-fixed mb-1.5 font-semibold flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-secondary-container" /> Empresa
                    </label>
                    <input 
                      required
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      className="bg-white/5 border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-sm h-11" 
                      placeholder="Nombre de la empresa" 
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-primary-fixed mb-1.5 font-semibold flex items-center gap-1">
                      <Mail className="w-3 h-3 text-secondary-container" /> Correo Electrónico
                    </label>
                    <input 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="bg-white/5 border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-sm h-11" 
                      placeholder="email@empresa.com" 
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-primary-fixed mb-1.5 font-semibold flex items-center gap-1">
                      <Phone className="w-3 h-3 text-secondary-container" /> Teléfono Celular
                    </label>
                    <input 
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="bg-white/5 border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-sm h-11" 
                      placeholder="+54 9 11..." 
                      type="tel"
                    />
                  </div>
                </div>

                <div className="flex flex-col relative">
                  <label className="text-xs text-primary-fixed mb-1.5 font-semibold">Tipo de Carga</label>
                  <div className="relative">
                    <select 
                      value={cargoType}
                      onChange={(e) => setCargoType(e.target.value)}
                      className="w-full bg-primary border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white outline-none focus:border-secondary-container transition-all text-sm h-11 appearance-none"
                    >
                      <option className="text-on-background" value="Seleccione...">Seleccione...</option>
                      <option className="text-on-background" value="Carga General FCL">Carga General FCL</option>
                      <option className="text-on-background" value="Carga General LCL">Carga General LCL</option>
                      <option className="text-on-background" value="Perecederos / Reefer">Perecederos / Reefer</option>
                      <option className="text-on-background" value="Aéreo Express">Aéreo Express</option>
                    </select>
                    <div className="absolute right-3.5 top-3.5 text-white/55 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-primary-fixed mb-1.5 font-semibold">Detalles del Envío (Mensaje)</label>
                  <textarea 
                    value={detailMsg}
                    onChange={(e) => setDetailMsg(e.target.value)}
                    className="bg-white/5 border border-white/15 hover:border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-sm" 
                    placeholder="Escriba origen, destino aproximado, peso estimado o requisitos especiales de embalaje..." 
                    rows={3}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-on-tertiary-container hover:bg-tertiary text-white text-sm font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-95 shadow-md mt-2 flex items-center justify-center gap-1.5"
                >
                  Continuar Cotización Completa
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
