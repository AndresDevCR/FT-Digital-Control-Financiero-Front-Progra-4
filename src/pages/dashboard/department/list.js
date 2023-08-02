import DepartmentList from "../../../components/tables/admin/department/DepartmentList";
import DashboardLayout from '../../../layouts/dashboard';
// components
import RoleBasedGuard from "../../../auth/RoleBasedGuard";


list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list() {

    return (
        <RoleBasedGuard roles={['administrator', 'admin', 'superadmin', 'user']} hasContent>
            <DepartmentList />
        </RoleBasedGuard>
    );
}
