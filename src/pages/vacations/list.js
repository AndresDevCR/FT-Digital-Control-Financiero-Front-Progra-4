import VacationList from "../../components/tables/vacations/VacationList";
import DashboardLayout from '../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <VacationList/>
    )
}
