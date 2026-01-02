-- Profiles table to store user career info and onboarding state
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  career_goals text,
  interests text,
  life_goals text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Jobs table (Seed data will be added later)
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  description text not null,
  salary_range text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications table to track swiped-right jobs
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  status text default 'applied' check (status in ('applied', 'interviewing', 'offered', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, job_id)
);

-- Discarded jobs table to track swiped-left jobs (for 5s undo)
create table if not exists public.discarded_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, job_id)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.discarded_jobs enable row level security;

-- RLS Policies
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

create policy "Anyone can view jobs" on public.jobs for select using (true);

create policy "Users can manage their own applications" on public.applications for all using (auth.uid() = user_id);
create policy "Users can manage their own discarded jobs" on public.discarded_jobs for all using (auth.uid() = user_id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', 'User'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
