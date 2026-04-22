// pages/Facturation.jsx
import Topbar from '../components/Topbar'

const factures = [
  { id: 'FAC-001', patient: 'Marie Nkana',   initiales: 'MN', avatarBg: '#ccfbf1', avatarColor: '#0f766e', acte: 'Détartrage',      date: '17 Avr 2026', montant: 25000,  statut: 'Payé' },
  { id: 'FAC-002', patient: 'Paul Essomba',  initiales: 'PE', avatarBg: '#dbeafe', avatarColor: '#1d4ed8', acte: 'Extraction',      date: '17 Avr 2026', montant: 45000,  statut: 'En attente' },
  { id: 'FAC-003', patient: 'Aimée Bello',   initiales: 'AB', avatarBg: '#fef3c7', avatarColor: '#92400e', acte: 'Consultation',    date: '10 Avr 2026', montant: 15000,  statut: 'En attente' },
  { id: 'FAC-004', patient: 'Jean Mvondo',   initiales: 'JM', avatarBg: '#fce7f3', avatarColor: '#9d174d', acte: 'Urgence',         date: '17 Avr 2026', montant: 60000,  statut: 'En attente' },
  { id: 'FAC-005', patient: 'Sophie Ngono',  initiales: 'SN', avatarBg: '#ccfbf1', avatarColor: '#0f766e', acte: 'Carie',           date: '03 Avr 2026', montant: 35000,  statut: 'Payé' },
  { id: 'FAC-006', patient: 'Thierry Ateba', initiales: 'TA', avatarBg: '#ede9fe', avatarColor: '#6d28d9', acte: 'Pose couronne',   date: '01 Avr 2026', montant: 180000, statut: 'Payé' },
  { id: 'FAC-007', patient: 'Chantal Fouda', initiales: 'CF', avatarBg: '#fef3c7', avatarColor: '#92400e', acte: 'Détartrage',      date: '28 Mar 2026', montant: 25000,  statut: 'Annulé' },
]

const statutStyle = {
  'Payé':       { background: '#ccfbf1', color: '#0f766e' },
  'En attente': { background: '#fef3c7', color: '#92400e' },
  'Annulé':     { background: '#f1f5f9', color: '#64748b' },
}

const totalPaye    = factures.filter(f => f.statut === 'Payé').reduce((s, f) => s + f.montant, 0)
const totalAttente = factures.filter(f => f.statut === 'En attente').reduce((s, f) => s + f.montant, 0)

function formatFcfa(n) {
  return n.toLocaleString('fr-FR') + ' FCFA'
}

function Facturation() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Facturation" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total encaissé',   value: formatFcfa(totalPaye),    color: '#0d9488' },
            { label: 'En attente',       value: formatFcfa(totalAttente), color: '#f59e0b' },
            { label: 'Factures impayées',value: factures.filter(f => f.statut === 'En attente').length + ' factures', color: '#f43f5e' },
          ].map(k => (
            <div key={k.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${k.color}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Tableau factures */}
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Toutes les factures</span>
            <button style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              + Nouvelle facture
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1.5fr 1.5fr 1fr', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
            {['N°', 'Patient', 'Acte', 'Date', 'Montant', 'Statut'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
            ))}
          </div>

          {factures.map((f, i) => (
            <div key={f.id}
              style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1.5fr 1.5fr 1fr', padding: '12px 16px', borderBottom: i < factures.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{f.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: f.avatarBg, color: f.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{f.initiales}</div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{f.patient}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.acte}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.date}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{formatFcfa(f.montant)}</div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, fontWeight: 500, display: 'inline-block', ...statutStyle[f.statut] }}>{f.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Facturation
