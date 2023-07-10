import DepartmentList from "../../../components/tables/admin/department/DepartmentList";
import DashboardLayout from '../../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    return (
        <DepartmentList/>
    )
}
