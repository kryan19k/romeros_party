-- Romero's Party Supplies: run this once in Supabase → SQL Editor.
-- All access goes through the Next.js server with the service-role key, so RLS is on with no public policies.

create table if not exists public.items (
  id          text primary key,
  category    text not null check (category in ('jumpers','tents','tables','extras')),
  name_es     text not null default '',
  name_en     text not null default '',
  desc_es     text not null default '',
  desc_en     text not null default '',
  price       numeric,
  unit        text not null default 'event' check (unit in ('event','each')),
  stock       integer,
  image       text,
  available   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.requests (
  id          text primary key,
  created_at  timestamptz not null default now(),
  status      text not null default 'new' check (status in ('new','done')),
  name        text not null,
  phone       text not null,
  event_date  text not null,
  mode        text not null check (mode in ('delivery','pickup')),
  address     text not null default '',
  notes       text not null default '',
  lang        text not null default 'es',
  items       jsonb not null default '[]'::jsonb
);

-- Single-row table for the owner's editable site info.
create table if not exists public.settings (
  id    int primary key default 1 check (id = 1),
  data  jsonb not null
);

alter table public.items    enable row level security;
alter table public.requests enable row level security;
alter table public.settings enable row level security;

-- Public bucket for item photos (anyone can view; only the server can upload).
insert into storage.buckets (id, name, public)
values ('items', 'items', true)
on conflict (id) do nothing;
