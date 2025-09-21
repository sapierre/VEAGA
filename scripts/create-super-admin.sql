-- Script to create a super admin user for testing
-- Run this in your database to create a super admin user

-- First, check if the role column exists and add it if needed
DO $$
BEGIN
    -- Create user_role enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');
    END IF;

    -- Add role column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role user_role DEFAULT 'user';
    END IF;
END
$$;

-- Create or update a super admin user
-- Replace 'your-email@example.com' with your actual email
INSERT INTO users (
    id,
    name,
    email,
    email_verified,
    role,
    is_anonymous,
    created_at,
    updated_at
) VALUES (
    'super_admin_' || generate_random_uuid(),
    'Super Admin',
    'admin@veaga.ai',  -- Change this to your email
    true,
    'super_admin',
    false,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    role = 'super_admin',
    name = 'Super Admin';

-- Verify the super admin user was created
SELECT id, name, email, role FROM users WHERE role = 'super_admin';

-- Instructions:
-- 1. Run this script in your PostgreSQL database
-- 2. Login as anonymous user at http://localhost:3003/auth/login
-- 3. Manually update the anonymous user's role to 'super_admin' in the database
-- 4. Refresh the page to see the "Admin Dashboard" link in the sidebar
-- 5. Navigate to /dashboard/admin to access the super admin interface