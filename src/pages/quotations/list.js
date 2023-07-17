import DashboardLayout from '../../layouts/dashboard';
import QuotationTable from "../../components/tables/quotation/QuotationTable";
// components
list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list () {
    return (
        <QuotationTable />
    )
}
