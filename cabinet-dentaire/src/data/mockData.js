// // src/data/mockData.js
// // Données fictives pour le dashboard — seront remplacées par Supabase plus tard

// export const kpis = [
//   {
//     id: 'patients',
//     color: 'teal',
//     label: 'Patients ce mois',
//     value: '148',
//     trend: '+12% vs mois dernier',
//     trendType: 'up',
//   },
//   {
//     id: 'rdv',
//     color: 'blue',
//     label: 'RDV aujourd\'hui',
//     value: '12',
//     trend: '8 confirmés · 4 en attente',
//     trendType: 'neutral',
//   },
//   {
//     id: 'ca',
//     color: 'amber',
//     label: 'Chiffre d\'affaires',
//     value: '840k',
//     trend: '+8% ce mois · FCFA',
//     trendType: 'up',
//   },
//   {
//     id: 'urgences',
//     color: 'rose',
//     label: 'Actes urgents',
//     value: '3',
//     trend: 'Nécessite attention',
//     trendType: 'down',
//   },
// ]

// export const rendezVousDuJour = [
//   { id: 1, heure: '08:00', patient: 'Marie Nkana',    type: 'Détartrage · 45 min',  statut: 'confirme', couleur: '#0d9488' },
//   { id: 2, heure: '09:00', patient: 'Paul Essomba',   type: 'Extraction · 1h',       statut: 'confirme', couleur: '#3b82f6' },
//   { id: 3, heure: '10:30', patient: 'Aimée Bello',    type: 'Consultation · 30 min', statut: 'attente',  couleur: '#f59e0b' },
//   { id: 4, heure: '11:15', patient: 'Jean Mvondo',    type: 'Urgence douleur',        statut: 'urgent',   couleur: '#f43f5e' },
//   { id: 5, heure: '14:00', patient: 'Sophie Ngono',   type: 'Carie · 45 min',        statut: 'confirme', couleur: '#0d9488' },
//   { id: 6, heure: '15:00', patient: 'Thierry Ateba',  type: 'Pose couronne · 1h30',  statut: 'confirme', couleur: '#8b5cf6' },
// ]

// export const patientsRecents = [
//   { id: 1, nom: 'Marie Nkana',   initiales: 'MN', avatarBg: '#ccfbf1', avatarColor: '#0f766e', dernierActe: 'Détartrage',  statut: 'Suivi OK',   statutColor: '#0f766e', statutBg: '#ccfbf1' },
//   { id: 2, nom: 'Paul Essomba',  initiales: 'PE', avatarBg: '#dbeafe', avatarColor: '#1d4ed8', dernierActe: 'Extraction',  statut: 'Post-op',    statutColor: '#1d4ed8', statutBg: '#dbeafe' },
//   { id: 3, nom: 'Aimée Bello',   initiales: 'AB', avatarBg: '#fef3c7', avatarColor: '#92400e', dernierActe: 'Consultation',statut: 'En attente', statutColor: '#92400e', statutBg: '#fef3c7' },
//   { id: 4, nom: 'Jean Mvondo',   initiales: 'JM', avatarBg: '#fce7f3', avatarColor: '#9d174d', dernierActe: 'Urgence',     statut: 'Urgent',     statutColor: '#9d174d', statutBg: '#fce7f3' },
// ]

// export const typesActes = [
//   { label: 'Détartrage', couleur: '#0d9488', pct: 43, dash: 56.5,  offset: 0      },
//   { label: 'Extractions',couleur: '#3b82f6', pct: 29, dash: 37.7,  offset: -56.5  },
//   { label: 'Caries',     couleur: '#f59e0b', pct: 19, dash: 25.1,  offset: -94.2  },
//   { label: 'Prothèses',  couleur: '#8b5cf6', pct: 9,  dash: 12.6,  offset: -119.4 },
// ]

// export const revenus = [
//   { mois: 'Oct', valeur: 620 },
//   { mois: 'Nov', valeur: 730 },
//   { mois: 'Déc', valeur: 580 },
//   { mois: 'Jan', valeur: 810 },
//   { mois: 'Fév', valeur: 760 },
//   { mois: 'Mar', valeur: 890 },
//   { mois: 'Avr', valeur: 840, actuel: true },
// ]

// export const stock = [
//   { id: 1, nom: 'Gants latex (boîtes)',       qte: 80,  max: 100, couleur: '#0d9488' },
//   { id: 2, nom: 'Masques chirurgicaux',       qte: 120, max: 200, couleur: '#3b82f6' },
//   { id: 3, nom: 'Composite résine',           qte: 7,   max: 20,  couleur: '#f59e0b' },
//   { id: 4, nom: 'Anesthésique Lidocaïne',     qte: 3,   max: 25,  couleur: '#f43f5e', alerte: true },
//   { id: 5, nom: 'Ciment verre ionomère',      qte: 22,  max: 40,  couleur: '#0d9488' },
//   { id: 6, nom: 'Films radiographiques',      qte: 90,  max: 200, couleur: '#8b5cf6' },
// ]

// export const alertes = [
//   { id: 1, icone: '⚠️', iconeBg: '#fce7f3', texte: 'Stock critique — Anesthésique Lidocaïne bas', temps: 'il y a 2h' },
//   { id: 2, icone: '📋', iconeBg: '#f0fdf4', texte: '3 factures en attente de règlement',           temps: "Aujourd'hui" },
//   { id: 3, icone: '✅', iconeBg: '#ccfbf1', texte: 'Marie Nkana a confirmé son RDV 08:00',         temps: 'il y a 30 min' },
// ]
// src/data/mockData.js

export const mockKPIs = [
  { id: 'patients', color: 'teal', label: 'Patients ce mois', value: '148', trend: '+12% vs mois dernier', trendType: 'up' },
  { id: 'rdv', color: 'blue', label: "RDV aujourd'hui", value: '12', trend: '8 confirmés · 4 en attente', trendType: 'neutral' },
  { id: 'ca', color: 'amber', label: "Chiffre d'affaires", value: '840k', trend: '+8% ce mois · FCFA', trendType: 'up' },
  { id: 'urgences', color: 'rose', label: 'Actes urgents', value: '3', trend: 'Nécessite attention', trendType: 'down' },
];

export const mockAppointments = [
  { id: 1, heure: '08:00', patient: 'Marie Nkana', type: 'Détartrage · 45 min', statut: 'confirme', couleur: '#0d9488' },
  { id: 2, heure: '09:00', patient: 'Paul Essomba', type: 'Extraction · 1h', statut: 'confirme', couleur: '#3b82f6' },
  { id: 3, heure: '10:30', patient: 'Aimée Bello', type: 'Consultation · 30 min', statut: 'attente', couleur: '#f59e0b' },
];

export const mockPatients = [
  { id: 1, nom: 'Marie Nkana', initiales: 'MN', avatarBg: '#ccfbf1', avatarColor: '#0f766e', dernierActe: 'Détartrage', statut: 'Suivi OK' },
  { id: 2, nom: 'Paul Essomba', initiales: 'PE', avatarBg: '#dbeafe', avatarColor: '#1d4ed8', dernierActe: 'Extraction', statut: 'Post-op' },
];

export const mockStock = [
  { id: 1, nom: 'Gants latex (boîtes)', qte: 80, max: 100, couleur: '#0d9488' },
  { id: 4, nom: 'Anesthésique Lidocaïne', qte: 3, max: 25, couleur: '#f43f5e', alerte: true },
];

export const mockNotifications = [
  { id: 1, icone: '⚠️', iconeBg: '#fce7f3', texte: 'Stock critique — Anesthésique Lidocaïne bas', temps: 'il y a 2h' },
  { id: 3, icone: '✅', iconeBg: '#ccfbf1', texte: 'Marie Nkana a confirmé son RDV 08:00', temps: 'il y a 30 min' },
];