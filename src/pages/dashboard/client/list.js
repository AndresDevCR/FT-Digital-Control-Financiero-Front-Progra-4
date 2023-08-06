import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import ClientList from '../../../components/tables/admin/client/ClientList';
import DashboardLayout from '../../../layouts/dashboard';

list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list() {
  return (
    <RoleBasedGuard roles={['administrator','user', 'admin', 'superadmin']} hasContent>
      <ClientList />
    </RoleBasedGuard>
  );
}
