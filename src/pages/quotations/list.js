import QuotationList from "../../components/tables/quotation/QuotationTable";
import DashboardLayout from '../../layouts/dashboard';
// components
list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list () {
    return (
        <QuotationList/>
    )
}
