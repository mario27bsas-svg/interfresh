import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Ship, Plane, Truck, CheckCircle2, Clock, Calendar, 
  Map, ArrowRight, HeartHandshake, RefreshCw, Layers, ShieldCheck, 
  Compass, AlertCircle, FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteRequest } from '../types';

interface TrackPageProps {
  initialQuoteId?: string;
}

// Pre-seeded actual logistics tracking records
const PRE_SEEDED_SHIPMENTS: Record<string, {
  ref: string;
  client: string;
  origin: string;
  destination: string;
  cargo: string;
  type: string;
  status: 'PENDIENTE_REVISION' | 'APROBADO' | 'EN_TRANSITO' | 'ENTREGADO';
  currentStep: number;
  timeline: { title: string; location: string; date: string; desc: string; done: boolean }[];
}> = {
  'IFC-89241': {
    ref: 'IFC-89241',
    client: 'Frigorífico Córdoba S.A.',
    origin: 'Córdoba, Argentina',
    destination: 'Hamburgo, Alemania',
    cargo: '18,500 kg - Carne Congelada (Reefer Reefer)',
    type: 'maritime',
    status: 'EN_TRANSITO',
    currentStep: 2,
    timeline: [
      { title: 'Confección de Booking y Documentación local', location: 'Córdoba, AR', date: '12 Jun 2026', desc: 'Reserva aprobada con Hamburg Süd. Confección de guía de exportación y certificados del SENASA.', done: true },
      { title: 'Liberación de Aduana y Consolidación de Puerto', location: 'Puerto de Buenos Aires, AR', date: '14 Jun 2026', desc: 'Despacho de puerto completado. Verificación física del sensor de temperatura activo en -18 °C.', done: true },
      { title: 'Zarpado de Nave Portacontenedores', location: 'Océano Atlántico Sur', date: '16 Jun 2026', desc: 'En tránsito marítimo a bordo del buque "Monte Olivia". Coordenadas satelitales ETA Hamburgo 28 Jun.', done: true },
      { title: 'Arribo a Puerto de Reclamo y Aduana Europea', location: 'Puerto de Hamburgo, DE', date: 'Pendiente', desc: 'Inspección de importación europea y liberación de aduana por agente receptor.', done: false },
    ]
  },
  'IFC-74128': {
    ref: 'IFC-74128',
    client: 'TechImport SRL',
    origin: 'Shenzhen, China',
    destination: 'Buenos Aires, Argentina',
    cargo: '2,400 kg - Componentes Electrónicos de Computadora',
    type: 'aviation',
    status: 'ENTREGADO',
    currentStep: 4,
    timeline: [
      { title: 'Carga recibida en bodega Aeropuerto Hong Kong', location: 'Hong Kong (HKG)', date: '08 Jun 2026', desc: 'Recepción física y cubicaje de pallets de alta densidad aprobados con aerolínea carguera.', done: true },
      { title: 'Vuelo en tránsito internacional', location: 'Vuelo Qatar Cargo QR-811', date: '10 Jun 2026', desc: 'Arribo de tránsito en Doha y despacho directo al vuelo receptor de Ezeiza sin novedades.', done: true },
      { title: 'Arribo y Desaduanamiento fiscal', location: 'Ezeiza (EZE), Buenos Aires', date: '12 Jun 2026', desc: 'Aduana liberada con canal verde. Almacenaje temporal en depósito fiscal certificado de Interfresh Cargo.', done: true },
      { title: 'Entrega final en planta puerta a puerta', location: 'Buenos Aires, AR', date: '14 Jun 2026', desc: 'Carga recibida conforme por el cliente con precinto original intacto.', done: true },
    ]
  }
};

export default function TrackPage({ initialQuoteId = '' }: TrackPageProps) {
  const [searchId, setSearchId] = useState(initialQuoteId);
  const [foundShipment, setFoundShipment] = useState<any>(null);
  const [searchError, setSearchError] = useState('');
  const [activeTrackingList, setActiveTrackingList] = useState<QuoteRequest[]>([]);

  // Load from local storage dynamically
  useEffect(() => {
    const raw = localStorage.getItem('interfresh_quotes');
    if (raw) {
      try {
        const list: QuoteRequest[] = JSON.parse(raw);
        setActiveTrackingList(list);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleSearch = (idToSearch?: string) => {
    const id = (idToSearch || searchId).trim().toUpperCase();
    if (!id) return;

    setSearchError('');
    
    // Check in pre-seeded fletes list
    if (PRE_SEEDED_SHIPMENTS[id]) {
      setFoundShipment(PRE_SEEDED_SHIPMENTS[id]);
      return;
    }

    // Check in user generated local storage quotes list
    const foundLocal = activeTrackingList.find(q => q.id.toUpperCase() === id);
    if (foundLocal) {
      // Build a beautiful timeline for user generated quotes!
      const stepIndex = foundLocal.status === 'ENTREGADO' ? 4 : foundLocal.status === 'EN_TRANSITO' ? 2 : 1;
      const computedTimeline = [
        { 
          title: 'Cotización Aceptada y Registro de Orden', 
          location: `${foundLocal.origin.city}, ${foundLocal.origin.country}`, 
          date: new Date(foundLocal.timestamp).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }), 
          desc: 'Servicio registrado bajo los estándares comerciales de Interfresh Cargo. Preparando documentación.', 
          done: true 
        },
        { 
          title: 'Consolidación de Carga & Asignación de Bodega', 
          location: `${foundLocal.origin.city}, AR`, 
          date: 'Fase de Planificación', 
          desc: `Preparando cubicaje de ${foundLocal.cargo.weight} kg con transporte ${foundLocal.preferences.deliverySpeed === 'priority' ? 'Aéreo Prioritario' : 'Marítimo FCL'}.`, 
          done: stepIndex >= 2 
        },
        { 
          title: 'Despacho de Puerto y Tránsito Internacional', 
          location: 'Hub de Tránsito', 
          date: 'Pendiente', 
          desc: `Nave de transporte en tránsito directo a ${foundLocal.destination.city}. Se emitirán alertas de coordenadas satelitales.`, 
          done: stepIndex >= 3 
        },
        { 
          title: 'Llegada y Liberación de Aduana en Destino', 
          location: `${foundLocal.destination.city}, ${foundLocal.destination.country}`, 
          date: 'Pendiente', 
          desc: 'Recepción aduanera final en destino regulador.', 
          done: stepIndex >= 4 
        }
      ];

      setFoundShipment({
        ref: foundLocal.id,
        client: foundLocal.company || foundLocal.fullName,
        origin: `${foundLocal.origin.city}, ${foundLocal.origin.country}`,
        destination: `${foundLocal.destination.city}, ${foundLocal.destination.country}`,
        cargo: `${foundLocal.cargo.weight.toLocaleString()} kg - Carga ${foundLocal.cargo.type}`,
        type: foundLocal.preferences.deliverySpeed === 'priority' ? 'aviation' : 'maritime',
        status: foundLocal.status,
        currentStep: stepIndex,
        timeline: computedTimeline
      });
      return;
    }

    setFoundShipment(null);
    setSearchError('El código ingresado no coincide con ningún flete o cotización activa. Verifique el formato (ej. IFC-89241).');
  };

  // Trigger search on mount if initialQuoteId presents
  useEffect(() => {
    if (initialQuoteId) {
      handleSearch(initialQuoteId);
    }
  }, [initialQuoteId, activeTrackingList]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 flex flex-col items-center">
      
      {/* Header section */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold text-primary mb-3">Rastreo de Carga Internacional</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Acceda en tiempo real a la telemetría, estado aduanero y coordenadas satelitales de fletes controlados bajo la red de Interfresh Cargo.
        </p>
      </div>

      {/* Search Input bar */}
      <div className="w-full max-w-2xl bg-white border border-outline-variant/50 p-3 rounded-2xl shadow-md mb-12 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-grow w-full relative">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ingrese código de seguimiento (ej. IFC-89241)"
            className="w-full pl-11 pr-4 py-3 h-12 bg-surface hover:bg-neutral-100/50 rounded-xl outline-none border border-outline/30 focus:border-secondary focus:bg-white text-sm font-mono tracking-wider transition-all placeholder-on-surface-variant/40"
          />
          <Search className="w-5 h-5 text-outline absolute left-4 top-3.5" />
        </div>
        <button
          onClick={() => handleSearch()}
          className="w-full sm:w-auto bg-primary hover:bg-primary-container text-white px-6 h-12 text-sm font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-95 shadow-md flex items-center justify-center gap-2 select-none"
        >
          <Compass className="w-4 h-4" /> Buscar Carga
        </button>
      </div>

      <AnimatePresence mode="wait">
        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-2xl p-4 bg-error-container/30 border border-error-container text-on-error-container rounded-xl flex items-start gap-3 text-sm mb-10"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{searchError}</span>
          </motion.div>
        )}

        {foundShipment ? (
          /* LIVE TELEMETRY DASHBOARD */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Cargo Specification card details */}
            <div className="lg:col-span-1 bg-white border border-outline-variant/60 rounded-2xl shadow-lg p-6 flex flex-col justify-between h-fit gap-6">
              <div>
                <div className="flex items-center gap-1.5 text-secondary text-xs uppercase font-mono font-bold mb-3 tracking-wider">
                  {foundShipment.type === 'aviation' ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
                  Flete {foundShipment.type === 'aviation' ? 'Aéreo' : 'Marítimo'}
                </div>
                
                <h3 className="text-2xl font-display font-extrabold text-primary leading-tight font-mono mb-1">
                  {foundShipment.ref}
                </h3>
                <span className="text-xs text-on-surface-variant font-medium block border-b border-outline-variant/30 pb-4 mb-4">
                  Cliente: <strong className="text-primary font-sans">{foundShipment.client}</strong>
                </span>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-outline uppercase font-mono font-bold block mb-1">Mercadería Embarcada</span>
                    <p className="text-sm text-primary font-semibold leading-relaxed">{foundShipment.cargo}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-outline uppercase font-mono font-bold block mb-1">Ruta Comercial</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Origen: <strong className="text-primary">{foundShipment.origin}</strong>
                      <br />
                      Destino: <strong className="text-primary">{foundShipment.destination}</strong>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-outline uppercase font-mono font-bold block mb-1">Seguro de Tránsito</span>
                    <span className="inline-flex items-center gap-1.5 bg-secondary-container/10 text-secondary text-[11px] px-2.5 py-0.5 rounded font-bold font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" /> PÓLIZA DE SEGURO IFC COMPLETA
                    </span>
                  </div>
                </div>
              </div>

              {/* Status card Badge */}
              <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/30 text-center mt-4">
                <span className="text-[10px] text-on-surface-variant uppercase font-mono block mb-1.5">Estado Operativo</span>
                <span className={`inline-block text-xs font-mono font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm text-white ${
                  foundShipment.status === 'ENTREGADO' ? 'bg-secondary bg-gradient-to-r from-secondary to-green-600' : 'bg-primary animate-pulse'
                }`}>
                  ● {foundShipment.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Right Interactive Tracking Progress Steps Map timeline */}
            <div className="lg:col-span-2 bg-white border border-outline-variant/60 rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="font-display text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-secondary animate-spin" /> Historial de Tracking Satelital
              </h3>

              {/* Connected vertical step updates */}
              <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
                {foundShipment.timeline.map((item: any, idx: number) => {
                  return (
                    <div key={idx} className="relative">
                      {/* Bullet circle icon indicator */}
                      <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 transition-colors ${
                        item.done 
                          ? 'bg-secondary border-white ring-4 ring-secondary-container/20' 
                          : 'bg-white border-outline-variant'
                      }`} />

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 mb-1.5">
                        <h4 className={`text-sm font-bold font-display ${item.done ? 'text-primary' : 'text-outline'}`}>
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant/80">
                          <span className="bg-surface-container px-2 py-0.5 rounded-md font-semibold">{item.location}</span>
                          <span className="flex items-center gap-1 text-outline"><Calendar className="w-3 h-3" /> {item.date}</span>
                        </div>
                      </div>

                      <p className="text-xs text-on-surface-variant leading-relaxed pl-1">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic decorative simulated route mapping graphic */}
              <div className="bg-surface product-card rounded-xl border border-outline-variant/30 overflow-hidden p-4 text-center mt-10">
                <div className="text-[10px] text-outline font-mono uppercase tracking-wider mb-2 font-semibold">Interfresh Cargo Terminal Telemetry Active</div>
                <div className="h-2 w-full bg-outline-variant/30 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-secondary to-transparent"
                  />
                  <div className="absolute top-0 bottom-0 left-0 bg-secondary" style={{ width: `${(foundShipment.currentStep / 4) * 100}%` }} />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-outline/80 mt-2 font-semibold">
                  <span>Booking</span>
                  <span>Port B.As</span>
                  <span>Transito</span>
                  <span>Aduana Import</span>
                  <span>Planta</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* NO SEARCH YET - Display interactive list of sample tracking codes */
          <motion.div
            key="empty-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl bg-white border border-outline-variant/50 rounded-2xl p-6 md:p-8 shadow-md text-center"
          >
            <div className="w-14 h-14 bg-surface-container rounded-full flex items-center justify-center text-secondary mx-auto mb-4">
              <Search className="w-6 h-6 animate-bounce" />
            </div>
            
            <h3 className="font-display text-lg font-bold text-primary mb-2">Configure su Operativa</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md mx-auto">
              Si acaba de solicitar una cotización paso a paso, use el número de referencia asignado. De forma alterna, pruebe con los siguientes códigos de cargamento de muestra:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
              <button
                onClick={() => {
                  setSearchId('IFC-89241');
                  handleSearch('IFC-89241');
                }}
                className="p-4 rounded-xl border border-outline-variant/40 hover:border-secondary hover:shadow-sm text-left transition-all h-28 flex flex-col justify-between group outline-none"
              >
                <div>
                  <span className="text-[10px] text-secondary font-mono font-bold tracking-wider uppercase block mb-1">FLETE MARÍTIMO DE PRUEBA</span>
                  <span className="font-bold text-sm text-primary font-mono group-hover:text-secondary">IFC-89241</span>
                </div>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1 leading-none mt-2">
                  Carne Congelada a Hamburgo <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button
                onClick={() => {
                  setSearchId('IFC-74128');
                  handleSearch('IFC-74128');
                }}
                className="p-4 rounded-xl border border-outline-variant/40 hover:border-secondary hover:shadow-sm text-left transition-all h-28 flex flex-col justify-between group outline-none"
              >
                <div>
                  <span className="text-[10px] text-secondary font-mono font-bold tracking-wider uppercase block mb-1">FLETE AÉREO DE PRUEBA</span>
                  <span className="font-bold text-sm text-primary font-mono group-hover:text-secondary">IFC-74128</span>
                </div>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1 leading-none mt-2">
                  Componentes IT desde Shenzhen <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>

            {/* List of custom local generated storage requests */}
            {activeTrackingList.length > 0 && (
              <div className="mt-10 border-t border-outline-variant/30 pt-8 text-left">
                <h4 className="font-display font-semibold text-primary text-sm mb-4 flex items-center gap-1">
                  <FileSpreadsheet className="w-4 h-4 text-secondary" /> Sus Cotizaciones Locales Registrada ({activeTrackingList.length})
                </h4>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {activeTrackingList.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSearchId(item.id);
                        handleSearch(item.id);
                      }}
                      className="p-3 bg-surface hover:bg-surface-container rounded-lg border border-outline-variant/35 flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs font-bold text-primary">{item.id}</span>
                        <span className="text-[10px] text-on-surface-variant leading-none">{item.origin.city} → {item.destination.city}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-secondary flex items-center gap-1">
                        Clic para rastrear <ArrowRight className="w-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
