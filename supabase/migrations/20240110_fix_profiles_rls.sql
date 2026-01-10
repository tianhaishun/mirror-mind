-- Fix Profiles RLS to allow insertion during registration
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Make profiles publicly viewable (needed for blog posts to show author names)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Public can view profiles" ON profiles FOR SELECT USING (true);
