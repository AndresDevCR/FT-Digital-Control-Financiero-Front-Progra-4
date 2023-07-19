import EnterpriseForm from "../../../components/tables/admin/enterprise/EnterpriseList";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <EnterpriseForm/>
  );
}
