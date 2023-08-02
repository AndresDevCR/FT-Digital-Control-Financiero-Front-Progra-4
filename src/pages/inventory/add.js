import InventoryForm from '../../components/forms/inventory/InventoryForm';
import DashboardLayout from '../../layouts/dashboard';
import RoleBasedGuard from '../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <InventoryForm />
    </RoleBasedGuard>
  );
}
