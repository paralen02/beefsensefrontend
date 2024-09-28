import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [

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
];
