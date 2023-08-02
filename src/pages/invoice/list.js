import InvoiceList from '../../components/tables/invoice/InvoiceList';
import DashboardLayout from '../../layouts/dashboard';
// components
import RoleBasedGuard from '../../auth/RoleBasedGuard';

list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <InvoiceList />
    </RoleBasedGuard>
  );
}
