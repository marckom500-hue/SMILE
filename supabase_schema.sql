-- ============================================
-- SCHEMA SUPABASE — Cabinet Dentaire Dr. Boutchouang
-- À coller dans : Supabase > SQL Editor > New query
-- ============================================

-- 1. PATIENTS
create table patients (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  prenom      text not null,
  telephone   text,
  email       text,
  date_naissance date,
  adresse     text,
  created_at  timestamp with time zone default now()
);

-- 2. RENDEZ-VOUS
create table rendez_vous (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid references patients(id) on delete cascade,
  date        date not null,
  heure       time not null,
  type_acte   text not null,
  duree_min   int default 30,
  statut      text check (statut in ('confirme','attente','urgent','annule')) default 'attente',
  notes       text,
  created_at  timestamp with time zone default now()
);

-- 3. ACTES / FACTURES
create table factures (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid references patients(id) on delete cascade,
  rdv_id      uuid references rendez_vous(id) on delete set null,
  acte        text not null,
  montant     int not null,
  statut      text check (statut in ('Payé','En attente','Annulé')) default 'En attente',
  date        date default current_date,
  created_at  timestamp with time zone default now()
);

-- 4. STOCK
create table stock (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  quantite    int not null default 0,
  maximum     int not null default 100,
  couleur     text default '#0d9488',
  seuil_alerte int default 5,
  created_at  timestamp with time zone default now()
);

-- ============================================
-- DONNÉES DE DÉMARRAGE (données fictives)
-- ============================================

insert into patients (nom, prenom, telephone, date_naissance) values
  ('Nkana',   'Marie',   '+237 6 91 23 45 67', '1992-03-15'),
  ('Essomba', 'Paul',    '+237 6 77 34 56 78', '1979-07-22'),
  ('Bello',   'Aimée',   '+237 6 55 45 67 89', '1996-11-08'),
  ('Mvondo',  'Jean',    '+237 6 83 56 78 90', '1972-01-30'),
  ('Ngono',   'Sophie',  '+237 6 62 67 89 01', '1993-05-19'),
  ('Ateba',   'Thierry', '+237 6 74 78 90 12', '1984-09-12'),
  ('Fouda',   'Chantal', '+237 6 51 89 01 23', '1986-02-25'),
  ('Mbassi',  'Robert',  '+237 6 96 90 12 34', '1964-12-05');

insert into stock (nom, quantite, maximum, couleur, seuil_alerte) values
  ('Gants latex (boîtes)',     80,  100, '#0d9488', 10),
  ('Masques chirurgicaux',    120,  200, '#3b82f6', 20),
  ('Composite résine',          7,   20, '#f59e0b',  5),
  ('Anesthésique Lidocaïne',    3,   25, '#f43f5e',  5),
  ('Ciment verre ionomère',    22,   40, '#0d9488',  5),
  ('Films radiographiques',    90,  200, '#8b5cf6', 20);

-- ============================================
-- SÉCURITÉ : activer Row Level Security
-- ============================================
alter table patients     enable row level security;
alter table rendez_vous  enable row level security;
alter table factures     enable row level security;
alter table stock        enable row level security;

-- Politique : accès complet pour les utilisateurs authentifiés
create policy "Accès authentifié patients"    on patients    for all using (auth.role() = 'authenticated');
create policy "Accès authentifié rdv"         on rendez_vous for all using (auth.role() = 'authenticated');
create policy "Accès authentifié factures"    on factures    for all using (auth.role() = 'authenticated');
create policy "Accès authentifié stock"       on stock       for all using (auth.role() = 'authenticated');

-- Pour les tests en développement (à désactiver en production) :
-- create policy "Accès public patients"    on patients    for all using (true);
-- create policy "Accès public rdv"         on rendez_vous for all using (true);
-- create policy "Accès public factures"    on factures    for all using (true);
-- create policy "Accès public stock"       on stock       for all using (true);
