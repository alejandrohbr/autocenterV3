/*
  # Agregar Rol 'Asesor' al ENUM

  ## 1. Cambios Realizados
    - Se agrega el valor 'asesor' al ENUM user_role existente

  ## 2. Notas Importantes
    - Este cambio debe hacerse en una transacción separada antes de la migración de datos
    - Después de esta migración, se puede proceder a actualizar los roles existentes
*/

-- Agregar 'asesor' al ENUM existente
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'asesor';