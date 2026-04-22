// src/components/Modal.jsx
function Modal({ titre, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--bg-primary)', borderRadius: 16, width: '100%', maxWidth: 520,
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)', border: '0.5px solid var(--border)',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{titre}</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: 16 }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: '22px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
