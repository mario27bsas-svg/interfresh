import { motion } from 'motion/react';
import { Award, Shield, FileText, CheckCircle2, Navigation, MessageSquarePlus } from 'lucide-react';

export default function AboutCompany() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl">
        <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Quienes Somos</span>
        <h1 className="font-display text-4xl font-extrabold text-primary mb-3">Interfresh Cargo S.R.L.</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Casi tres décadas de compromiso inquebrantable liderando los fletes de exportación de Argentina hacia los principales centros primarios del mundo.
        </p>
      </div>

      {/* Grid Layout of Company details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 w-full">
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-extrabold text-primary leading-tight">
            Nuestra Historia y Posicionamiento como Líderes Regionales
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans">
            Establecidos a finales del siglo pasado en Buenos Aires, nacimos con la firme consigna de proveer metodologías de transporte altamente confiables y adaptadas para la industria alimentaria perecedera del Cono Sur. 
          </p>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans">
            Con el correr de los años y el afianzamiento de la globalización, expandimos con éxito nuestros horizontes hacia fletes secos industriales, componentes mecánicos de alta fidelidad, químicos regulados y cargas sobredimensionadas. Hoy formamos una de las redes más sólidas con presencia certificada en todos los continentes.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 text-left">
            <div className="border-l-2 border-secondary pl-4 py-2">
              <span className="text-2xl font-display font-extrabold text-secondary block">100%</span>
              <span className="text-xs text-on-surface-variant uppercase font-mono font-bold">Capital Argentina</span>
            </div>
            <div className="border-l-2 border-secondary pl-4 py-2">
              <span className="text-2xl font-display font-extrabold text-secondary block">IATA</span>
              <span className="text-xs text-on-surface-variant uppercase font-mono font-bold">Agente Acreditado</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-1.5 scale-102 transform" />
          <div className="relative z-10 w-full h-[380px] bg-gradient-to-tr from-primary to-secondary rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col justify-between text-white">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-secondary-container backdrop-blur-md">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-secondary-container">PROPÓSITO CORPORATIVO</span>
              <h3 className="text-2xl font-display font-black leading-tight mt-2 mb-3">Conectando Economías Locales Con Mercados Globales</h3>
              <p className="text-xs text-surface-container-highest max-w-md font-sans font-light leading-relaxed">
                Nuestra misión principal es erradicar las fricciones aduaneras y logísticas portuarias, permitiendo a los productores exportar con la misma agilidad que si estuvieran vendiendo localmente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certification details */}
      <div className="w-full py-12 border-t border-b border-outline-variant/35 bg-surface mb-20">
        <div className="text-center mb-10">
          <h3 className="font-display font-bold text-primary text-xl">Certificaciones de Calidad e Integridad Comercial</h3>
          <p className="text-xs text-on-surface-variant mt-1.5 font-mono">ESTÁNDARES INTERNACIONALES REGULADOS Y REGISTROS OFICIALES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto px-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant/40">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
              <h4 className="font-display font-bold text-sm text-primary">Agente de Carga OEA</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Homologación bajo Operador Económico Autorizado garantizando procesos logísticos blindados y seguros prioritarios en frontera.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant/40">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
              <h4 className="font-display font-bold text-sm text-primary">Certificados SENASA</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tratamientos fitosanitarios específicos para frutas frescas frescas, control riguroso de estiba, atmósferas y bodegas.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant/40">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
              <h4 className="font-display font-bold text-sm text-primary">Asociación IATA Direct</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Acreditación directa ante la Asociación de Transporte Aéreo Internacional para la reserva prioritaria de bodegas de fuselaje ancho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
