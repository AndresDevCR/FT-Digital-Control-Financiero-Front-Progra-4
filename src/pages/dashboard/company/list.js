import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import CompanyList from '../../../components/tables/admin/company/CompanyList';
import DashboardLayout from '../../../layouts/dashboard';
// components

list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'superadmin']} hasContent>
      <CompanyList />
    </RoleBasedGuard>
  );
}
