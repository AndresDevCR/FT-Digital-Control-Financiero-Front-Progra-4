import EmployeeList from "../../../components/tables/admin/employee/EmployeeList";
import DashboardLayout from '../../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <EmployeeList/>
    )
}
