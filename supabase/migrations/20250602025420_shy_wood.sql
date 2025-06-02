-- Create users table
create table public.users (
  id uuid references auth.users on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  name text not null,
  avatar_url text,
  location text,
  bio text,
  sustainability_score integer default 0,
  completed_challenges integer default 0,
  streak integer default 0,
  primary key (id)
);

-- Create eco_actions table
create table public.eco_actions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  impact_carbon numeric not null,
  impact_water numeric not null,
  impact_waste numeric not null,
  impact_energy numeric not null,
  difficulty text not null,
  category text not null,
  image_url text
);

-- Create challenges table
create table public.challenges (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  duration integer not null,
  points integer not null,
  category text not null,
  steps text[] not null,
  image_url text
);

-- Create user_challenges table
create table public.user_challenges (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.users on delete cascade not null,
  challenge_id uuid references public.challenges on delete cascade not null,
  progress integer default 0,
  completed boolean default false
);

-- Create community_posts table
create table public.community_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.users on delete cascade not null,
  title text not null,
  content text not null,
  likes integer default 0,
  comments integer default 0,
  tags text[] default '{}'::text[]
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.eco_actions enable row level security;
alter table public.challenges enable row level security;
alter table public.user_challenges enable row level security;
alter table public.community_posts enable row level security;

-- Create policies
create policy "Users can read all users"
  on public.users for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.users for update
  to authenticated
  using (auth.uid() = id);

create policy "Anyone can read eco actions"
  on public.eco_actions for select
  to anon, authenticated
  using (true);

create policy "Anyone can read challenges"
  on public.challenges for select
  to anon, authenticated
  using (true);

create policy "Users can read their challenges"
  on public.user_challenges for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their challenges"
  on public.user_challenges for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their challenges"
  on public.user_challenges for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Anyone can read community posts"
  on public.community_posts for select
  to anon, authenticated
  using (true);

create policy "Users can create posts"
  on public.community_posts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their posts"
  on public.community_posts for update
  to authenticated
  using (auth.uid() = user_id);