import { useState } from 'react'

// --- 1. LAS DEFINICIONES (Afuera, como inventario) ---
const PARTIDOS_HIDALGO = [
  { id: 'guinda', nombre: 'Partido Guinda', color: '#8d1c3d' },
  { id: 'azul', nombre: 'Partido Azul', color: '#005596' },
  { id: 'tricolor', nombre: 'Partido Tricolor', color: '#00955d' },
  { id: 'naranja', nombre: 'Movimiento Naranja', color: '#ff8200' },
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

      </main>
    </div>
  )
}

export default App