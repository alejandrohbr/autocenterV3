export const ORDER_STATUS = {
  PENDING_AUTHORIZATION: 'Pendiente de Autorización',
  AUTHORIZED: 'Autorizado',
  REJECTED: 'Rechazado',
  PRODUCTS_VALIDATED: 'Productos Validados',
  PRODUCTS_PROCESSED: 'Productos Procesados',
  DELIVERED: 'Entregado'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_COLORS: Record<string, string> = {
  [ORDER_STATUS.PENDING_AUTHORIZATION]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.AUTHORIZED]: 'bg-green-100 text-green-800',
  [ORDER_STATUS.REJECTED]: 'bg-red-100 text-red-800',
  [ORDER_STATUS.PRODUCTS_VALIDATED]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUS.PRODUCTS_PROCESSED]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUS.DELIVERED]: 'bg-gray-100 text-gray-800'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial'
} as const;

export const DELIVERY_STATUS = {
  PENDING: 'pending',
  DELIVERED: 'delivered'
} as const;

export const VALIDATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;
