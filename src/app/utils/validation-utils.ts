export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function isValidRFC(rfc: string): boolean {
  const rfcRegex = /^([A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3})$/;
  return rfcRegex.test(rfc.toUpperCase());
}

export function validateRequired(value: any, fieldName: string): string | null {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} es requerido`;
  }
  return null;
}

export function validatePositiveNumber(value: number, fieldName: string): string | null {
  if (value < 0) {
    return `${fieldName} debe ser un número positivo`;
  }
  return null;
}
