import EmployeeForm from "../../../components/forms/admin/employee/EmployeeForm";
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from "../../../auth/RoleBasedGuard";

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'user']} hasContent>
    <EmployeeForm/>
    </RoleBasedGuard>
  );
}
