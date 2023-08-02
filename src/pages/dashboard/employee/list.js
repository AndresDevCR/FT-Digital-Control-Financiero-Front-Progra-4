import EmployeeList from "../../../components/tables/admin/employee/EmployeeList";
import DashboardLayout from '../../../layouts/dashboard';
// components
import RoleBasedGuard from "../../../auth/RoleBasedGuard";


list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <RoleBasedGuard roles={['administrator', 'user']} hasContent>
        <EmployeeList/>
        </RoleBasedGuard>
    )
}
