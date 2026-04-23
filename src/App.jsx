import { useState } from 'react'

function App() {
  // Estado para controlar el paso del flujo
  const [step, setStep] = useState(1);

  return (
    <div style={{ 
      backgroundColor: '#F3F4F6', // Gris elegante de fondo
      minHeight: '100vh', 
      fontFamily: 'Inter, sans-serif',
      color: '#1F2937', // Gris carbón para textos
      padding: '20px'
    }}>
      {/* Header Institucional */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
          Quetza <span style={{ fontWeight: '300', color: '#6B7280' }}>Analytics</span>
        </h1>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Termómetro Electoral Hidalgo 2027</p>
      </header>

      {/* Contenedor Principal (Tarjeta Blanca) */}
      <main style={{ 
        backgroundColor: '#FFFFFF', 
        maxWidth: '500px', 
        margin: '0 auto', 
        borderRadius: '16px', 
        padding: '30px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        
        {step === 1 && (
          <section>
            <h2 style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
              ¿Quién crees que gobernará el estado?
            </h2>
            {/* Aquí irán los botones de los partidos */}
            <button 
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}>
              Simular Clic en Partido
            </button>
          </section>
        )}

        {step === 2 && (
          <section style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>¡Predicción Capturada! 🎯</h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
              Valida tu voto para ganar 50 Quetza Coins.
            </p>
            <input 
              type="number" 
              placeholder="Tu Código Postal" 
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                textAlign: 'center'
              }}
            />
            <button 
              onClick={() => setStep(1)}
              style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Volver
            </button>
          </section>
        )}

      </main>
    </div>
  )
}

export default App