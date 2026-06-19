import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: '¿Qué documentación básica se requiere para realizar una exportación o importación?',
      answer: 'Para operar con éxito en comercio internacional, la documentación estándar obligatoria incluye: la Factura Comercial (Commercial Invoice), la Lista de Empaque detalla (Packing List), el Documento de Transporte internacional según la vía elegida (Bill of Lading marítimo, AWB aéreo, o CRT terrestre), y el Certificado de Origen si desea aplicar a exenciones mecánicas o acuerdos de libre comercio bilateral.'
    },
    {
      id: 'faq-2',
      question: '¿Cuál es la diferencia técnica entre los fletes marítimos FCL y LCL?',
      answer: 'FCL (Full Container Load) implica la contratación de un contenedor completo (habitualmente de 20 o 40 pies) de manera exclusiva para su mercadería, brindando mayor velocidad de tránsito y menor manipulación. LCL (Less than Container Load) o "consolidado" divide el espacio de un mismo contenedor entre múltiples importadores, pagando de manera proporcional únicamente según el volumen físico en metros cúbicos (CBM) o por el tonelaje de su carga.'
    },
    {
      id: 'faq-3',
      question: '¿Cómo funciona el seguro de transporte internacional todo riesgo de Interfresh Cargo?',
      answer: 'Nuestra póliza de seguro de tránsito internacional cubre pérdidas físicas, roturas de mercancía, robos, reclamaciones de avería gruesa marítima y eventuales interrupciones físicas de la cadena de frío debido a un fallo mecánico fortuito. La cobertura se activa de puerta a puerta (puerto de origen a almacén de destino) y cuenta con respaldo financiero de aseguradoras de primer nivel mundial.'
    },
    {
      id: 'faq-4',
      question: '¿Cómo se controla la temperatura y trazabilidad fitosanitaria de las cargas Reefer?',
      answer: 'Ofrecemos contenedores refrigerados "Reefer" equipados con tecnología activa de última generación. Instalamos dataloggers y transmisores de posicionamiento GPS/IoT redundantes antes de precintar la unidad. Estos sensores miden y transmiten en vivo la temperatura ambiente, la humedad relativa, la apertura de puertas y la concentración de gases cada 10 minutos, garantizando la ininterrupción absoluta de la cadena de frío.'
    },
    {
      id: 'faq-5',
      question: '¿Qué relevancia tienen los Incoterms al solicitar mi cotización de fletes?',
      answer: 'Los Incoterms (International Commercial Terms) son términos internacionales normalizados que regulan de manera estricta qué parte asume los costes del transporte, en qué punto exacto del globo se transfiere el riesgo operativo de la mercadería y quién efectúa los trámites y tributos aduaneros. Para brindarle un presupuesto de flete 100% exacto, es fundamental definir si la negociación es bajo condiciones FOB, Ex-Works (EXW), CIF o DDP, entre otras.'
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20" id="faq-section-container">
      {/* Title block */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full text-secondary text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>F.A.Q. Logística</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-3">
          Preguntas Frecuentes de Comercio Exterior
        </h2>
        <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Resuelva sus dudas e inquietudes operativas previas antes de enviar sus contenedores, contratar seguros o consolidar cargas críticas.
        </p>
      </div>

      {/* Accordion container */}
      <div className="space-y-3" id="faq-accordion-list">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? 'border-secondary/40 bg-white shadow-md' 
                  : 'border-outline-variant/60 bg-white/70 hover:bg-white hover:border-slate-300'
              }`}
              id={`faq-card-${faq.id}`}
            >
              <button
                onClick={() => handleToggle(faq.id)}
                className="w-full select-none text-left px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 font-sans focus:outline-none"
                id={`faq-btn-${faq.id}`}
                aria-expanded={isOpen}
              >
                <span className={`text-xs md:text-sm font-bold tracking-tight transition-colors duration-300 ${
                  isOpen ? 'text-secondary' : 'text-primary'
                }`}>
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                      isOpen ? 'text-secondary font-bold' : 'text-slate-400'
                    }`} />
                  </motion.div>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-slate-100 pt-3">
                      <p className="text-xs md:text-[13px] text-on-surface-variant leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
