// src/components/FormField.jsx
function FormField({ label, children, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f43f5e', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

// Style partagé pour tous les inputs/selects
export const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  border: '0.5px solid var(--border-md)',
  fontSize: 13,
  color: 'var(--text-primary)',
  background: 'var(--bg-secondary)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

export default FormField
