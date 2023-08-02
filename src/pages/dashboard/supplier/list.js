import SupplierForm from '../../../components/tables/admin/supplier/SupplierList';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin']} hasContent>
      <SupplierForm />
    </RoleBasedGuard>
  );
}
