// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import { INVOICE } from '../../../routes/paths';

import { HR } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'ADMINISTRACIÓN',
    items: [
      {
        title: 'Control de Usuarios',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },

  // Facturas
  // -----------------------------------------------------------------------
  {
    subheader: 'Facturas',
    items: [
      {
        title: 'Facturas',
        path: INVOICE.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Agregar Facturas', path: INVOICE.invoice },
          { title: 'Lista de Facturas', path: INVOICE.list },
        ],
      },
    ],
  },

  // Recursos Humanos
  // -----------------------------------------------------------------------
  {
    subheader: 'Recursos Humanos',
    items: [
      {
        title: 'Recursos Humanos',
        path: HR.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Agregar Empleado', path: HR.hradd },
          { title: 'Lista de Empleados', path: HR.hrlist },
        ],
      },
    ],
  },



];

export default navConfig;
