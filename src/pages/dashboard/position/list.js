import PositionForm from '../../../components/tables/admin/position/PositionList';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator','user', 'admin']} hasContent>
      <PositionForm />
    </RoleBasedGuard>
  );
}
