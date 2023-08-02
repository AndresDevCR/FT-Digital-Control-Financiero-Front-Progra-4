import ClientForm from '../../../components/forms/admin/client/ClientForm';
import DashboardLayout from '../../../layouts/dashboard';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';

add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function add() {
    return (
        <ClientForm />
    );
}
