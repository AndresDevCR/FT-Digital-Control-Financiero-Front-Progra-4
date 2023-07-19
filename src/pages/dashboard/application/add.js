import ApplicationForm from "../../../components/forms/admin/application/ApplicationForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <ApplicationForm/>
  );
}
