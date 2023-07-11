import EmployeeForm from "../../../components/forms/admin/employee/EmployeeForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <EmployeeForm/>
  );
}
