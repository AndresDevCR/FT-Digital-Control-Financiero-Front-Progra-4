import EnterpriseForm from '../../../components/tables/admin/enterprise/EnterpriseList';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin','user']} hasContent>
      <EnterpriseForm />
    </RoleBasedGuard>
  );
}
