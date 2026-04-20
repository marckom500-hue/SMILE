// src/components/AuthGuard.jsx
// Redirige vers Login si l'utilisateur n'est pas connecté
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login'

function AuthGuard({ children }) {
  const { session, loading } = useAuth()

  // Écran de chargement pendant la vérification de session
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 48, height: 48, background: 'var(--teal)', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(13,148,136,0.25)',
          animation: 'pulse 1.5s infinite',
        }}>
          <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
            <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.7 3.2 1.5 4.5L9 14l1 4h4l1-4 1.5-2.5C17.3 10.2 18 8.5 18 7c0-2.5-2.5-5-6-5z" />
          </svg>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Chargement…</div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </div>
    )
  }

  // Pas de session → affiche la page de login
  if (!session) return <Login />

  // Session valide → affiche l'application
  return children
}

export default AuthGuard
