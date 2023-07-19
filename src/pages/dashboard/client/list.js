import ClientList from '../../../components/tables/admin/client/ClientList';
import DashboardLayout from '../../../layouts/dashboard';


list.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function list() {
    return (
        <ClientList />
    );
}
