import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [modo, setModo] = useState('login') // 'login' o 'registro'
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const loginConGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://liberiaus.vercel.app/login',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  })
  if (error) setMensaje('Error al iniciar con Google')
}

  const loginConEmail = async () => {
    setCargando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMensaje('Correo o contraseña incorrectos')
    } else {
      navigate('/')
    }
    setCargando(false)
  }

  const registrarse = async () => {
    if (!nombre || !email || !password) {
      setMensaje('Completa todos los campos')
      return
    }
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setCargando(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } }
    })
    if (error) {
      setMensaje('Error al registrarse: ' + error.message)
    } else {
      setMensaje('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.')
    }
    setCargando(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--f1), var(--f5))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>

        {/* LOGO */}
        <h1 style={{
          fontFamily: 'Libre Baskerville, serif',
          fontSize: '2.5rem',
          color: 'var(--f1)',
          fontStyle: 'italic',
          marginBottom: '0.3rem'
        }}>
          Liberia<span style={{ color: 'var(--f3)' }}>US</span>
        </h1>

        <p style={{
          fontFamily: 'Roboto, sans-serif',
          color: 'var(--f5)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          Tu biblioteca virtual interactiva
        </p>

        {/* TABS */}
        <div style={{
          display: 'flex',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '2px solid var(--f2)',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => { setModo('login'); setMensaje('') }}
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              background: modo === 'login' ? 'var(--f1)' : 'white',
              color: modo === 'login' ? 'white' : 'var(--f5)',
              fontFamily: 'Libre Baskerville, serif',
              cursor: 'pointer',
              fontSize: '0.88rem',
              transition: 'background 0.2s'
            }}>
            Iniciar sesión
          </button>
          <button
            onClick={() => { setModo('registro'); setMensaje('') }}
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              background: modo === 'registro' ? 'var(--f1)' : 'white',
              color: modo === 'registro' ? 'white' : 'var(--f5)',
              fontFamily: 'Libre Baskerville, serif',
              cursor: 'pointer',
              fontSize: '0.88rem',
              transition: 'background 0.2s'
            }}>
            Registrarse
          </button>
        </div>

        {/* FORMULARIO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>

          {modo === 'registro' && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{
                padding: '0.7rem 1rem',
                borderRadius: '8px',
                border: '2px solid var(--f2)',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '8px',
              border: '2px solid var(--f2)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '8px',
              border: '2px solid var(--f2)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          {/* MENSAJE */}
          {mensaje && (
            <p style={{
              color: mensaje.includes('exitoso') ? 'green' : 'var(--f4)',
              fontSize: '0.82rem',
              fontFamily: 'Roboto, sans-serif'
            }}>
              {mensaje}
            </p>
          )}

          <button
            onClick={modo === 'login' ? loginConEmail : registrarse}
            disabled={cargando}
            style={{
              background: 'var(--f4)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontFamily: 'Libre Baskerville, serif',
              fontSize: '0.95rem',
              cursor: 'pointer',
              opacity: cargando ? 0.7 : 1
            }}>
            {cargando ? 'Cargando...' : modo === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>

        </div>

        {/* DIVIDER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--f2)' }} />
          <span style={{ color: 'var(--f3)', fontSize: '0.8rem', fontFamily: 'Roboto, sans-serif' }}>o</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--f2)' }} />
        </div>

        {/* GOOGLE */}
        <button
          onClick={loginConGoogle}
          style={{
            width: '100%',
            background: 'white',
            border: '2px solid var(--f2)',
            borderRadius: '10px',
            padding: '0.7rem 1rem',
            fontFamily: 'Libre Baskerville, serif',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.7rem',
            color: 'var(--f5)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
          <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google" />
          Continuar con Google
        </button>

      </div>
    </div>
  )
}

export default LoginPage