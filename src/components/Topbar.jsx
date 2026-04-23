// components/Topbar.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FormulairePatient from './FormulairePatient'
import FormulaireRdv from './FormulaireRdv'
import { usePatients } from '../hooks/usePatients'
import { useRendezVous } from '../hooks/useRendezVous'

const s = {
  topbar: {
    background: 'var(--bg-primary)',
    borderBottom: '0.5px solid var(--border)',
    padding: '14px 24px',
    display: 'flex', alignItems: 'center', gap: 16,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20, fontWeight: 600,
    color: 'var(--text-primary)', flex: 1,
  },
  date: { fontSize: 12, color: 'var(--text-secondary)' },
  btn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 7,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    border: '0.5px solid var(--border-md)',
    background: 'var(--bg-primary)', color: 'var(--text-primary)',
    transition: 'all 0.15s',
  },
  btnPrimary: {
    background: 'var(--teal)', color: 'white', border: '0.5px solid var(--teal)',
  },
}

const IconePlus = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
  </svg>
)

const IconePatient = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

function getDateFr() {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function Topbar({ title = 'Tableau de bord' }) {
  const navigate                        = useNavigate()
  const { pathname }                    = useLocation()
  const [modalRdv, setModalRdv]         = useState(false)
  const [modalPatient, setModalPatient] = useState(false)
  const { ajouterPatient }              = usePatients()
  const { ajouterRdv }                  = useRendezVous()

  // Masquer les deux boutons sur les pages Patients et Rendez-vous
  // car ces pages ont déjà leurs propres boutons d'ajout intégrés
  const masquerBoutons = pathname === '/rendez-vous' || pathname === '/patients'

  async function handleSavePatient(form) {
    const result = await ajouterPatient(form)
    if (!result.error) { setModalPatient(false); navigate('/patients') }
    return result
  }

  async function handleSaveRdv(form) {
    const result = await ajouterRdv(form)
    if (!result.error) { setModalRdv(false); navigate('/rendez-vous') }
    return result
  }

  return (
    <>
      <div style={s.topbar}>
        <div className="topbar-title" style={s.title}>{title}</div>
        <span className="topbar-date" style={s.date}>{getDateFr()}</span>

        {/* Boutons visibles uniquement sur le dashboard et les autres pages */}
        {!masquerBoutons && (
          <>
            <button
              style={s.btn}
              onClick={() => setModalRdv(true)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
            >
              <IconePlus />
              Nouveau RDV
            </button>

            <button
              style={{ ...s.btn, ...s.btnPrimary }}
              onClick={() => setModalPatient(true)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--teal-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--teal)'}
            >
              <IconePatient />
              Nouveau patient
            </button>
          </>
        )}
      </div>

      {modalRdv && (
        <FormulaireRdv rdv={null} onSave={handleSaveRdv} onClose={() => setModalRdv(false)} />
      )}
      {modalPatient && (
        <FormulairePatient patient={null} onSave={handleSavePatient} onClose={() => setModalPatient(false)} />
      )}
    </>
  )
}

export default Topbar
