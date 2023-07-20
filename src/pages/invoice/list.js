import InvoiceList from "../../components/tables/invoice/InvoiceList";
import DashboardLayout from '../../layouts/dashboard';
// components



list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function list () {
    
    
    return (
        <InvoiceList/>
    )
}
