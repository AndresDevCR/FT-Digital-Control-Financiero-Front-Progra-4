// routes
import { PATH_DASHBOARD, INVOICE, HR, INVENTORY, VACATIONS, QUOTES, UPLOAD } from '../../../routes/paths';

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
          { title: 'Agregar Usuario', path: PATH_DASHBOARD.user.useradd },
          { title: 'Lista de Usuarios', path: PATH_DASHBOARD.user.userlist },
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
        icon: ICONS.dashboard,
        children: [
          { title: 'Agregar Facturas', path: INVOICE.invoice },
          { title: 'Lista de Facturas', path: INVOICE.list },
          { title: 'Editar Facturas', path: INVOICE.edit },

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
        icon: ICONS.user,
        children: [
          { title: 'Agregar Empleado', path: HR.hradd },
          { title: 'Lista de Empleados', path: HR.hrlist },
        ],
      },
    ],
  },

  // Inventario
  // -----------------------------------------------------------------------
  {
    subheader: 'Inventario',
    items: [
      {
        title: 'Inventario',
        path: INVENTORY.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Agregar inventario', path: INVENTORY.inventoryadd },
          { title: 'Lista de inventario', path: INVENTORY.inventorylist },
        ],
      },
    ],
  },

  // Vacaciones
  // -----------------------------------------------------------------------
  {
    subheader: 'Vacaciones',
    items: [
      {
        title: 'Vacaciones',
        path: VACATIONS.root,
        icon: ICONS.user,
        children: [
          { title: 'Solicitar Vacaciones', path: VACATIONS.vacationsadd },
          { title: 'Lista de Vacaciones', path: VACATIONS.vacationslist },
        ],
      },
    ],
  },

// Cotizaciones
  {
    subheader: 'Cotizaciones',
    items: [
      {
        title: 'Cotizaciones',
        path: QUOTES.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Agregar cotizacion', path: QUOTES.quotesadd },
          { title: 'Lista de Cotizaciones', path: QUOTES.quoteslist },
        ],
      },
    ],
  }, 

  // Subir Archivos
  {
    subheader: ' Archivos',
    items: [
      {
        title: 'Subir Archivos',

        path: UPLOAD.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Agregar Archivos', path: UPLOAD.upload },
          
        ],
      },
    ],
  },





];

export default navConfig;
