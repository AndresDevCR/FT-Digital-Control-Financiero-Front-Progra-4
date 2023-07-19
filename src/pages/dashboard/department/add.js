import DepartamentForm from "../../../components/forms/admin/department/DepartamentForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <DepartamentForm/>
  );
}
