import UserList from "../../../components/tables/admin/user/UserList";
import DashboardLayout from '../../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <UserList/>
    )
}
