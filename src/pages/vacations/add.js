import VacationForm from "../../components/forms/vacations/VacationForm";
import DashboardLayout from '../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <VacationForm />
  );
}