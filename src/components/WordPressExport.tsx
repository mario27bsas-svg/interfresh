import { useState } from 'react';
import { 
  FileCode, Check, Copy, HelpCircle, Save, Download, ArrowRight, 
  Terminal, Monitor, Sparkles, AlertCircle, FileText, Globe 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WordPressExport() {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const elementorCodeStr = `<!-- Interfresh Cargo - Cotizador y Rastreador Automatizado para Elementor -->
<!-- Copie e inserte este bloque entero en un widget HTML Personalizado de Elementor -->
<iframe src="${window.location.origin}/wp-elementor-integration.html" 
        style="width:100%; height:920px; border:none; border-radius:16px; overflow:hidden;" 
        id="ifc-elementor-iframe" 
        allow="clipboard-read; clipboard-write">
</iframe>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(elementorCodeStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const iframePreviewUrl = '/wp-elementor-integration.html';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10" id="wp-export-root">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
            Exportador de Integración Activo
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Adaptado para WordPress con Elementor
          </h1>
          <p className="text-sm md:text-base text-primary-container leading-relaxed font-sans font-light max-w-2xl">
            Hemos compilado un archivo de fletes e interactividad independiente en <code className="font-mono bg-white/10 px-1 py-0.5 rounded text-white font-bold">wp-elementor-integration.html</code>. Puede integrarlo como un Iframe optimizado de carga rápida o incrustar el código HTML directamente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Side: Steps and Controls (col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Integration options card */}
          <div className="bg-white border border-outline-variant/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-secondary" /> Método de Integración por Iframe (Recomendado)
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Esta es la forma más limpia y robusta de incrustar el cotizador en Elementor, ya que previene conflictos de hojas de estilo (CSS) o scripts (JS) entre WordPress y nuestra interfaz interactiva de alta fidelidad.
            </p>

            {/* Code Box */}
            <div className="relative mb-6">
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button 
                  onClick={handleCopyCode}
                  className="bg-primary hover:bg-opacity-90 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer select-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-secondary-container" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" /> Copiar Código
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 rounded-xl p-4 pt-12 overflow-x-auto text-[11px] font-mono text-slate-300 border border-slate-800 leading-normal">
                <div className="text-slate-500 mb-2 border-b border-slate-800 pb-2 flex justify-between items-center">
                  <span>HTML Elementor Widget Snippet</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Ready to Paste</span>
                </div>
                <pre>{elementorCodeStr}</pre>
              </div>
            </div>

            {/* Action Buttons to download the direct standalone html */}
            <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
              <a 
                href="/wp-elementor-integration.html" 
                download="interfresh-cargo-elementor.html"
                className="w-full sm:w-auto bg-primary text-white font-bold text-xs py-3 px-6 rounded-xl hover:bg-opacity-95 text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Descargar HTML Independiente
              </a>
              <span className="text-[11px] text-slate-400 font-medium">Ubicado en la raíz de su espacio de trabajo</span>
            </div>
          </div>

          {/* Setup guide steps card */}
          <div className="bg-white border border-outline-variant/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display text-base font-bold text-primary mb-6 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-5 text-secondary" /> Guía de configuración interactiva
            </h3>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
              
              {/* Step 1 */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => setActiveStep(1)}
              >
                <div className={`absolute -left-[20px] top-0.5 h-3 w-3 rounded-full border-2 transition-colors ${
                  activeStep === 1 ? 'bg-secondary border-white ring-4 ring-slate-100' : 'bg-slate-200 border-white'
                }`}></div>
                <h4 className={`text-xs font-bold font-display uppercase tracking-wider mb-1 ${
                  activeStep === 1 ? 'text-secondary' : 'text-slate-500 hover:text-primary'
                }`}>Paso 1: Copiar el Fragmento de código</h4>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">
                  Copie el snippet de arriba usando el botón azul "Copiar Código". Esto asegura que Elementor renderice con dimensiones perfectas de 920px de alto.
                </p>
              </div>

              {/* Step 2 */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => setActiveStep(2)}
              >
                <div className={`absolute -left-[20px] top-0.5 h-3 w-3 rounded-full border-2 transition-colors ${
                  activeStep === 2 ? 'bg-secondary border-white ring-4 ring-slate-100' : 'bg-slate-200 border-white'
                }`}></div>
                <h4 className={`text-xs font-bold font-display uppercase tracking-wider mb-1 ${
                  activeStep === 2 ? 'text-secondary' : 'text-slate-500 hover:text-primary'
                }`}>Paso 2: Insertar Widget HTML en WordPress</h4>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">
                  Abra Elementor en su sitio de WordPress. Localice el widget de <strong className="text-primary font-bold">HTML</strong> en la barra lateral izquierda y arrástrelo al área principal de su página logística.
                </p>
              </div>

              {/* Step 3 */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => setActiveStep(3)}
              >
                <div className={`absolute -left-[20px] top-0.5 h-3 w-3 rounded-full border-2 transition-colors ${
                  activeStep === 3 ? 'bg-secondary border-white ring-4 ring-slate-100' : 'bg-slate-200 border-white'
                }`}></div>
                <h4 className={`text-xs font-bold font-display uppercase tracking-wider mb-1 ${
                  activeStep === 3 ? 'text-secondary' : 'text-slate-500 hover:text-primary'
                }`}>Paso 3: Pegar el código y guardar cambios</h4>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">
                  Pegue el código copiado en el cuadro de edición HTML de Elementor. Guarde/Actualice su página y disfrute del cotizador de alta tecnología optimizado para móviles y escritorio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live HTML Preview Simulator inside custom frame (col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-3xl p-4 flex flex-col h-full shadow-2xl border border-slate-800 text-white min-h-[500px]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider ml-1">Previsualización de Elementor</span>
              </div>
              <span className="text-[10px] bg-secondary text-white font-bold py-0.5 px-2 rounded-full font-mono">LIVE PREVIEW</span>
            </div>

            {/* Embedded simulation pane */}
            <div className="flex-grow bg-white rounded-xl overflow-hidden shadow-inner border border-slate-800 flex flex-col relative h-[560px]">
              <iframe 
                src={iframePreviewUrl} 
                className="w-full h-full border-none"
                title="Elementor Embed Live Preview"
                id="elementor-preview-iframe"
              />
            </div>

            <div className="mt-4 flex gap-2 items-start text-xs text-slate-400 font-sans leading-relaxed">
              <AlertCircle className="w-4 h-4 text-secondary-container flex-shrink-0 mt-0.5" />
              <span>Esta simulación se alimenta de <code className="font-mono text-slate-200">wp-elementor-integration.html</code>. Al modificar el archivo o descargar el código, los clientes de WordPress experimentarán este flujo exacto.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
