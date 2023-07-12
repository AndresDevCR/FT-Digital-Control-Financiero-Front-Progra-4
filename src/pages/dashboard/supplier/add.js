import SupplierForm from "../../../components/forms/admin/supplier/SupplierForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <SupplierForm/>
  );
}
