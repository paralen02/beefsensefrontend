import { NavItem } from './nav-item/nav-item';

export const navItems: { [key: string]: NavItem[] } = {
  OPERARIO: [
    {
      navCap: 'ANALÍTICAS',
      divider: true
    },
    {
      displayName: 'Dashboard',
      iconName: 'solar:diagram-up-line-duotone',
      route: '/dashboard',
    },
    {
      navCap: 'CONTROL DE INVENTARIO',
      divider: true
    },
    {
      displayName: 'Registrar Carne',
      iconName: 'solar:document-add-line-duotone',
      route: '/ui-components/forms',
    },
    {
      displayName: 'Productos',
      iconName: 'solar:database-line-duotone',
      route: '/ui-components/tables',
    },
    {
      navCap: 'CENTRO DE AYUDA',
      divider: true
    },
    {
      displayName: 'Guia de Usuario',
      iconName: 'solar:clipboard-list-line-duotone',
      route: '/ui-components/guide',
    },
    {
      displayName: 'Soporte',
      iconName: 'solar:question-square-line-duotone',
      route: '/authentication/support',
    },
  ],
  ADMIN: [
    {
      navCap: 'ANALÍTICAS',
      divider: true
    },
    {
      displayName: 'Dashboard',
      iconName: 'solar:diagram-up-line-duotone',
      route: '/dashboard',
    },
    {
      navCap: 'ADMINISTRACIÓN',
      divider: true
    },
    {
      displayName: 'Gestionar Usuarios',
      iconName: 'solar:users-group-two-rounded-line-duotone',
      route: '/ui-components/operators',
    },
    {
      displayName: 'Gestionar Consultas',
      iconName: 'solar:document-add-line-duotone',
      route: '/ui-components/inquiries',
    },
  ]
};
