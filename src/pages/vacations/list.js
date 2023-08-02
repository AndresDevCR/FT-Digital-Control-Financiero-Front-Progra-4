import VacationList from "../../components/tables/vacations/VacationList";
import DashboardLayout from '../../layouts/dashboard';
// components
import RoleBasedGuard from "../../auth/RoleBasedGuard";


list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <VacationList/>
    )
}
