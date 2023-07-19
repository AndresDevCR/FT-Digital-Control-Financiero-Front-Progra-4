import QuotationForm from "../../components/forms/quotations/QuotationForm";
import DashboardLayout from '../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <QuotationForm />
  );
}