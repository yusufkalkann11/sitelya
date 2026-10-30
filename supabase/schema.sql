-- Sitelya admin paneli: iletişim formu kayıtları
-- Supabase panelinde SQL Editor'e yapıştırıp "Run" ile bir kez çalıştırın.

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  name             text not null check (char_length(name) between 1 and 120),
  email            text not null check (char_length(email) between 3 and 200),
  phone            text check (char_length(phone) <= 40),
  package          text check (char_length(package) <= 60),
  message          text not null check (char_length(message) between 1 and 5000),
  locale           text not null default 'tr',
  source           text,
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'proposal', 'won', 'lost', 'spam')),
  is_read          boolean not null default false,
  notes            text not null default '',
  kvkk_accepted_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- RLS açık ve hiçbir politika yok: tabloya yalnızca sunucudaki
-- service_role anahtarı erişebilir, tarayıcıdan erişilemez.
alter table public.leads enable row level security;

-- "Automatically expose new tables" kapalıysa tabloya yetki elle verilir.
-- Sadece sunucu (service_role) erişebilir; anon/authenticated rollerine yetki yok.
revoke all on public.leads from anon, authenticated;
grant select, insert, update, delete on public.leads to service_role;
