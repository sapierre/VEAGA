-- Make pierre.shaun@gmail.com a super admin
UPDATE users
SET role = 'super_admin'
WHERE email = 'pierre.shaun@gmail.com';

-- Verify the change
SELECT email, role FROM users WHERE email = 'pierre.shaun@gmail.com';