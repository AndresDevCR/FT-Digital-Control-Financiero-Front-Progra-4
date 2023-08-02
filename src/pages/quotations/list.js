import DashboardLayout from '../../layouts/dashboard';
import QuotationTable from "../../components/tables/quotation/QuotationList";
import RoleBasedGuard from "../../auth/RoleBasedGuard";

// components
list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list () {
    return (
        <QuotationTable />
    )
}
