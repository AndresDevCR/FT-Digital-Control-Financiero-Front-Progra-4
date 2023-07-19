import CompanyForm from "../../../components/forms/admin/company/CompanyForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <CompanyForm/>
  );
}
