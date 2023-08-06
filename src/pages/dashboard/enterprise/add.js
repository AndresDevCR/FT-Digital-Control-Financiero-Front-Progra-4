import EnterpriseForm from '../../../components/forms/admin/enterprise/EnterpriseForm';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator','user', 'admin']} hasContent>
      <EnterpriseForm />
    </RoleBasedGuard>
  );
}
