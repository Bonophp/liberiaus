import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import TarjetaLibro from '../components/TarjetaLibro'

function Seccion({ titulo, libros, colorFondo }) {
  return (
    <div>
      <h2 style={{
        background: colorFondo,
        color: 'var(--f2)',
        padding: '0.7rem 1.4rem',
        fontFamily: 'Libre Baskerville, serif'
      }}>
        ■ {titulo}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: 'var(--f2)'
      }}>
        {libros.map(libro => (
          <TarjetaLibro key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  )
}

function Libros() {
  const [libros, setLibros] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerLibros()
  }, [])

  const obtenerLibros = async () => {
    const { data, error } = await supabase
      .from('libros')
      .select('*')

    if (error) {
      console.log('Error:', error)
    } else {
      setLibros(data)
    }
    setCargando(false)
  }

  if (cargando) return (
    <p style={{ padding: '1rem', fontFamily: 'Libre Baskerville, serif' }}>
      Cargando libros...
    </p>
  )

  return (
    <div>
      <Seccion titulo="Agregados recientemente" libros={libros.slice(0, 4)} colorFondo="var(--f3)" />
      <Seccion titulo="Mejores reseñados" libros={libros.slice(4, 8)} colorFondo="var(--f1)" />
      <Seccion titulo="Clásicos" libros={libros.slice(8, 12)} colorFondo="var(--f5)" />
    </div>
  )
}

export default Libros