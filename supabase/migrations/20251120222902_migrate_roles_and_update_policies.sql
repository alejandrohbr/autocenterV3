/*
  # Migrar Roles y Actualizar Políticas RLS

  ## 1. Cambios Realizados
    - Se migran usuarios con rol 'asesor_tecnico' al nuevo rol 'asesor'
    - Se actualizan las políticas RLS para usar los nuevos roles
    - Se eliminan roles obsoletos del sistema

  ## 2. Migración de Datos
    - Usuarios con 'asesor_tecnico' → 'asesor'

  ## 3. Políticas RLS Actualizadas
    - Admin Corporativo ahora gestiona: 'gerente' y 'asesor'
    - Se eliminan referencias a 'tecnico' y 'asesor_tecnico'

  ## 4. Notas Importantes
    - Después de esta migración, los roles permitidos son: 'super_admin', 'admin_corporativo', 'gerente', 'asesor'
*/

-- Migrar usuarios con rol 'asesor_tecnico' a 'asesor'
UPDATE user_profiles SET role = 'asesor' WHERE role = 'asesor_tecnico';

-- Actualizar políticas RLS para reflejar los nuevos roles
-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Admin corporativo can view managed users" ON user_profiles;
DROP POLICY IF EXISTS "Admin corporativo can insert managed users" ON user_profiles;
DROP POLICY IF EXISTS "Admin corporativo can update managed users" ON user_profiles;
DROP POLICY IF EXISTS "Admin corporativo can delete managed users" ON user_profiles;

-- Recrear políticas con los nuevos roles
CREATE POLICY "Admin corporativo can view managed users"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.role = 'admin_corporativo' 
      AND up.is_active = true
    )
    AND role IN ('gerente', 'asesor')
  );

CREATE POLICY "Admin corporativo can insert managed users"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.role = 'admin_corporativo' 
      AND up.is_active = true
    )
    AND role IN ('gerente', 'asesor')
  );

CREATE POLICY "Admin corporativo can update managed users"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.role = 'admin_corporativo' 
      AND up.is_active = true
    )
    AND role IN ('gerente', 'asesor')
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.role = 'admin_corporativo' 
      AND up.is_active = true
    )
    AND role IN ('gerente', 'asesor')
  );

CREATE POLICY "Admin corporativo can delete managed users"
  ON user_profiles FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.role = 'admin_corporativo' 
      AND up.is_active = true
    )
    AND role IN ('gerente', 'asesor')
  );