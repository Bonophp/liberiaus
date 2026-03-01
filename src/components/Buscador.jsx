function Buscador({ onBuscar }) {
  return (
    <div style={{ background: 'var(--f2)', padding: '0.8rem 2rem' }}>
      <input
        type="text"
        placeholder="🔍 Buscar libros..."
        onChange={e => onBuscar(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          borderRadius: '30px',
          border: '2px solid var(--f1)',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '0.95rem',
          outline: 'none'
        }}
      />
    </div>
  )
}

export default Buscador