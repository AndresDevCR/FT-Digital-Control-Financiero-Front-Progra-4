import RoleForm from "../../../components/forms/admin/roles/RoleForm";
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from "../../../auth/RoleBasedGuard";

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleForm/>
  );
}