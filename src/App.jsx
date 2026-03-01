import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './supabase'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Libros from './pages/Libros'
import Listas from './pages/Listas'
import LoginPage from './pages/LoginPage'

function App() {
  const [listo, setListo] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      setListo(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setListo(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!listo) return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Libre Baskerville, serif',
      color: 'var(--f1)',
      fontSize: '1.2rem'
    }}>
      Cargando LiberaUS...
    </div>
  )

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/listas" element={<Listas />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App