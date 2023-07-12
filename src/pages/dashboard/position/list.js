import PositionForm from "../../../components/tables/admin/position/PositionList";
import DashboardLayout from '../../../layouts/dashboard';


add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <PositionForm/>
  );
}
