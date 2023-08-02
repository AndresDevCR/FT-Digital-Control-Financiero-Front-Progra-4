import InventoryList from "../../components/tables/inventory/InventoryList";
import DashboardLayout from '../../layouts/dashboard';
// components
import RoleBasedGuard from "../../auth/RoleBasedGuard";


list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <InventoryList/>
    )
}
