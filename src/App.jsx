import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './supabase'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Libros from './pages/Libros'
import Listas from './pages/Listas'
import LoginPage from './pages/LoginPage'

function App() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        window.location.href = '/'
      }
    })
  }, [])

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