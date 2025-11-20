/*
  # Agregar Número de Empleado

  ## 1. Cambios Realizados
    - Se agrega el campo 'employee_number' a user_profiles para almacenar el número de empleado

  ## 2. Tabla Modificada
    
    ### `user_profiles`
    - Se agrega columna `employee_number` (text, opcional pero único cuando se proporciona)
    - Esta columna almacenará el número de empleado del usuario

  ## 3. Notas Importantes
    - El número de empleado es único cuando se proporciona
    - Esta migración solo agrega el campo, los cambios de roles se realizarán en otra migración
*/

-- Agregar la columna employee_number
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'employee_number'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN employee_number text;
    CREATE UNIQUE INDEX idx_user_profiles_employee_number ON user_profiles(employee_number) WHERE employee_number IS NOT NULL;
  END IF;
END $$;

-- Comentario de validación
COMMENT ON COLUMN user_profiles.employee_number IS 'Número único de empleado. Opcional pero debe ser único cuando se proporciona.';