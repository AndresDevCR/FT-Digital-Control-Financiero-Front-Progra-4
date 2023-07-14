import QuotationForm from "../../components/forms/quotation/QuotationForm";
import DashboardLayout from '../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <QuotationForm />
  );
}