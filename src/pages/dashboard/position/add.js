import PositionForm from "../../../components/forms/admin/position/PositionForm";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <PositionForm/>
  );
}
