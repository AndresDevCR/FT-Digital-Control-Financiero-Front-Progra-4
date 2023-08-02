import PositionForm from '../../../components/forms/admin/position/PositionForm';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin']} hasContent>
      <PositionForm />
    </RoleBasedGuard>
  );
}
