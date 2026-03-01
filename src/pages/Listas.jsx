import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function Listas() {
  const [libros, setLibros] = useState([])
  const [listas, setListas] = useState([
    { id: 1, nombre: 'Lista 1', libro_ids: [1, 2] },
    { id: 2, nombre: 'Lista 2', libro_ids: [3, 4] },
    { id: 3, nombre: 'Lista 3', libro_ids: [5, 6] },
  ])

  useEffect(() => {
    obtenerLibros()
  }, [])

  const obtenerLibros = async () => {
    const { data, error } = await supabase
      .from('libros')
      .select('*')
    if (!error) setLibros(data)
  }

  const getLibro = (id) => libros.find(l => l.id === id)

  const crearLista = () => {
    const nombre = `Lista ${listas.length + 1}`
    setListas([...listas, { id: listas.length + 1, nombre, libro_ids: [] }])
  }

  const compartir = (nombre) => {
    alert(`¡Compartiendo ${nombre}!`)
  }

  return (
    <div>

      {/* BOTÓN CREAR */}
      <div style={{ background: 'var(--f2)', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={crearLista}
          style={{
            background: 'var(--f1)',
            color: 'var(--f2)',
            border: 'none',
            borderRadius: '6px',
            padding: '0.7rem 2rem',
            fontFamily: 'Libre Baskerville, serif',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
          ➕ Crear Lista
        </button>
      </div>

      {/* COLUMNAS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
        background: 'var(--f2)'
      }}>
        {listas.map(lista => (
          <div key={lista.id} style={{ background: 'white' }}>

            {/* HEADER */}
            <div style={{
              background: 'var(--f1)',
              padding: '0.5rem 0.8rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: 'var(--f2)', fontFamily: 'Libre Baskerville, serif', fontSize: '0.88rem' }}>
                {lista.nombre}
              </span>
              <button
                onClick={() => compartir(lista.nombre)}
                style={{ background: 'none', border: 'none', color: 'var(--f3)', cursor: 'pointer', fontSize: '0.78rem' }}>
                compartir ↗
              </button>
            </div>

            {/* LIBROS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              padding: '8px'
            }}>
              {lista.libro_ids.map(id => {
                const libro = getLibro(id)
                if (!libro) return null
                return (
                  <div key={id} style={{
                    borderRadius: '6px',
                    overflow: 'hidden',
                    aspectRatio: '2/3',
                    minHeight: '80px'
                  }}>
                    {libro.portada ? (
                      <img
                        src={libro.portada}
                        alt={libro.titulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        background: `linear-gradient(135deg, ${libro.color1}, ${libro.color2})`,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        gap: '0.3rem'
                      }}>
                        {libro.emoji}
                        <span style={{ fontSize: '0.6rem', color: 'white', textAlign: 'center', padding: '0 4px' }}>
                          {libro.titulo}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}

              {lista.libro_ids.length === 0 && (
                <p style={{ color: 'var(--f3)', fontSize: '0.75rem', padding: '0.5rem', gridColumn: 'span 2' }}>
                  Lista vacía
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Listas