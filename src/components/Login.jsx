import { supabase } from '../supabase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



function Login() {
  const loginConGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173'
      }
    })
    if (error) console.log('Error:', error)
  }

const navigate = useNavigate()

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) navigate('/')
  })
}, [])

  return (
    <button
      onClick={loginConGoogle}
      style={{
        background: 'white',
        border: '2px solid var(--f3)',
        borderRadius: '20px',
        padding: '0.4rem 1rem',
        fontFamily: 'Libre Baskerville, serif',
        fontSize: '0.85rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--f5)'
      }}>
      🔵 Entrar con Google
    </button>
  )
}

export default Login