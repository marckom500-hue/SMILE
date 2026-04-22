// src/components/ConfirmDialog.jsx
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--bg-primary)', borderRadius: 14, width: 360,
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '0.5px solid var(--border)',
        padding: 28, textAlign: 'center',
      }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 20 }}>🗑️</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Confirmer la suppression</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>{message}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '9px', borderRadius: 8, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            Annuler
          </button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: '#f43f5e', color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
