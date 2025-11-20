/*
  # Actualizar Roles a 'Asesor' y Agregar Columna employee_number

  ## 1. Cambios Realizados
    - Se agrega la columna 'employee_number' a la tabla user_profiles para almacenar el número de empleado
    - Se actualiza todos los usuarios con rol 'tecnico' a rol 'asesor'
    - Se actualiza todos los usuarios con rol 'asesor_tecnico' a rol 'asesor'

  ## 2. Seguridad
    - Se mantienen todas las políticas RLS existentes
    - Las políticas se actualizarán automáticamente con los nuevos roles

  ## 3. Notas Importantes
    - Esta migración es idempotente (puede ejecutarse múltiples veces sin problemas)
    - Los roles 'tecnico' y 'asesor_tecnico' se consolidan en un solo rol 'asesor'
    - El campo employee_number es opcional para mantener compatibilidad con usuarios existentes
*/

-- Agregar columna employee_number si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'employee_number'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN employee_number text;
  END IF;
END $$;

-- Actualizar todos los usuarios con rol 'tecnico' a 'asesor'
UPDATE user_profiles
SET role = 'asesor'
WHERE role = 'tecnico';

-- Actualizar todos los usuarios con rol 'asesor_tecnico' a 'asesor'
UPDATE user_profiles
SET role = 'asesor'
WHERE role = 'asesor_tecnico';

-- Crear índice para employee_number para búsquedas más rápidas (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'user_profiles' AND indexname = 'idx_user_profiles_employee_number'
  ) THEN
    CREATE INDEX idx_user_profiles_employee_number ON user_profiles(employee_number);
  END IF;
END $$;
