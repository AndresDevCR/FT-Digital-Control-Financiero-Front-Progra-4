// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_INVOICE = '/invoice';
const ROOTS_HR = '/human-resources';
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
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
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
