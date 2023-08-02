import VacationForm from '../../components/forms/vacations/VacationForm';
import DashboardLayout from '../../layouts/dashboard';
import RoleBasedGuard from '../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function add() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <VacationForm />
    </RoleBasedGuard>
  );
}
