export const APP_CONFIG = {
  IVA_RATE: 0.16,
  EMPLOYEE_DISCOUNT_RATE: 0.10,
  DEFAULT_MARGIN: 20,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
  },
  AUTOCOMPLETE: {
    MIN_SEARCH_LENGTH: 2,
    DEBOUNCE_TIME: 300
  },
  DATE_FORMATS: {
    DISPLAY: 'dd/MM/yyyy',
    API: 'yyyy-MM-dd'
  }
} as const;

export const AUTOCENTERS = [
  'AUTOCENTRO TLÁHUAC',
  'AUTOCENTRO VALLEJO',
  'AUTOCENTRO LINDAVISTA',
  'AUTOCENTRO COYOACÁN'
] as const;

export const DIVISIONS = [
  'SERVICIO AUTOMOTRIZ',
  'REFACCIONES',
  'LLANTAS',
  'BATERÍAS'
] as const;

export const PAYMENT_TYPES = [
  'Efectivo',
  'Tarjeta de Crédito',
  'Tarjeta de Débito',
  'Transferencia'
] as const;

export const PROMOTIONS = [
  '3 MESES SIN INT',
  '6 MESES SIN INT',
  '9 MESES SIN INT',
  '12 MESES SIN INT',
  '18 MESES SIN INT'
] as const;
