import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function TarjetaLibro({ libro }) {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    obtenerUsuario()
    obtenerLikes()
  }, [])

  const obtenerUsuario = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUsuario(session?.user ?? null)
  }

  const obtenerLikes = async () => {
    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('libro_id', libro.id)

    if (!error) {
      setTotalLikes(data.length)
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const yaLiked = data.some(l => l.usuario === session.user.email)
        setLiked(yaLiked)
      }
    }
  }

  const toggleLike = async () => {
    if (!usuario) {
      alert('Inicia sesión para dar like')
      return
    }
    if (liked) {
      await supabase.from('likes').delete()
        .eq('libro_id', libro.id)
        .eq('usuario', usuario.email)
      setTotalLikes(totalLikes - 1)
      setLiked(false)
    } else {
      await supabase.from('likes')
        .insert([{ libro_id: libro.id, usuario: usuario.email }])
      setTotalLikes(totalLikes + 1)
      setLiked(true)
    }
  }

  const compartirEn = (red) => {
    const url = encodeURIComponent(libro.url)
    const texto = encodeURIComponent(`¡Mira este libro: ${libro.titulo}!`)
    const redes = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${texto}&url=${url}`,
      whatsapp: `https://wa.me/?text=${texto}%20${url}`
    }
    window.open(redes[red], '_blank')
  }

  return (
    <div style={{ background: 'white', padding: '1rem' }}>

      {/* PORTADA */}
      <div style={{
        height: '200px',
        borderRadius: '8px',
        overflow: 'hidden'
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
            fontSize: '3rem',
            gap: '0.5rem'
          }}>
            {libro.emoji}
            <span style={{ fontSize: '0.7rem', color: 'white', textAlign: 'center', padding: '0 0.5rem' }}>
              {libro.titulo}
            </span>
          </div>
        )}
      </div>

      {/* TÍTULO */}
      <p style={{
        fontFamily: 'Libre Baskerville, serif',
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: 'var(--f1)'
      }}>
        {libro.titulo}
      </p>

      {/* BOTONES */}
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={toggleLike} style={{
          background: liked ? 'var(--f4)' : 'none',
          border: '1px solid var(--f4)',
          color: liked ? 'white' : 'var(--f4)',
          borderRadius: '20px',
          padding: '0.2rem 0.6rem',
          cursor: 'pointer',
          fontSize: '0.75rem'
        }}>
          {liked ? `❤️ ${totalLikes}` : `🤍 ${totalLikes}`}
        </button>

        <button style={{
          background: 'none',
          border: '1px solid var(--f3)',
          color: 'var(--f3)',
          borderRadius: '20px',
          padding: '0.2rem 0.6rem',
          cursor: 'pointer',
          fontSize: '0.75rem'
        }}>
          ＋ Agregar
        </button>

        <button onClick={() => compartirEn('facebook')} style={{
          background: '#1877F2', border: 'none', color: 'white',
          borderRadius: '20px', padding: '0.2rem 0.6rem',
          cursor: 'pointer', fontSize: '0.75rem'
        }}>
          Facebook
        </button>

        <button onClick={() => compartirEn('twitter')} style={{
          background: '#1DA1F2', border: 'none', color: 'white',
          borderRadius: '20px', padding: '0.2rem 0.6rem',
          cursor: 'pointer', fontSize: '0.75rem'
        }}>
          Twitter
        </button>

        <button onClick={() => compartirEn('whatsapp')} style={{
          background: '#25D366', border: 'none', color: 'white',
          borderRadius: '20px', padding: '0.2rem 0.6rem',
          cursor: 'pointer', fontSize: '0.75rem'
        }}>
          WhatsApp
        </button>
      </div>
    </div>
  )
}

export default TarjetaLibro