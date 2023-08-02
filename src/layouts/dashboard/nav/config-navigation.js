// icons
import AppsIcon from '@mui/icons-material/Apps';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import FactoryIcon from '@mui/icons-material/Factory';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InventoryIcon from '@mui/icons-material/Inventory';

// routes
import {
  PATH_DASHBOARD,
  INVOICE,
  HR,
  INVENTORY,
  VACATIONS,
  QUOTES,
  UPLOAD,
  APPLICATION,
  CLIENT,
  COMPANY,
  DEPARTMENT,
  EMPLOYEE,
  ENTERPRISE,
  PERMISSION,
  POSITION,
  ROLES,
  SUPPLIER,
  USER,
  PAYMENTS,
  QUOTATIONS,
} from '../../../routes/paths';

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
  application: <AppsIcon />,
  administration: <SupervisorAccountIcon />,
  client: <PersonPinIcon />,
  company: <FactoryIcon />,
  department: <GroupsIcon />,
  employee: <BadgeIcon />,
  enterprise: <ApartmentIcon />,
  permission: <CheckCircleIcon />,
  roles: <VpnKeyIcon />,
  position: <DeviceHubIcon />,
  appcontrol: <AdminPanelSettingsIcon />,
  admincontrol: <CardTravelIcon />,
  quotations: <RequestQuoteIcon />,
  invoice: <ReceiptIcon />,
  payments: <PaymentsIcon />,
  vacations: <BeachAccessIcon />,
  financecontrol: <PriceChangeIcon />,
  finance: <AccountBalanceWalletIcon />,
  humanresources: <ContactMailIcon />,
  inventory: <InventoryIcon />,
  supplier: <LocalShippingIcon />,
};

const roles = ['admin', 'administrator'];


const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: `${roles.includes('admin') ? 'Administración' : ' '}`,
    items: roles.includes('admin')
      ? [
        {
          title: 'Administración',
          path: '',
          icon: ICONS.administration,

          children: [
            {
              title: `${roles.includes('admin') ? 'Control App' : ''}`,
              path: PATH_DASHBOARD.user.root,
              icon: ICONS.appcontrol,
              children: roles.includes('admin') ? [
                {
                  title: 'Usuarios',
                  path: PATH_DASHBOARD.user.root,
                  icon: ICONS.user,
                  children: [
                    { title: 'Agregar Usuario', path: PATH_DASHBOARD.user.useradd },
                    { title: 'Lista de Usuarios', path: PATH_DASHBOARD.user.userlist },
                  ],
                },
                {
                  title: 'Aplicaciones',
                  path: APPLICATION.root,
                  icon: ICONS.application,
                  children: [
                    { title: 'Agregar Aplicación', path: APPLICATION.applicationadd },
                    { title: 'Lista de Aplicaciones', path: APPLICATION.applicationlist },
                  ],
                },
                {
                  title: 'Compañías',
                  path: COMPANY.root,
                  icon: ICONS.company,
                  children: [
                    { title: 'Agregar Compañía', path: COMPANY.companyadd },
                    { title: 'Lista de Compañias', path: COMPANY.companylist },
                  ],
                },
                {
                  title: 'Roles',
                  path: ROLES.root,
                  icon: ICONS.roles,
                  children: [
                    { title: 'Agregar Rol', path: ROLES.rolesadd },
                    { title: 'Lista de Roles', path: ROLES.roleslist },
                  ],
                },
              ] : [],
            },
            {
              title: 'Control Admin',
              icon: ICONS.admincontrol,
              path: PATH_DASHBOARD.user.root,
              children: roles.includes('admin') ? [
                {
                  title: 'Clientes',
                  path: CLIENT.root,
                  icon: ICONS.client,
                  children: [
                    { title: 'Agregar Cliente', path: CLIENT.clientadd },
                    { title: 'Lista de Clientes', path: CLIENT.clientlist },
                  ],
                },
                {
                  title: 'Departamento',
                  path: DEPARTMENT.root,
                  icon: ICONS.department,
                  children: [
                    { title: 'Agregar Departamento', path: DEPARTMENT.departmentadd },
                    { title: 'Lista de Departamentos', path: DEPARTMENT.departmentlist },
                  ],
                },
                {
                  title: 'Empleados',
                  path: EMPLOYEE.root,
                  icon: ICONS.employee,
                  children: [
                    { title: 'Agregar Empleado', path: EMPLOYEE.employeeadd },
                    { title: 'Lista de Empleados', path: EMPLOYEE.employeelist },
                  ],
                },
                {
                  title: 'Empresas',
                  path: ENTERPRISE.root,
                  icon: ICONS.enterprise,
                  children: [
                    { title: 'Agregar Empresa', path: ENTERPRISE.enterpriseadd },
                    { title: 'Lista de Empresa', path: ENTERPRISE.enterpriselist },
                  ],
                },
                {
                  title: 'Puestos',
                  path: POSITION.root,
                  icon: ICONS.position,
                  children: [
                    { title: 'Agregar Puesto', path: POSITION.positionadd },
                    { title: 'Lista de Puestos', path: POSITION.positionlist },
                  ],
                },
                {
                  title: 'Proveedores',
                  path: SUPPLIER.root,
                  icon: ICONS.supplier,
                  children: [
                    { title: 'Agregar Proveedor', path: SUPPLIER.supplieradd },
                    { title: 'Lista de Proveedores', path: SUPPLIER.supplierlist },
                  ],
                },
              ] : [],
            },
          ],
        },
      ]
      : [],

  },
  // Control Financiero
  // -----------------------------------------------------------------------
  {
    subheader: 'Control Financiero',
    items: [
      {
        title: 'Control Financiero',
        path: '',
        icon: ICONS.financecontrol,
        children: [
          {
            title: 'Finanzas',
            path: '',
            icon: ICONS.finance,
            children: [
              {
                title: 'Cotizaciones',
                path: QUOTATIONS.root,
                icon: ICONS.quotations,
                children: [
                  { title: 'Agregar Cotización', path: QUOTATIONS.quotationsadd },
                  { title: 'Lista de Cotizaciones', path: QUOTATIONS.quotationslist },
                ],
              },
              {
                title: 'Facturas',
                path: INVOICE.root,
                icon: ICONS.invoice,
                children: [
                  { title: 'Agregar Factura', path: INVOICE.invoiceadd },
                  { title: 'Lista de Facturas', path: INVOICE.invoicelist },
                ],
              },
            ],
          },
          {
            title: 'H R',
            path: '',
            icon: ICONS.humanresources,
            children: [
              {
                title: 'Pagos',
                path: PAYMENTS.root,
                icon: ICONS.payments,
                children: [
                  { title: 'Agregar Pago', path: PAYMENTS.paymentsadd },
                  { title: 'Lista de Pagos', path: PAYMENTS.paymentslist },
                ],
              },
              {
                title: 'Vacaciones',
                path: VACATIONS.root,
                icon: ICONS.vacations,
                children: [
                  { title: 'Solicitar Vacaciones', path: VACATIONS.vacationsadd },
                  { title: 'Lista de Vacaciones', path: VACATIONS.vacationslist },
                ],
              },
            ],
          },
          {
            title: 'Inventario',
            path: INVENTORY.root,
            icon: ICONS.inventory,
            children: [
              { title: 'Agregar inventario', path: INVENTORY.inventoryadd },
              { title: 'Lista de inventario', path: INVENTORY.inventorylist },
            ],
          },
        ],
      },
    ],
  },
];

export default navConfig;