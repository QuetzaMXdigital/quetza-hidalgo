import { useState } from 'react'

// --- 1. DEFINICIONES CON LOGOS ---
const PARTIDOS_HIDALGO = [
  { id: 'morena', nombre: 'MORENA', color: '#8d1c3d', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Morena_logo_%28Mexico%29.svg/200px-Morena_logo_%28Mexico%29.svg.png' },
  { id: 'pan', nombre: 'PAN', color: '#005596', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Partido_Acci%C3%B3n_Nacional_%28Mexico%29_logo.svg/200px-Partido_Acci%C3%B3n_Nacional_%28Mexico%29_logo.svg.png' },
  { id: 'pri', nombre: 'PRI', color: '#00955d', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/PRI_logo_%28Mexico%29.svg/200px-PRI_logo_%28Mexico%29.svg.png' },
  { id: 'mc', nombre: 'Movimiento Ciudadano', color: '#ff8200', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Movimiento_Ciudadano_%28Mexico%29_logo.svg/200px-Movimiento_Ciudadano_%28Mexico%29_logo.svg.png' },
  { id: 'pve', nombre: 'PVEM', color: '#50b747', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Partido_Verde_Ecologista_de_M%C3%A9xico_logo.svg/200px-Partido_Verde_Ecologista_de_M%C3%A9xico_logo.svg.png' },
  { id: 'pt', nombre: 'PT', color: '#e03b2b', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Partido_del_Trabajo_%28Mexico%29_logo.svg/200px-Partido_del_Trabajo_%28Mexico%29_logo.svg.png' },
];

function App() {
  const [paso, setPaso] = useState(1);
  const [eleccion, setEleccion] = useState(null);
  const [cp, setCp] = useState('');

  const manejarVoto = (partidoId) => {
    setEleccion(partidoId);
    setPaso(2);
  };

  return (
    // Fondo general tipo Dashboard
    <div style={{ backgroundColor: '#e2e8f0', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Barra de Navegación Superior */}
      <nav style={{ backgroundColor: '#0f172a', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>📊</span> Quetza Analytics
        </h1>
        <span style={{ color: '#94a3b8', fontSize: '14px' }}>Hidalgo 2027</span>
      </nav>

      {/* Contenedor Principal (La Tarjeta) */}
      <main style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '500px', 
          padding: '30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
        }}>
          
          {/* === PANTALLA 1: LA VOTACIÓN === */}
          {paso === 1 && (
            <section>
              <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '25px', fontSize: '22px' }}>
                Pronóstico de Gubernatura
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {PARTIDOS_HIDALGO.map((partido) => (
                  <button 
                    key={partido.id}
                    onClick={() => manejarVoto(partido.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                      width: '100%', padding: '12px 20px',
                      border: `1px solid #cbd5e1`, 
                      borderLeft: `6px solid ${partido.color}`, // Una línea de color elegante a la izquierda
                      borderRadius: '8px',
                      backgroundColor: 'white', cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <img 
                      src={partido.logo} 
                      alt={`Logo ${partido.nombre}`} 
                      style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '15px' }}
                    />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>
                      {partido.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* === PANTALLA 2: EL MURO DE VALIDACIÓN === */}
          {paso === 2 && (
            <section style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📍</div>
              <h2 style={{ color: '#1e293b' }}>Confirmar Zona Geográfica</h2>
              <p style={{ color: '#64748b', marginBottom: '25px' }}>
                Ingresa el Código Postal de tu municipio para validar la muestra estadística.
              </p>
              
              <input 
                type="text" 
                maxLength="5"
                placeholder="Ej. 42000"
                value={cp}
                onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
                style={{ 
                  padding: '15px', width: '80%', marginBottom: '25px', 
                  textAlign: 'center', fontSize: '20px', letterSpacing: '2px',
                  border: '2px solid #e2e8f0', borderRadius: '8px', outline: 'none'
                }}
              />

              <button 
                disabled={cp.length !== 5}
                onClick={() => setPaso(3)}
                style={{
                  width: '100%', padding: '15px', borderRadius: '8px', border: 'none',
                  backgroundColor: cp.length === 5 ? '#0f172a' : '#cbd5e1', 
                  color: 'white', fontSize: '16px', fontWeight: 'bold',
                  cursor: cp.length === 5 ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.3s'
                }}
              >
                Validar y Ver Resultados
              </button>
            </section>
          )}

          {/* === PANTALLA 3: RESULTADOS / RECOMPENSA === */}
          {paso === 3 && (
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#1e293b', marginBottom: '5px' }}>¡Registro Exitoso!</h2>
              
              <div style={{ backgroundColor: '#ecfdf5', padding: '15px', borderRadius: '8px', border: '1px solid #10b981', display: 'inline-block', marginBottom: '30px', marginTop: '10px' }}>
                <span style={{ color: '#047857', fontWeight: 'bold', fontSize: '15px' }}>
                  🪙 50 Quetza Coins abonadas
                </span>
              </div>
              
              <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', color: '#475569', marginBottom: '15px' }}>Tendencia Regional:</h3>
                
                {/* Barra de ejemplo de resultados */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold', color: '#1e293b' }}>
                    <span>MORENA</span>
                    <span>42%</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#f1f5f9', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: '42%', backgroundColor: '#8d1c3d', height: '100%' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold', color: '#1e293b' }}>
                    <span>PRI</span>
                    <span>28%</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#f1f5f9', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: '28%', backgroundColor: '#00955d', height: '100%' }}></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setPaso(1); setCp(''); }}
                style={{
                  width: '100%', padding: '15px', backgroundColor: 'transparent',
                  border: '2px solid #e2e8f0', color: '#475569',
                  borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                Hacer otro pronóstico
              </button>
            </section>
          )}

        </div>
      </main>
    </div>
  )
}

export default App