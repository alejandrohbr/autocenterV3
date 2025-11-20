export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  features: ProjectFeature[];
}

export interface ProjectFeature {
  id: string;
  name: string;
  route: string;
  icon: string;
  requiresPermission?: string;
}

export const AVAILABLE_PROJECTS: Project[] = [
  {
    id: 'autocenter',
    name: 'AutoCenter',
    slug: 'autocenter',
    description: 'Sistema de gestión para talleres mecánicos',
    icon: 'car',
    color: 'blue',
    enabled: true,
    features: [
      { id: 'dashboard', name: 'Dashboard', route: 'dashboard', icon: 'chart' },
      { id: 'new-budget', name: 'Nuevo Presupuesto', route: 'new-budget', icon: 'plus' },
      { id: 'validation-admin', name: 'Validación Admin', route: 'validation-admin', icon: 'check' },
      { id: 'validation-pre-oc', name: 'Validación Pre-OC', route: 'validation-pre-oc', icon: 'clipboard' },
      { id: 'reports', name: 'Reportes', route: 'reports', icon: 'document' },
      { id: 'analytics', name: 'Dashboard Gerencial', route: 'analytics', icon: 'chart-bar', requiresPermission: 'view_analytics' }
    ]
  },
  {
    id: 'decoraciones',
    name: 'Decoraciones',
    slug: 'decoraciones',
    description: 'Sistema de gestión para decoraciones',
    icon: 'sparkles',
    color: 'pink',
    enabled: true,
    features: [
      { id: 'dashboard', name: 'Dashboard', route: 'dashboard', icon: 'chart' },
      { id: 'new-budget', name: 'Nuevo Presupuesto', route: 'new-budget', icon: 'plus' },
      { id: 'validation-admin', name: 'Validación Admin', route: 'validation-admin', icon: 'check' },
      { id: 'validation-pre-oc', name: 'Validación Pre-OC', route: 'validation-pre-oc', icon: 'clipboard' },
      { id: 'reports', name: 'Reportes', route: 'reports', icon: 'document' },
      { id: 'analytics', name: 'Dashboard Gerencial', route: 'analytics', icon: 'chart-bar', requiresPermission: 'view_analytics' }
    ]
  },
  {
    id: 'hecho-a-la-medida',
    name: 'Hecho a la Medida',
    slug: 'hecho-a-la-medida',
    description: 'Sistema de gestión para proyectos personalizados',
    icon: 'adjustments',
    color: 'purple',
    enabled: true,
    features: [
      { id: 'dashboard', name: 'Dashboard', route: 'dashboard', icon: 'chart' },
      { id: 'new-budget', name: 'Nuevo Presupuesto', route: 'new-budget', icon: 'plus' },
      { id: 'validation-admin', name: 'Validación Admin', route: 'validation-admin', icon: 'check' },
      { id: 'validation-pre-oc', name: 'Validación Pre-OC', route: 'validation-pre-oc', icon: 'clipboard' },
      { id: 'reports', name: 'Reportes', route: 'reports', icon: 'document' },
      { id: 'analytics', name: 'Dashboard Gerencial', route: 'analytics', icon: 'chart-bar', requiresPermission: 'view_analytics' }
    ]
  }
];
