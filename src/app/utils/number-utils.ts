export function parseIntSafe(value: any): number {
  return parseInt(value);
}

export function calculateMargin(costo: number, precio: number): number {
  if (costo === 0) return 0;
  return ((precio - costo) / costo) * 100;
}

export function calculatePriceFromMargin(costo: number, margen: number): number {
  return costo * (1 + margen / 100);
}

export function roundToDecimals(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value);
}

export function formatCurrencyValue(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${roundToDecimals(value, 2)}%`;
}
