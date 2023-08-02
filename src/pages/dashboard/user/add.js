import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import UserForm from '../../../components/forms/admin/user/UserForm';
import DashboardLayout from '../../../layouts/dashboard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin']} hasContent>
      <UserForm />
    </RoleBasedGuard>
  );
}
