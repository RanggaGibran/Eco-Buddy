-- Drop existing policies
drop policy if exists "Users can read all users" on public.users;
drop policy if exists "Users can create their own profile" on public.users;
drop policy if exists "Users can read their own profile" on public.users;
drop policy if exists "Users can insert their own profile" on public.users;

-- Create new policies
create policy "Enable read access for all users"
  on public.users for select
  using (true);

create policy "Enable insert for authenticated users only"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Enable update for users based on id"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);