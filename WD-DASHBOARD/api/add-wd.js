create table if not exists public.withdraw_logs (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  username text not null,
  name text not null,
  bank text not null,
  amount_raw text not null,
  amount_numeric numeric(18,2) not null,
  ip text,
  source text
);
