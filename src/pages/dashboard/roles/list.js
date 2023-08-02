import RoleList from '../../../components/tables/admin/roles/RoleList';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from "../../../auth/RoleBasedGuard";

list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list() {
    return (
        <RoleList />
    );
}
