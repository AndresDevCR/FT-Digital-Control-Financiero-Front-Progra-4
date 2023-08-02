import RoleBasedGuard from "../../../auth/RoleBasedGuard";
import CompanyForm from "../../../components/forms/admin/company/CompanyForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'superadmin']} hasContent>
      <CompanyForm />
    </RoleBasedGuard>
  );
}
