import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Libros from './pages/Libros'
import Listas from './pages/Listas'
import LoginPage from './pages/LoginPage'

function AuthHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    // Limpia el hash de la URL después del login con Google
    if (window.location.hash.includes('access_token')) {
      window.history.replaceState(null, '', '/')
      navigate('/', { replace: true })
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', '/')
          navigate('/', { replace: true })
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthHandler />
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