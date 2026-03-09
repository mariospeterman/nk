create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null,
  lead_reference text not null unique,
  service_type text not null,
  customer_type text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  postcode text not null,
  city text not null,
  message text not null,
  urgency text not null,
  preferred_contact text not null,
  booking_status text,
  ai_summary text,
  consent_version text not null,
  consent_ai_assist boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  gclid text,
  ref text,
  status text not null default 'new'
);

create table if not exists lead_assets (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  file_path text not null,
  mime_type text not null,
  size_bytes bigint,
  uploaded_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  cal_booking_id text,
  booking_type text not null,
  scheduled_at timestamptz,
  meeting_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  actor text not null,
  timestamp timestamptz not null default now(),
  metadata jsonb not null default '{}'
);

create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_status_idx on leads(status);
create index if not exists lead_assets_lead_id_idx on lead_assets(lead_id);
create index if not exists bookings_lead_id_idx on bookings(lead_id);
create index if not exists audit_log_entity_idx on audit_log(entity_type, entity_id);
