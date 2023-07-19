import ApplicationList from "../../../components/tables/admin/application/ApplicationList";
import DashboardLayout from '../../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <ApplicationList/>
    )
}
