import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import TarjetaLibro from '../components/TarjetaLibro'
import Comentarios from '../components/Comentarios'
import Buscador from '../components/Buscador'

function Inicio() {
  const [libros, setLibros] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [buscando, setBuscando] = useState(false)

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
      setFiltrados(data)
    }
    setCargando(false)
  }

  const buscar = (texto) => {
    if (texto === '') {
      setBuscando(false)
      setFiltrados(libros)
    } else {
      setBuscando(true)
      const resultado = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto.toLowerCase())
      )
      setFiltrados(resultado)
    }
  }

  const librosAMostrar = buscando ? filtrados : libros.slice(0, 3)

  return (
    <div>
      <Buscador onBuscar={buscar} />

      <h2 style={{
        background: 'var(--f5)',
        color: 'var(--f2)',
        padding: '0.7rem 1.4rem',
        fontFamily: 'Libre Baskerville, serif'
      }}>
        {buscando ? 'Resultados de búsqueda 🔍' : 'Lo más visto ✉'}
      </h2>

      {cargando ? (
        <p style={{ padding: '1rem', fontFamily: 'Libre Baskerville, serif' }}>
          Cargando libros...
        </p>
      ) : librosAMostrar.length === 0 ? (
        <p style={{
          padding: '2rem',
          fontFamily: 'Libre Baskerville, serif',
          color: 'var(--f4)',
          textAlign: 'center'
        }}>
          No se encontraron libros 📚
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--f1)'
        }}>
          {librosAMostrar.map(libro => (
            <TarjetaLibro key={libro.id} libro={libro} />
          ))}
        </div>
      )}

      <Comentarios />
    </div>
  )
}

export default Inicio