import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

// --- 1. CONEXIÓN A LA BODEGA (SUPABASE) ---
const supabaseUrl = 'https://iomgmssjcpkwhafxchzq.supabase.co'; 
const supabaseKey = 'sb_publishable_w9lymjXrrcgJ8E7AAvjeOg_rH74Q9nM';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 2. DEFINICIONES CON LOGOS LOCALES ---
const PARTIDOS_HIDALGO = [
  { id: 'morena', nombre: 'MORENA', color: '#8d1c3d', logo: '/morena.png' },
  { id: 'pan', nombre: 'PAN', color: '#005596', logo: '/pan.png' },
  { id: 'pri', nombre: 'PRI', color: '#00955d', logo: '/pri.png' },
  { id: 'mc', nombre: 'Movimiento Ciudadano', color: '#ff8200', logo: '/mc.png' },
  { id: 'pve', nombre: 'PVEM', color: '#50b747', logo: '/pvem.png' },
  { id: 'pt', nombre: 'PT', color: '#e03b2b', logo: '/pt.png' },
];

function App() {
  const [resultados, setResultados] = useState([]);
  const [paso, setPaso] = useState(1);
  const [eleccion, setEleccion] = useState(null);
  const [cp, setCp] = useState('');
  const [guardando, setGuardando] = useState(false);

  const manejarVoto = (partidoId) => {
    setEleccion(partidoId);
    setPaso(2);
  };

  // --- 3. LA FUNCIÓN QUE MANDA LOS DATOS ---
  const validarYGuardar = async () => {
    setGuardando(true);
    
    const { error } = await supabase
      .from('registro_votos')
      .insert([{ partido: eleccion, cp: cp }]);

    if (error) {
      alert("Hubo un error al guardar tu voto.");
      console.error(error);
      setGuardando(false);
    } else {
      // SI TODO SALE BIEN: 
      // 1. Imprimimos el sello invisible en su navegador
      localStorage.setItem('quetza_voto_registrado', 'true');
      
      // 2. Traemos los resultados y cambiamos de pantalla
      await obtenerResultadosReales();
      setPaso(3);
      setGuardando(false);
    }
  };

  // --- 4. LA FUNCIÓN QUE LEE LOS RESULTADOS ---
  const obtenerResultadosReales = async () => {
    const { data, error } = await supabase.from('registro_votos').select('partido');

    if (error) {
      console.error("Error al traer votos:", error);
      return;
    }

    const totalVotos = data.length;
    
    const conteo = data.reduce((acc, voto) => {
      acc[voto.partido] = (acc[voto.partido] || 0) + 1;
      return acc;
    }, {});

    const calculoFinal = PARTIDOS_HIDALGO.map(partido => {
      const votosEstePartido = conteo[partido.id] || 0;
      const porcentaje = totalVotos > 0 ? ((votosEstePartido / totalVotos) * 100).toFixed(1) : 0;
      
      return {
        ...partido,
        porcentaje: porcentaje
      };
    });

    setResultados(calculoFinal.sort((a, b) => b.porcentaje - a.porcentaje));
  };

  // --- 5. EL GUARDIÁN ANTITRAMPAS ---
  // Ahora sí, adentro de App() y después de que la función obtenerResultadosReales existe.
  useEffect(() => {
    const votoPrevio = localStorage.getItem('quetza_voto_registrado');
    
    if (votoPrevio === 'true') {
      setPaso(3);
      obtenerResultadosReales(); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden font-sans text-slate-800 pb-12">
      {/* Decoraciones de fondo globales (Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[100px] -z-10 opacity-50"></div>

      {/* HEADER / BARRA SUPERIOR FLOTANTE ESTILO CRISTAL */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-xl">
              Q
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Quetza <span className="text-blue-600 font-light">Analytics</span>
            </h1>
          </div>
          <div className="hidden md:flex gap-4">
            <span className="px-4 py-1.5 bg-slate-100 text-slate-600 font-medium text-sm rounded-full border border-slate-200">
              Elecciones Hidalgo 2027
            </span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR CENTRAL DE LAS PANTALLAS */}
      <main className="max-w-5xl mx-auto px-6 pt-12">

        {/* --- PANTALLA 1: SELECCIÓN DE PARTIDO --- */}
        {paso === 1 && (
          <section className="animate-fade-in text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Barómetro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Preferencias</span>
            </h2>
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
              Participa en la primera medición descentralizada. Selecciona tu preferencia y descubre el pulso político en tiempo real.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PARTIDOS_HIDALGO.map((partido) => (
                <button
                  key={partido.id}
                  onClick={() => manejarVoto(partido.id)}
                  className="group bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 border border-slate-100 transition-all duration-300 flex flex-col items-center gap-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={partido.logo} 
                    alt={partido.nombre} 
                    className="w-20 h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
                  />
                  <span className="font-bold text-slate-700 relative z-10">{partido.nombre}</span>
                </button>
              ))}
            </div>
          </section>
        )}

{/* --- PANTALLA 2: CÓDIGO POSTAL --- */}
        {paso === 2 && (
          <section className="max-w-md mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden text-center animate-fade-in mt-10">
             <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
                📍
             </div>
             <h3 className="text-2xl font-bold text-slate-800 mb-2">Confirmar Zona Geográfica</h3>
             <p className="text-slate-500 mb-8 text-sm">
                Ingresa el Código Postal de tu municipio para validar la muestra estadística.
             </p>

             {/* --- INICIO DEL BUSCADOR INTELIGENTE --- */}
             <div className="relative mb-8">
               <input
                  list="municipios-hidalgo"
                  type="text"
                  placeholder="Ej. 42000"
                  value={cp}
                  onChange={(e) => setCp(e.target.value)}
                  className="w-full text-center text-3xl font-black text-slate-700 tracking-widest py-4 bg-slate-50 border-2 border-slate-200 rounded-full focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  maxLength="5"
               />
               
               {/* Catálogo oculto que se activa al hacer clic */}
               <datalist id="municipios-hidalgo">
                  <option value="42000">Pachuca de Soto</option>
                  <option value="42180">Mineral de la Reforma</option>
                  <option value="43600">Tulancingo de Bravo</option>
                  <option value="43800">Tizayuca</option>
                  <option value="42800">Tula de Allende</option>
                  <option value="42950">Tepeji del Río</option>
                  <option value="43000">Huejutla de Reyes</option>
                  <option value="42500">Actopan</option>
                  <option value="42300">Ixmiquilpan</option>
                  <option value="43900">Apan</option>
                  <option value="43990">Tepeapulco</option>
                  <option value="43070">Atlapexco</option>
                  <option value="43040">Huautla</option>
                  <option value="43030">Jaltocan</option>
                  <option value="43050">San Felipe Orizatlan</option>
                  <option value="43090">Xochiatipan</option>
                  <option value="43020">Yahualica</option>
                  <option value="43080">Calnali</option>
                  <option value="43300">Atotonilco el Grande</option>
                  <option value="43092">Acanoa,Atlalco,El Zapote,Hueyajtetl</option>
               </datalist>

               <p className="text-xs text-slate-400 mt-3 font-medium">
                 💡 Escribe tu CP o haz clic en la caja para ver el catálogo.
               </p>
             </div>
             {/* --- FIN DEL BUSCADOR INTELIGENTE --- */}

             <button
                onClick={validarYGuardar}
                disabled={guardando || cp.length !== 5}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-md ${
                  guardando || cp.length !== 5 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-1 hover:shadow-blue-500/30'
                }`}
             >
                {guardando ? 'Guardando en la red...' : 'Confirmar Voto'}
             </button>
             
             <button 
                onClick={() => setPaso(1)}
                className="mt-6 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
             >
               ← Volver y cambiar partido
             </button>
          </section>
        )}

        {/* --- PANTALLA 3: RESULTADOS --- */}
        {paso === 3 && (
          <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-12 relative overflow-hidden animate-fade-in mt-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="text-center z-10 relative">
              <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
                ¡Pronóstico Registrado!
              </h3>
              <p className="text-slate-500 font-medium mb-8">
                Tu voto ha sido procesado y guardado en la base de datos.
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-500/30 font-bold mb-10 transform hover:scale-105 transition-transform duration-300">
                <span className="text-xl">🪙</span>
                <span>+50 Quetza Coins abonadas</span>
              </div>
            </div>

            <div className="text-left mb-10 relative z-10">
              <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                📊 Tendencia Regional en Tiempo Real
              </h4>
              
              <div className="space-y-6">
                {resultados.map((partido, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-bold text-slate-700 text-lg group-hover:text-blue-600 transition-colors">
                        {partido.nombre}
                      </span>
                      <span className="font-black text-slate-900 text-xl">
                        {partido.porcentaje}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{ 
                          width: `${partido.porcentaje}%`, 
                          backgroundColor: partido.color || '#3b82f6'
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={obtenerResultadosReales}
              className="w-full py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold text-lg rounded-full hover:border-blue-500 hover:text-blue-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-10 flex items-center justify-center gap-2"
            >
              <span>🔄</span> Actualizar resultados en tiempo real
            </button>
          </section>
        )}
     </main>

      {/* --- FOOTER: DERECHOS Y REDES --- */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-8 mt-auto border-t border-slate-200/60 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium text-center md:text-left">
            © 2026 Ecosistema Quetza MX. Todos los derechos reservados.
          </p>
          
          {/* Enlaces a Redes Sociales */}
          <div className="flex items-center gap-5">
            {/* Botón X / Twitter */}
            <a href="#" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors hover:-translate-y-1 transform duration-300">
              <span className="sr-only">X (Twitter)</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.25H5.078z"></path>
              </svg>
            </a>

            {/* Botón Discord */}
            <a href="#" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors hover:-translate-y-1 transform duration-300">
              <span className="sr-only">Discord</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;