import EnterpriseForm from "../../../components/forms/admin/enterprise/EnterpriseForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <EnterpriseForm/>
  );
}
