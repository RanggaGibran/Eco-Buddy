/*
  # Add user insert policy

  1. Changes
    - Add RLS policy to allow users to create their own profile
    - This fixes the 42501 error when creating new users

  2. Security
    - Policy ensures users can only create their own profile
    - Maintains existing RLS policies
*/

-- Add policy for users to create their own profile
create policy "Users can insert their own profile"
  on public.users for insert
  to authenticated
  with check (auth.uid() = id);

-- Ensure email confirmation is disabled for development
update auth.config
set value = jsonb_set(value, '{mailer, autoconfirm}', 'true')
where name = 'mailer';