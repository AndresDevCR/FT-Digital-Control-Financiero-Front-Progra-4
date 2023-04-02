// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import PieChart from '../../components/pie-chart/PieChart';

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const fakeData = [50, 60, 70, 80, 90, 100, 110];

  return (
    <>
      <Head>
        <title> Control Financiero | Dashboard</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Control Financiero
        </Typography>

        <PieChart data={fakeData} />

      </Container>
    </>
  );
}
