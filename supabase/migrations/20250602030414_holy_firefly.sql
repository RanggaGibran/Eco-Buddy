-- Add policy for users to create their own profile
create policy "Users can create their own profile"
  on public.users for insert
  to authenticated
  with check (auth.uid() = id);

-- Add policy for users to read their own profile
create policy "Users can read their own profile"
  on public.users for select
  to authenticated
  using (auth.uid() = id);