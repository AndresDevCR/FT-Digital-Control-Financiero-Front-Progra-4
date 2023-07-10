// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_INVOICE = '/invoice';
const ROOTS_HR = '/human-resources';
const ROOTS_INVENTORY = '/inventory';
const ROOTS_VACATIONS = '/vacations';
const ROOTS_QUOTES = '/quotes';
const ROOTS_UPLOAD = '/upload-files';
const ROOTS_APPLICATION = '/dashboard/application';
const ROOTS_CLIENT = '/dashboard/client';
const ROOTS_COMPANY = '/dashboard/company';
const ROOTS_DEPARTMENT = '/dashboard/department';
const ROOTS_EMPLOYEE = '/dashboard/employee';
const ROOTS_ENTERPRISE = '/dashboard/enterprise';
const ROOTS_PERMISSION = '/dashboard/permission';
const ROOTS_POSITION = '/dashboard/position';
const ROOTS_PROVIDER = '/dashboard/provider';
const ROOTS_ROLES = '/dashboard/roles';
const ROOTS_SUPPLIER = '/dashboard/supplier';
const ROOTS_USER = '/dashboard/user';
const ROOTS_PAYMENTS = '/payments';
const ROOTS_QUOTATIONS = '/quotations';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    useradd: path(ROOTS_DASHBOARD, '/user/add'),
    userlist: path(ROOTS_DASHBOARD, '/user/list'),
    useredit: path(ROOTS_DASHBOARD, '/user/edit'),    
  },
};

export const INVOICE = {
  root: ROOTS_INVOICE,
  invoiceadd: path(ROOTS_INVOICE, '/add'),
  invoicelist: path(ROOTS_INVOICE, '/list'),
};

export const HR = {
  root: ROOTS_HR,
  hradd: path(ROOTS_HR, '/add'),
  hrlist: path(ROOTS_HR, '/list'),
}; 

export const INVENTORY = {
  root: ROOTS_INVENTORY,
  inventoryadd: path(ROOTS_INVENTORY, '/add'),
  inventorylist: path(ROOTS_INVENTORY, '/list'),
  inventoryedit: path(ROOTS_INVENTORY, '/edit'),
}; 

export const VACATIONS = {
  root: ROOTS_VACATIONS,
  vacationsadd: path(ROOTS_VACATIONS, '/add'),
  vacationslist: path(ROOTS_VACATIONS, '/list'),
  vacationsedit: path(ROOTS_VACATIONS, '/edit'),
}; 

export const QUOTES = {
  root: ROOTS_QUOTES,
  quotesadd: path(ROOTS_QUOTES, '/add'),
  quoteslist: path(ROOTS_QUOTES, '/list'),
  quotesedit: path(ROOTS_QUOTES, '/edit'),

}; 

export const UPLOAD = {  
  root: ROOTS_UPLOAD,
  upload: path(ROOTS_UPLOAD, '/file-upload'),
};

export const APPLICATION = {
  root: ROOTS_APPLICATION,
  applicationadd: path(ROOTS_APPLICATION, '/add'),
  applicationlist: path(ROOTS_APPLICATION, '/list'),
  applicationedit: path(ROOTS_APPLICATION, '/edit'),

};

export const CLIENT = {
  root: ROOTS_CLIENT,
  clientadd: path(ROOTS_CLIENT, '/add'),
  clientlist: path(ROOTS_CLIENT, '/list'),
  clientedit: path(ROOTS_CLIENT, '/edit'),
};

export const COMPANY = {
  root: ROOTS_COMPANY,
  companyadd: path(ROOTS_COMPANY, '/add'),
  companylist: path(ROOTS_COMPANY, '/list'),
  companyedit: path(ROOTS_COMPANY, '/edit'),
};

export const DEPARTMENT = {
  root: ROOTS_DEPARTMENT,
  departmentadd: path(ROOTS_DEPARTMENT, '/add'),
  departmentlist: path(ROOTS_DEPARTMENT, '/list'),
  departmentedit: path(ROOTS_DEPARTMENT, '/edit'),
};

export const EMPLOYEE = {
  root: ROOTS_EMPLOYEE,
  employeeadd: path(ROOTS_EMPLOYEE, '/add'),
  employeelist: path(ROOTS_EMPLOYEE, '/list'),
  employeeedit: path(ROOTS_EMPLOYEE, '/edit'),
};

export const ENTERPRISE = {
  root: ROOTS_ENTERPRISE,
  enterpriseadd: path(ROOTS_ENTERPRISE, '/add'),
  enterpriselist: path(ROOTS_ENTERPRISE, '/list'),
  enterpriseedit: path(ROOTS_ENTERPRISE, '/edit'),
};

export const PERMISSION = {
  root: ROOTS_PERMISSION,
  permissionadd: path(ROOTS_PERMISSION, '/add'),
  permissionlist: path(ROOTS_PERMISSION, '/list'),
  permissionedit: path(ROOTS_PERMISSION, '/edit'),
};

export const POSITION = {
  root: ROOTS_POSITION,
  positionadd: path(ROOTS_POSITION, '/add'),
  positionlist: path(ROOTS_POSITION, '/list'),
  positionedit: path(ROOTS_POSITION, '/edit'),
};

export const PROVIDER = {
  root: ROOTS_PROVIDER,
  provideradd: path(ROOTS_PROVIDER, '/add'),
  providerlist: path(ROOTS_PROVIDER, '/list'),
  provideredit: path(ROOTS_PROVIDER, '/edit'),
};

export const ROLES = {
  root: ROOTS_ROLES,
  rolesadd: path(ROOTS_ROLES, '/add'),
  roleslist: path(ROOTS_ROLES, '/list'),
  rolesedit: path(ROOTS_ROLES, '/edit'),
};

export const SUPPLIER = {
  root: ROOTS_SUPPLIER,
  supplieradd: path(ROOTS_SUPPLIER, '/add'),
  supplierlist: path(ROOTS_SUPPLIER, '/list'),
  supplieredit: path(ROOTS_SUPPLIER, '/edit'),
};

export const USER = {
  root: ROOTS_USER,
  useradd: path(ROOTS_USER, '/add'),
  userlist: path(ROOTS_USER, '/list'),
  useredit: path(ROOTS_USER, '/edit'),
};


export const PAYMENTS = {
  root: ROOTS_PAYMENTS,
  paymentsadd: path(ROOTS_PAYMENTS, '/add'),
  paymentslist: path(ROOTS_PAYMENTS, '/list'),
  paymentsedit: path(ROOTS_PAYMENTS, '/edit'),
};

export const QUOTATIONS = {
  root: ROOTS_QUOTATIONS,
  quotationsadd: path(ROOTS_QUOTATIONS, '/add'),
  quotationslist: path(ROOTS_QUOTATIONS, '/list'),
  quotationsedit: path(ROOTS_QUOTATIONS, '/edit'),
};
