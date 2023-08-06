import ClientForm from '../../../components/forms/admin/client/ClientForm';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function add() {
  return (
    <RoleBasedGuard roles={['administrator','user', 'admin', 'superadmin']} hasContent>
      <ClientForm />
    </RoleBasedGuard>
  );
}
