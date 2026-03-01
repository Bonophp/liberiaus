import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Comentarios() {
  const [reseñas, setReseñas] = useState([])
  const [usuario, setUsuario] = useState('')
  const [texto, setTexto] = useState('')
  const [estrellas, setEstrellas] = useState(0)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerReseñas()
  }, [])

  const obtenerReseñas = async () => {
    const { data, error } = await supabase
      .from('reseñas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log('Error:', error)
    } else {
      setReseñas(data)
    }
    setCargando(false)
  }

  const enviarReseña = async () => {
    if (!usuario || !texto || estrellas === 0) {
      alert('Completa todos los campos y selecciona estrellas')
      return
    }

    const { error } = await supabase
      .from('reseñas')
      .insert([{ usuario, texto, estrellas, libro_id: 1 }])

    if (error) {
      console.log('Error:', error)
    } else {
      setUsuario('')
      setTexto('')
      setEstrellas(0)
      obtenerReseñas()
    }
  }

  return (
    <div style={{ background: 'var(--f5)', padding: '1.5rem' }}>

      {/* TÍTULO */}
      <h2 style={{
        color: 'var(--f2)',
        fontFamily: 'Libre Baskerville, serif',
        marginBottom: '1.2rem',
        borderBottom: '2px solid var(--f3)',
        paddingBottom: '0.5rem'
      }}>
        Comentarios ✍
      </h2>

      {/* FORMULARIO */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '2px solid var(--f3)',
            marginBottom: '0.7rem',
            fontFamily: 'Roboto, sans-serif',
            background: 'var(--white)',
          }}
        />

        {/* ESTRELLAS */}
        <div style={{ marginBottom: '0.7rem' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <span
              key={n}
              onClick={() => setEstrellas(n)}
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: n <= estrellas ? 'var(--f3)' : '#ccc'
              }}>
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu reseña..."
          value={texto}
          onChange={e => setTexto(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '2px solid var(--f3)',
            marginBottom: '0.7rem',
            fontFamily: 'Roboto, sans-serif',
            minHeight: '80px',
            resize: 'vertical',
            background: 'var(--white)',
          }}
        />

        <button
          onClick={enviarReseña}
          style={{
            background: 'var(--f3)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1.5rem',
            fontFamily: 'Libre Baskerville, serif',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
          Publicar reseña ✔
        </button>
      </div>

      {/* LISTA DE RESEÑAS */}
      {cargando ? (
        <p style={{ color: 'var(--f2)' }}>Cargando comentarios...</p>
      ) : reseñas.length === 0 ? (
        <p style={{ color: 'var(--f2)', fontFamily: 'Libre Baskerville, serif', opacity: 0.6 }}>
          Sé el primero en comentar...
        </p>
      ) : (
        reseñas.map(r => (
          <div key={r.id} style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '0.8rem',
            borderLeft: '3px solid var(--f3)'
          }}>
            <div style={{
              fontFamily: 'Libre Baskerville, serif',
              color: 'var(--f2)',
              marginBottom: '0.3rem',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>{r.usuario}</span>
              <span style={{ color: 'var(--f3)' }}>{'★'.repeat(r.estrellas)}</span>
            </div>
            <p style={{ color: 'rgba(209,205,196,0.85)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              {r.texto}
            </p>
          </div>
        ))
      )}

    </div>
  )
}

export default Comentarios