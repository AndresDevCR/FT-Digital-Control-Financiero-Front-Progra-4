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
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    useradd: path(ROOTS_DASHBOARD, '/user/add'),
    userlist: path(ROOTS_DASHBOARD, '/user/list'),
    useredit: path(ROOTS_DASHBOARD, '/user/edit'),    
  },
};

export const INVOICE = {
  root: ROOTS_INVOICE,
  invoice: path(ROOTS_INVOICE, '/add'),
  list: path(ROOTS_INVOICE, '/list'),
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