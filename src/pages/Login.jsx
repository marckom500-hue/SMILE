// pages/Login.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [erreur, setErreur]     = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setErreur(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErreur(error.message)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)',
      padding: '16px',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, background: 'var(--teal)', borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(13,148,136,0.25)',
          }}>
             <img src="/SMILE.jpg" alt="Logo" style={{ width: 28, height: 28 }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)' }}>
           Cabinet Dentaire SMILE
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Dr. Boutchouang & Associés
          </div>
        </div>

        {/* Carte formulaire */}
        <div style={{
          background: 'white', borderRadius: 16, padding: 32,
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)', border: '0.5px solid var(--border)',
        }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            Connexion
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Accès réservé au personnel autorisé
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Adresse email
              </label>
              <input
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="docteur@cabinet.cm"
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8,
                  border: '0.5px solid var(--border-md)', fontSize: 13,
                  color: 'var(--text-primary)', outline: 'none', background: 'var(--bg-secondary)',
                  transition: 'border-color 0.15s', boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border-md)'}
              />
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Mot de passe
              </label>
              <input
                type="password" required
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8,
                  border: '0.5px solid var(--border-md)', fontSize: 13,
                  color: 'var(--text-primary)', outline: 'none', background: 'var(--bg-secondary)',
                  transition: 'border-color 0.15s', boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border-md)'}
              />
            </div>

            {/* Erreur */}
            {erreur && (
              <div style={{
                background: '#fce7f3', color: '#9d174d', fontSize: 12,
                padding: '10px 12px', borderRadius: 8, marginBottom: 16,
                border: '0.5px solid #fbcfe8',
              }}>
                ⚠️ {erreur === 'Invalid login credentials'
                  ? 'Email ou mot de passe incorrect.'
                  : erreur}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '11px', borderRadius: 8,
                background: loading ? 'var(--teal-mid)' : 'var(--teal)',
                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 600, transition: 'background 0.15s',
              }}
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'var(--text-tertiary)' }}>
          Accès sécurisé — Cabinet Dentaire Dr. Boutchouang
        </div>
      </div>
    </div>
  )
}

export default Login
