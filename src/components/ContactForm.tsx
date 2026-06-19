import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-secondary font-mono text-xs font-bold uppercase tracking-widest block mb-1">Póngase en Contacto</span>
        <h1 className="font-display text-4xl font-extrabold text-primary mb-3">Atención al Cliente y Oficinas</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Nuestros asesores comerciales y ejecutivos de aduana operan las 24 horas para dar respuestas en tiempos críticos mercantiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full max-w-5xl mx-auto">
        
        {/* Office details */}
        <div className="space-y-8">
          <h2 className="font-display text-xl font-bold text-primary">Sede Central República Argentina</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-outline uppercase font-mono font-bold">Dirección Física</h4>
                <p className="text-sm text-primary font-semibold leading-relaxed">
                  Av. Alicia Moreau de Justo 1150, Puerto Madero<br />
                  C.A.B.A., C1107, Argentina.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-outline uppercase font-mono font-bold">Líneas de Atención Nacional</h4>
                <p className="text-sm text-primary font-semibold font-mono">
                  +54 11 4321-9876<br />
                  +54 9 11 1234-5678 (WhatsApp Comercial Adic)
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-outline uppercase font-mono font-bold">Correos Operativos</h4>
                <p className="text-sm text-primary font-semibold font-mono">
                  info@interfreshcargo.com<br />
                  aduanas@interfreshcargo.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-outline uppercase font-mono font-bold">Horarios de Mesa de Ayuda</h4>
                <p className="text-sm text-primary font-semibold">
                  Lunes a Viernes de 08:30 a 18:30 hs (UTC-3)<br />
                  Guardia de aduana operativa pasiva 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form cards */}
        <div className="bg-white border border-outline-variant/60 rounded-2xl p-6 md:p-8 shadow-lg">
          <h3 className="font-display text-lg font-bold text-primary mb-4">Consultas Generales</h3>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Nombre Completo</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-surface hover:bg-neutral-100/50 border border-outline hover:border-outline-variant rounded-lg px-4 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Correo Electrónico</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface hover:bg-neutral-100/50 border border-outline hover:border-outline-variant rounded-lg px-4 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                  placeholder="ejemplo@empresa.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Teléfono</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-surface hover:bg-neutral-100/50 border border-outline hover:border-outline-variant rounded-lg px-4 py-2 text-sm focus:border-secondary transition-all outline-none h-10"
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-on-surface-variant mb-1.5">Mensaje o Inquietud</label>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={4}
                className="bg-surface hover:bg-neutral-100/50 border border-outline hover:border-outline-variant rounded-lg px-4 py-2 text-sm focus:border-secondary transition-all outline-none"
                placeholder="Escriba aquí los detalles..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              Enviar Mensaje <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-4 bg-secondary-container/20 border border-secondary-container text-secondary text-xs rounded-lg flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>¡Formulario enviado con éxito! Su consulta será respondida en la brevedad.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
