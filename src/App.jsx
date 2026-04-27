import { useState } from 'react'

// --- 1. LAS DEFINICIONES (Afuera, como inventario) ---
const PARTIDOS_HIDALGO = [
  { id: 'morena', nombre: 'MORENA', color: '#8d1c3d' }, // Guinda institucional
  { id: 'pan', nombre: 'PAN', color: '#005596' },      // Azul acción
  { id: 'pri', nombre: 'PRI', color: '#00955d' },      // Verde tricolor
  { id: 'mc', nombre: 'Movimiento Ciudadano', color: '#ff8200' }, // Naranja vibrante
  { id: 'pve', nombre: 'PVEM', color: '#50b747' },     // Verde ecologista
  { id: 'pt', nombre: 'PT', color: '#e03b2b' },       // Rojo trabajo
];

function App() {
  // --- 2. EL CEREBRO (Adentro, controla qué se ve) ---
  const [paso, setPaso] = useState(1);
  const [eleccion, setEleccion] = useState(null);
  const [cp, setCp] = useState('');

  // Función para guardar el voto y pasar al paso 2
  const manejarVoto = (partidoId) => {
    setEleccion(partidoId);
    setPaso(2);
  };

  // --- 3. EL ESCAPARATE (El return con la vista de todo) ---
  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#111827' }}>Quetza Analytics</h1>
      </header>

      <main style={{ backgroundColor: 'white', maxWidth: '500px', margin: '0 auto', padding: '30px', borderRadius: '16px' }}>
        
        {/* === PANTALLA 1: LA VOTACIÓN === */}
        {paso === 1 && (
          <section>
            <h2 style={{ textAlign: 'center' }}>¿Quién crees que gobernará?</h2>
            
            {PARTIDOS_HIDALGO.map((partido) => (
              <button 
                key={partido.id}
                onClick={() => manejarVoto(partido.id)}
                style={{
                  width: '100%', padding: '15px', marginBottom: '10px',
                  border: `2px solid ${partido.color}`, borderRadius: '8px',
                  backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                {partido.nombre}
              </button>
            ))}
          </section>
        )}

        {/* === PANTALLA 2: EL MURO DE VALIDACIÓN === */}
        {paso === 2 && (
          <section style={{ textAlign: 'center' }}>
            <h2>¡Predicción Capturada! 🎯</h2>
            <p>Ingresa tu Código Postal para validar tu pronóstico.</p>
            
            <input 
              type="text" 
              maxLength="5"
              placeholder="Ej. 42000"
              value={cp}
              onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
              style={{ padding: '10px', width: '80%', marginBottom: '20px', textAlign: 'center', fontSize: '18px' }}
            />

            <br />

            <button 
              disabled={cp.length !== 5}
              onClick={() => setPaso(3)}
              style={{
                padding: '15px 30px', borderRadius: '8px', border: 'none',
                backgroundColor: cp.length === 5 ? '#111827' : '#D1D5DB', // Cambia de gris a negro si es válido
                color: 'white', cursor: cp.length === 5 ? 'pointer' : 'not-allowed'
              }}
            >
              Validar Predicción
            </button>
          </section>
        )}
{/* === PANTALLA 3: RESULTADOS / RECOMPENSA === */}
{paso === 3 && (
  <section style={{ textAlign: 'center' }}>
    <h2 style={{ color: '#111827', marginBottom: '10px' }}>¡Gracias por participar!</h2>
    <p style={{ color: '#059669', fontWeight: 'bold', marginBottom: '30px' }}>
      ✨ Has ganado 50 Quetza Coins
    </p>
    
    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
      <p style={{ fontSize: '14px', color: '#6B7280' }}>Tendencia actual en Hidalgo:</p>
      
      {/* Barra de ejemplo de resultados */}
      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>Partido con más fuerza</span>
          <span>42%</span>
        </div>
        <div style={{ width: '100%', backgroundColor: '#E5E7EB', height: '10px', borderRadius: '5px', marginTop: '5px' }}>
          <div style={{ width: '42%', backgroundColor: '#8d1c3d', height: '10px', borderRadius: '5px' }}></div>
        </div>
      </div>
    </div>

    <button 
      onClick={() => setPaso(1)}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#F3F4F6',
        border: '1px solid #D1D5DB',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      Nueva consulta
    </button>
  </section>
)}
      </main>
    </div>
  )
}

export default App