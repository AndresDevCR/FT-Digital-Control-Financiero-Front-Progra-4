import SupplierForm from "../../../components/tables/admin/supplier/SupplierList";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <SupplierForm/>
  );
}
