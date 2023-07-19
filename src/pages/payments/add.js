import PaymentForm from "../../components/forms/payments/PaymentForm";
import DashboardLayout from '../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <PaymentForm />
  );
}