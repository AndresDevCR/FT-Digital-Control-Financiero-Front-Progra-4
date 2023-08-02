import InvoiceForm from "../../components/forms/invoice/InvoiceForm";
import DashboardLayout from '../../layouts/dashboard';
import RoleBasedGuard from "../../auth/RoleBasedGuard";

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <InvoiceForm />
  );
}