import { Ship, Plane, Truck, FileText, Warehouse, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesInfo({ onOpenQuote }: { onOpenQuote: () => void }) {
  const list = [
    {
      title: 'Fletes Marítimos FCL / LCL',
      icon: Ship,
      desc: 'Transporte de contenedores completos (FCL) o consolidados de carga suelta (LCL). Manejo preciso de equipos especiales Open Top, Flat Rack, y unidades Reefer.',
      metric: 'Cada 10 días salidas directas'
    },
    {
      title: 'Fletes Aéreos Certificados',
      icon: Plane,
      desc: 'Soluciones críticas de alta prioridad y chárteres para cargas urgentes. Agentes autorizados IATA con conexiones de bodegas comerciales y exclusivas globales.',
      metric: 'Menos de 72 hs transito global'
    },
    {
      title: 'Transporte Terrestre Mercosur',
      icon: Truck,
      desc: 'Coordinación y estiba de camiones completos o parciales a lo largo de las rutas de Argentina, Brasil, Uruguay, Paraguay y Chile con posicionamiento satelital.',
      metric: 'Asesoramiento aduanero de frontera'
    },
    {
      title: 'Asesoría Aduanera y Documentación',
      icon: FileText,
      desc: 'Confección fiscal de certificados fitosanitarios, certificados de origen, despachos de aduana simplificados, liberaciones y clasificación arancelaria precisa.',
      metric: 'Canal de liberación óptimo'
    },
    {
      title: 'Depósitos y Frío Industrial',
      icon: Warehouse,
      desc: 'Almacenamiento exclusivo en depósitos fiscales controlados. Trazabilidad absoluta de cadena de frío y monitoreo térmico satelital continuo para frutas o fármacos.',
      metric: 'Monitoreo de -25°C a +15°C'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl">
        <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-2">Nuestras Unidades</span>
        <h1 className="font-display text-4xl font-extrabold text-primary mb-3">Servicios de Logística Internacional</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Diseñamos soluciones físicas e intelectuales de flete para que su mercadería arribe con absoluta protección y optimización de costos comerciales.
        </p>
      </div>

      {/* Grid of detailed units services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16">
        {list.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-outline-variant/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-secondary mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="border-t border-outline-variant/35 pt-4 mt-6">
                <span className="text-[10px] font-mono font-bold text-secondary-container bg-primary/15 px-3 py-1 rounded">
                  {item.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust reassurance banner */}
      <div className="bg-primary text-white rounded-2xl p-8 md:p-12 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 h-fit">
        <div>
          <h4 className="font-display font-bold text-xl mb-2 flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-secondary-container" /> Tránsitos Blindados con Coberturas
          </h4>
          <p className="text-primary-container text-xs max-w-md leading-relaxed font-sans font-light">
            Monitoreamos las 24 horas cada embarque. Proveemos seguros internacionales de flete contra todo riesgo para respaldar pérdidas financieras imprevistas.
          </p>
        </div>
        <button
          onClick={onOpenQuote}
          className="bg-white text-primary hover:bg-neutral-100 font-bold px-8 py-3.5 rounded-xl text-xs transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Iniciar Cotización de Fletes
        </button>
      </div>

    </div>
  );
}
