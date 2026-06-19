import { useState, FormEvent } from 'react';
import { 
  User, Briefcase, Mail, Phone, MapPin, PlaneTakeoff, PlaneLanding, 
  ChevronRight, ChevronLeft, Send, CheckCircle2, DollarSign, Archive, 
  Scale, Shield, Thermometer, Construction, AlertTriangle, FileText, Check,
  Ship, Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CargoType, DeliverySpeed, QuoteRequest, QuotePricing } from '../types';

interface QuoteFormProps {
  onQuoteCreated: (quote: QuoteRequest) => void;
  onNavigateToTracking: (quoteId: string) => void;
}

const COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brasil' },
  { code: 'DE', name: 'Alemania' },
  { code: 'ES', name: 'España' },
  { code: 'NL', name: 'Países Bajos' },
  { code: 'SG', name: 'Singapur' },
];

export default function QuoteForm({ onQuoteCreated, onNavigateToTracking }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteResult, setQuoteResult] = useState<QuoteRequest | null>(null);

  // Form State
  // Step 1: Contact & Route
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [originCountry, setOriginCountry] = useState('AR'); // Default origin is often Argentina for Interfresh Cargo
  const [destCity, setDestCity] = useState('');
  const [destCountry, setDestCountry] = useState('');

  // Step 2: Cargo Details
  const [cargoType, setCargoType] = useState<CargoType>('general');
  const [totalWeight, setTotalWeight] = useState<number | ''>('');
  const [packagesCount, setPackagesCount] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');

  // Step 3: Preferences
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('estandar');
  const [insurance, setInsurance] = useState(false);
  const [tempControl, setTempControl] = useState(false);
  const [fragile, setFragile] = useState(false);
  const [highSecurity, setHighSecurity] = useState(false);

  // Form Validations
  const validateStep1 = () => {
    return fullName && email && originCity && originCountry && destCity && destCountry;
  };

  const validateStep2 = () => {
    return cargoType && totalWeight && totalWeight > 0 && packagesCount && packagesCount > 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Automated Premium Pricing Calculator
  const calculatePricing = (): QuotePricing => {
    const weightNum = Number(totalWeight) || 10;
    
    // Weight & distance base formula
    let basePrice = weightNum * 3.25;
    if (cargoType === 'perecedera') basePrice *= 1.4;
    if (cargoType === 'peligrosa') basePrice *= 1.65;
    if (cargoType === 'sobredimensionada') basePrice *= 1.5;

    // Special handling fees
    let handlingSurcharge = 0;
    if (tempControl) handlingSurcharge += 380;
    if (fragile) handlingSurcharge += 150;
    if (highSecurity) handlingSurcharge += 290;

    // Delivery speed surcharge
    let deliverySurcharge = 0;
    if (deliverySpeed === 'express') deliverySurcharge = basePrice * 0.45 + 150;
    if (deliverySpeed === 'priority') deliverySurcharge = basePrice * 0.85 + 320;

    // Insurance fee
    const insuranceFee = insurance ? (weightNum * 0.25 + 180) : 0;

    const total = basePrice + handlingSurcharge + insuranceFee + deliverySurcharge;

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      handlingSurcharge: Math.round(handlingSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      deliverySurcharge: Math.round(deliverySurcharge * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    const calculatedPricing = calculatePricing();
    const referenceId = `IFC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newQuote: QuoteRequest = {
      id: referenceId,
      timestamp: new Date().toISOString(),
      fullName,
      company,
      email,
      phone,
      origin: {
        city: originCity,
        country: COUNTRIES.find(c => c.code === originCountry)?.name || originCountry
      },
      destination: {
        city: destCity,
        country: COUNTRIES.find(c => c.code === destCountry)?.name || destCountry
      },
      cargo: {
        type: cargoType,
        weight: Number(totalWeight) || 0,
        packagesCount: Number(packagesCount) || 0,
        length: Number(length) || 0,
        width: Number(width) || 0,
        height: Number(height) || 0
      },
      preferences: {
        deliverySpeed,
        insurance,
        needsTemperatureControl: tempControl || cargoType === 'perecedera',
        needsFragileHandling: fragile,
        needsExtraSecurity: highSecurity || cargoType === 'peligrosa'
      },
      pricing: calculatedPricing,
      status: 'PENDIENTE_REVISION'
    };

    // Save in LocalStorage list
    const existingRaw = localStorage.getItem('interfresh_quotes');
    const existingList: QuoteRequest[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(newQuote);
    localStorage.setItem('interfresh_quotes', JSON.stringify(existingList));

    // Propagate call
    onQuoteCreated(newQuote);
    setQuoteResult(newQuote);
  };

  const startNewQuote = () => {
    setQuoteResult(null);
    setCurrentStep(1);
    setFullName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setOriginCity('');
    setDestCity('');
    setTotalWeight('');
    setPackagesCount('');
    setLength('');
    setWidth('');
    setHeight('');
    setDeliverySpeed('estandar');
    setInsurance(false);
    setTempControl(false);
    setFragile(false);
    setHighSecurity(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 flex flex-col items-center">
      
      {/* Dynamic Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold text-primary mb-3">
          {quoteResult ? 'Cotización Procesada' : 'Solicitar Cotización'}
        </h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          {quoteResult 
            ? 'Hemos calculado un desglose de tarifa estimado. Guardado con éxito en su historial local.' 
            : 'Complete el formulario estructurado paso a paso para recibir una estimación confiable bajo los estándares de fletes de Interfresh Cargo.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {quoteResult ? (
          /* RESULT SCREEN - Success breakdown */
          <motion.div
            key="result-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl bg-white border border-outline-variant/60 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Alert bar */}
            <div className="bg-secondary text-white px-6 py-4 flex justify-between items-center bg-gradient-to-r from-primary to-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary-container" />
                <span className="font-mono text-sm font-semibold tracking-wider uppercase">REFERENCIA: {quoteResult.id}</span>
              </div>
              <span className="bg-white/15 px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider font-bold">
                Carga {quoteResult.cargo.type}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="text-sm font-semibold text-on-surface-variant font-mono uppercase mb-1">PRECIO TOTAL ESTIMADO (FLETES / SEGUROS)</div>
                <div className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight">
                  ${quoteResult.pricing.total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs text-on-surface-variant font-sans font-normal ml-1">USD</span>
                </div>
                <p className="text-xs text-on-surface-variant/80 mt-2 font-mono">Moneda de comercio exterior regulada bajo puertos de origen</p>
              </div>

              {/* Dynamic Map/Telemery Route representation */}
              <div className="bg-surface-container rounded-xl p-4 mb-8 flex flex-col md:flex-row justify-between items-stretch gap-4 border border-outline-variant/30">
                <div className="flex-1 flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-container shadow-sm">
                    <PlaneTakeoff className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">ORIGEN</span>
                    <span className="font-bold text-sm text-primary">{quoteResult.origin.city}, {quoteResult.origin.country}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center font-mono text-[10px] text-outline text-center border-t md:border-t-0 md:border-l border-outline-variant/50 pt-3 md:pt-0 md:pl-4">
                  <div className="flex md:flex-col items-center gap-1.5 px-3">
                    <div className="h-1.5 w-1.5 bg-secondary rounded-full animate-ping" />
                    <span>CARGA DIRECTA</span>
                  </div>
                </div>

                <div className="flex-1 flex gap-3 items-center border-t md:border-t-0 md:border-l border-outline-variant/50 pt-3 md:pt-0 md:pl-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-container shadow-sm">
                    <PlaneLanding className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">DESTINO</span>
                    <span className="font-bold text-sm text-primary">{quoteResult.destination.city}, {quoteResult.destination.country}</span>
                  </div>
                </div>
              </div>

              {/* Pricing split breakdown */}
              <h3 className="font-display text-base font-bold text-primary mb-4 flex items-center gap-1">
                <FileText className="w-4 h-4 text-secondary" /> Desglose Analítico de Tarifa
              </h3>

              <div className="divide-y divide-outline-variant/30 border border-outline-variant/40 rounded-xl overflow-hidden font-mono text-xs bg-surface-container-lowest mb-8">
                <div className="flex justify-between p-3.5">
                  <span className="text-on-surface-variant">Base Rate weight calculo (${(quoteResult.cargo.weight).toLocaleString()} kg)</span>
                  <span className="font-semibold text-primary">${quoteResult.pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-on-surface-variant">Speed Surcharge / Recargo de prioridad ({quoteResult.preferences.deliverySpeed.toUpperCase()})</span>
                  <span className="font-semibold text-primary">${quoteResult.pricing.deliverySurcharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-on-surface-variant">Especial Handling & cold chain precintos (Frágil / Reefer / Temp)</span>
                  <span className="font-semibold text-primary">${quoteResult.pricing.handlingSurcharge.toLocaleString()}</span>
                </div>
                {quoteResult.preferences.insurance && (
                  <div className="flex justify-between p-3.5 bg-secondary-container/10">
                    <span className="text-secondary font-semibold">Seguro todo riesgo póliza Interfresh Cargo</span>
                    <span className="font-bold text-secondary">${quoteResult.pricing.insuranceFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between p-4 bg-surface text-sm font-sans font-bold">
                  <span className="text-primary font-display font-extrabold uppercase">TOTAL ESTIMADO</span>
                  <span className="text-secondary font-display font-black">${quoteResult.pricing.total.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigateToTracking(quoteResult.id)}
                  className="flex-1 bg-secondary text-white font-bold py-3 px-6 rounded-xl text-sm transition-all hover:bg-opacity-95 shadow-md hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                >
                  Rastrear y ver ruta animada
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={startNewQuote}
                  className="bg-white hover:bg-surface border-2 border-outline-variant text-on-surface-variant font-bold py-3 px-6 rounded-xl text-xs transition-colors flex items-center justify-center"
                >
                  Cotizar otro flete
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MULTI-STEP WIZARD */
          <div className="w-full max-w-3xl bg-white border border-outline-variant/50 rounded-2xl shadow-xl p-6 md:p-10 relative">
            
            {/* Progress Indicator */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-secondary uppercase tracking-wider">
                  Paso {currentStep} de 3
                </span>
                <span className="text-xs font-semibold text-on-surface-variant font-sans">
                  {currentStep === 1 && 'Contacto & Origen/Destino'}
                  {currentStep === 2 && 'Detalles Físicos de la Carga'}
                  {currentStep === 3 && 'Preferencias de Entrega & Seguros'}
                </span>
              </div>
              <div className="flex gap-2.5 h-1.5">
                {[1, 2, 3].map((step) => {
                  const isActive = step <= currentStep;
                  return (
                    <div
                      key={step}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-secondary' : 'bg-surface-variant'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="outline-none">
              
              {/* STEP 1: CONTACT & ROUTE */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-lg font-bold text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-secondary" /> Información del Solicitante
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Nombre Completo <span className="text-error">*</span></label>
                      <div className="relative">
                        <input
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all placeholder-on-surface-variant/40"
                          placeholder="Ej. Juan Pérez"
                          type="text"
                        />
                        <User className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Empresa</label>
                      <div className="relative">
                        <input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all placeholder-on-surface-variant/40"
                          placeholder="Nombre comercial"
                          type="text"
                        />
                        <Briefcase className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Correo Electrónico <span className="text-error">*</span></label>
                      <div className="relative">
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all placeholder-on-surface-variant/40"
                          placeholder="correo@empresa.com"
                          type="email"
                        />
                        <Mail className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Teléfono Celular <span className="text-error">*</span></label>
                      <div className="relative">
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all placeholder-on-surface-variant/40"
                          placeholder="+54 9 11 1234-5678"
                          type="tel"
                        />
                        <Phone className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                      </div>
                    </div>
                  </div>

                  <h2 className="font-display text-lg font-bold text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-1.5 pt-4">
                    <MapPin className="w-4 h-4 text-secondary" /> Origen & Destino del Flete
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/40 relative">
                      <div className="absolute top-4 right-4 text-outline">
                        <PlaneTakeoff className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-bold text-primary mb-3 font-mono tracking-wider uppercase">Punto de Origen</h3>
                      
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <label className="text-[11px] font-semibold text-on-surface-variant mb-1">Ciudad <span className="text-error">*</span></label>
                          <input
                            required
                            value={originCity}
                            onChange={(e) => setOriginCity(e.target.value)}
                            className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                            placeholder="Ej. Buenos Aires"
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[11px] font-semibold text-on-surface-variant mb-1">País <span className="text-error">*</span></label>
                          <select
                            value={originCountry}
                            onChange={(e) => setOriginCountry(e.target.value)}
                            className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                          >
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/40 relative">
                      <div className="absolute top-4 right-4 text-outline">
                        <PlaneLanding className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-bold text-primary mb-3 font-mono tracking-wider uppercase">Punto de Destino</h3>

                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <label className="text-[11px] font-semibold text-on-surface-variant mb-1">Ciudad <span className="text-error">*</span></label>
                          <input
                            required
                            value={destCity}
                            onChange={(e) => setDestCity(e.target.value)}
                            className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                            placeholder="Ej. Miami"
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[11px] font-semibold text-on-surface-variant mb-1">País <span className="text-error">*</span></label>
                          <select
                            required
                            value={destCountry}
                            onChange={(e) => setDestCountry(e.target.value)}
                            className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                          >
                            <option value="">Seleccione país receptor</option>
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CARGO DETAILS */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-lg font-bold text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-1.5">
                    <Archive className="w-4 h-4 text-secondary" /> Parámetros de la Carga
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col md:col-span-3">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Clasificación / Tipo de Mercadería <span className="text-error">*</span></label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          { id: 'general', label: 'General', desc: 'No perecedero' },
                          { id: 'perecedera', label: 'Perecedera', desc: 'Control de frío' },
                          { id: 'peligrosa', label: 'Peligrosa', desc: 'Clase IMO' },
                          { id: 'sobredimensionada', label: 'Sobredimensionada', desc: 'Break Bulk' },
                        ].map((item) => {
                          const isSel = cargoType === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setCargoType(item.id as CargoType)}
                              className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all outline-none h-20 ${
                                isSel 
                                  ? 'border-secondary bg-surface-container-high text-primary scale-102 ring-1 ring-secondary' 
                                  : 'border-outline/40 hover:border-outline'
                              }`}
                            >
                              <span className="text-xs font-bold font-display">{item.label}</span>
                              <span className="text-[10px] text-on-surface-variant">{item.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Peso Neto Total (kg) <span className="text-error">*</span></label>
                      <div className="relative">
                        <input
                          required
                          min="1"
                          value={totalWeight}
                          onChange={(e) => setTotalWeight(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg px-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all"
                          placeholder="0.00"
                          type="number"
                        />
                        <span className="text-[10px] text-outline font-bold font-mono absolute right-4 top-4">KG</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Cantidad de Bultos <span className="text-error">*</span></label>
                      <input
                        required
                        min="1"
                        value={packagesCount}
                        onChange={(e) => setPackagesCount(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-white border border-outline hover:border-outline-variant rounded-lg px-4 py-2.5 text-sm h-11 focus:border-secondary outline-none transition-all"
                        placeholder="Cantidad"
                        type="number"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Volumen Estimado (CBM)</label>
                      <div className="bg-surface-container text-primary font-mono text-xs h-11 rounded-lg flex items-center justify-center font-bold border border-outline-variant/30">
                        {totalWeight && packagesCount 
                          ? `${Math.round(((Number(totalWeight) * 0.0028)) * 100) / 100} m³` 
                          : 'Pendiente'}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display text-sm font-bold text-primary pt-2">Dimensiones Totales Unitarias (cm)</h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-on-surface-variant mb-1">Largo (cm)</label>
                      <input
                        value={length}
                        onChange={(e) => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                        className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                        placeholder="L"
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-on-surface-variant mb-1">Ancho (cm)</label>
                      <input
                        value={width}
                        onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                        className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                        placeholder="W"
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-on-surface-variant mb-1">Alto (cm)</label>
                      <input
                        value={height}
                        onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                        className="bg-white border border-outline hover:border-outline-variant rounded-lg px-3 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                        placeholder="H"
                        type="number"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PREFERENCES & SERVICES */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-lg font-bold text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-secondary" /> Preferencias y Velocidad de Flete
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'estandar', label: 'Estándar', sub: 'Económico / Regular', icon: Ship },
                      { id: 'express', label: 'Express', sub: 'Rápido / Balanceado', icon: Truck },
                      { id: 'priority', label: 'Priority', sub: 'Crítico / Al instante', icon: PlaneTakeoff },
                    ].map((item) => {
                      const isSel = deliverySpeed === item.id;
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDeliverySpeed(item.id as DeliverySpeed)}
                          className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center transition-all outline-none min-h-[120px] ${
                            isSel 
                              ? 'border-secondary bg-surface-container text-primary ring-1 ring-secondary' 
                              : 'border-outline/40 hover:border-outline'
                          }`}
                        >
                          <IconComp className={`w-6 h-6 mb-2 ${isSel ? 'text-secondary' : 'text-outline'}`} />
                          <span className="text-xs font-bold font-display block">{item.label}</span>
                          <span className="text-[10px] text-on-surface-variant block mt-1">{item.sub}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Insurance Toggle - Glassmorphism card detail */}
                  <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/45 flex justify-between items-center">
                    <div>
                      <h4 className="font-display font-bold text-sm text-primary flex items-center gap-1">
                        <Shield className="w-4 h-4 text-secondary" /> Seguro de Carga Todo Riesgo
                      </h4>
                      <p className="text-on-surface-variant text-xs mt-1">
                        Ampara pérdidas físicas fortuitas o daños que sufran las mercaderías durante el flete.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={insurance}
                        onChange={(e) => setInsurance(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:height-5 after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>

                  <h3 className="font-display text-sm font-bold text-primary pt-2 flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-secondary" /> Requerimientos Especiales de Estiba
                  </h3>

                  <div className="flex flex-col gap-3 font-sans text-xs text-on-surface">
                    <label className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-outline-variant/30 hover:border-outline transition-colors cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={tempControl}
                        onChange={(e) => setTempControl(e.target.checked)}
                        className="rounded border-outline text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      />
                      <div>
                        <span className="font-semibold block text-primary group-hover:text-secondary transition-colors">Control activo de Temperatura (Refrigerados/Farma)</span>
                        <span className="text-[10px] text-on-surface-variant block">Mapeo continuo de frío para evitar desvíos biológicos</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-outline-variant/30 hover:border-outline transition-colors cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={fragile}
                        onChange={(e) => setFragile(e.target.checked)}
                        className="rounded border-outline text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      />
                      <div>
                        <span className="font-semibold block text-primary group-hover:text-secondary transition-colors">Embalaje y manipulación de Carga Frágil</span>
                        <span className="text-[10px] text-on-surface-variant block">Trincas reforzadas adicionales y etiquetas de manipulación</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-outline-variant/30 hover:border-outline transition-colors cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={highSecurity}
                        onChange={(e) => setHighSecurity(e.target.checked)}
                        className="rounded border-outline text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      />
                      <div>
                        <span className="font-semibold block text-primary group-hover:text-secondary transition-colors">Protocolo de Alta Seguridad (Alto Valor)</span>
                        <span className="text-[10px] text-on-surface-variant block">Monitoreo con custodia virtual portuaria satelital</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* ACTION FOOTER BUTTONS */}
              <div className="mt-10 pt-6 border-t border-outline-variant/40 flex justify-between items-center">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="border-2 border-primary hover:bg-surface text-primary text-xs font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-1.5 outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === 1 ? !validateStep1() : !validateStep2()}
                    className={`py-2.5 px-8 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1 outline-none ${
                      (currentStep === 1 ? validateStep1() : validateStep2())
                        ? 'bg-secondary text-white hover:bg-opacity-95' 
                        : 'bg-outline-variant/50 text-outline cursor-not-allowed'
                    }`}
                  >
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-on-tertiary-container hover:bg-tertiary text-white text-xs font-bold py-3 px-8 rounded-lg transition-all hover:scale-[1.01] shadow-md flex items-center gap-1.5 outline-none"
                  >
                    Enviar Solicitud <Send className="w-4 h-4 animate-bounce" />
                  </button>
                )}
              </div>

            </form>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
