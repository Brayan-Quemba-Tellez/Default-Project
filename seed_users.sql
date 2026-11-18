-- Script para registrar y actualizar usuarios en PostgreSQL (pymedb)
-- Credenciales:
-- Administrador: admin@pymes.com  /  admin@pymedb.com  -> Contraseña: Admin1234*
-- Cliente Prueba: cliente@pymes.com / cliente@pymedb.com -> Contraseña: Admin1234*

INSERT INTO users (id, email, password_hash, full_name, phone, document_type, document_number, role, is_active, created_at, updated_at)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'admin@pymes.com',
    '$2b$12$40DqxadZxJGi35.kRNccD.an60JsmpeSajORaWRbKcUZkE4P4Z6iq',
    'Administrador PyMEs',
    '3001234567',
    'CC',
    '1000000001',
    'admin',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    role = 'admin',
    is_active = true;

INSERT INTO users (id, email, password_hash, full_name, phone, document_type, document_number, role, is_active, created_at, updated_at)
VALUES (
    'a0000000-0000-0000-0000-000000000002',
    'admin@pymedb.com',
    '$2b$12$40DqxadZxJGi35.kRNccD.an60JsmpeSajORaWRbKcUZkE4P4Z6iq',
    'Administrador PyMEs',
    '3001234568',
    'CC',
    '1000000002',
    'admin',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    role = 'admin',
    is_active = true;

INSERT INTO users (id, email, password_hash, full_name, phone, document_type, document_number, role, is_active, created_at, updated_at)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'cliente@pymes.com',
    '$2b$12$40DqxadZxJGi35.kRNccD.an60JsmpeSajORaWRbKcUZkE4P4Z6iq',
    'Cliente de Prueba',
    '3109876543',
    'CC',
    '1000000003',
    'customer',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    role = 'customer',
    is_active = true;

INSERT INTO users (id, email, password_hash, full_name, phone, document_type, document_number, role, is_active, created_at, updated_at)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'cliente@pymedb.com',
    '$2b$12$40DqxadZxJGi35.kRNccD.an60JsmpeSajORaWRbKcUZkE4P4Z6iq',
    'Cliente de Prueba',
    '3109876544',
    'CC',
    '1000000004',
    'customer',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    role = 'customer',
    is_active = true;
