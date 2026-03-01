import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Navbar() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null)
    })
  }, [])

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
  }

  return (
    <nav style={{
      background: 'var(--f1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '60px'
    }}>

      {/* LOGO */}
      <span style={{
        fontFamily: 'Libre Baskerville, serif',
        fontSize: '1.5rem',
        color: 'var(--f2)',
        fontStyle: 'italic'
      }}>
        Liberia<span style={{ color: 'var(--f3)' }}>US</span>
      </span>

      {/* LINKS */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'var(--f2)', textDecoration: 'none', fontFamily: 'Libre Baskerville, serif' }}>Inicio</Link>
        <Link to="/libros" style={{ color: 'var(--f2)', textDecoration: 'none', fontFamily: 'Libre Baskerville, serif' }}>Libros</Link>
        <Link to="/listas" style={{ color: 'var(--f2)', textDecoration: 'none', fontFamily: 'Libre Baskerville, serif' }}>Listas</Link>
      </div>

      {/* AUTH */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {usuario ? (
          <>
            <span style={{
              color: 'var(--f2)',
              fontSize: '0.82rem',
              fontFamily: 'Roboto, sans-serif'
            }}>
              👤 {usuario.email}
            </span>
            <button
              onClick={cerrarSesion}
              style={{
                background: 'var(--f4)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '0.3rem 0.9rem',
                fontFamily: 'Libre Baskerville, serif',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            background: 'white',
            border: '2px solid var(--f3)',
            borderRadius: '20px',
            padding: '0.4rem 1rem',
            fontFamily: 'Libre Baskerville, serif',
            fontSize: '0.85rem',
            cursor: 'pointer',
            color: 'var(--f5)',
            textDecoration: 'none'
          }}>
            🔵 Iniciar sesión
          </Link>
        )}
      </div>

    </nav>
  )
}

export default Navbar