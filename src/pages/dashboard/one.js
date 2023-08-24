// next
import Head from 'next/head';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
// layouts
import Router, { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { CardComponent } from '../../components/card/cardComponent';
import RoleBasedGuard from '../../auth/RoleBasedGuard';
import PieChart from '../../components/charts/pie-chart/PieChart';
import { AuthContext } from '../../auth/JwtContext';


// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const { accessToken } = useContext(AuthContext);

  const [paymentDataByMonth, setPaymentDataByMonth] = useState([]);

  useEffect(() => {
    fetchPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      processPaymentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  useEffect(() => {
    console.log('paymentDataByMonth updated:', paymentDataByMonth);
  }, [paymentDataByMonth]);

  const fetchPayment = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/payments', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRows(response.data);
      processPaymentData();
    } catch (error) {
      console.log(error);
    }
  };

  const processPaymentData = () => {
    const dataByMonth = {};

    rows.forEach((paymentItem) => {
      const month = new Date(paymentItem.created_at).getMonth();
      if (!dataByMonth[month]) {
        dataByMonth[month] = 0;
      }
      dataByMonth[month] += paymentItem.total_salary;
    });

    const dataForChart = Object.keys(dataByMonth).map((month) => ({
      month: Number(month) + 1, // +1 porque los meses son 0-indexed
      value: dataByMonth[month],
    }));

    setPaymentDataByMonth(dataForChart);
    console.log(paymentDataByMonth);
  };

  return (
    <>
      <Head>
        <title>Control Financiero | Dashboard</title>
      </Head>

      <Container
        sx={{
          py: 10,
          maxWidth: 'container.xl',
          margin: 'auto',
          textAlign: 'center',
        }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Typography variant="h3" paragraph>
          Gráficos
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Bienvenido al tablero de gráficos de Control Financiero
        </Typography>

        <Grid
          container
          spacing={5}
          sx={{ mt: 5, mb: 10 }}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          margin="auto"
        >
          <Grid item xs={12} sm={6} md={4}>
            {paymentDataByMonth && paymentDataByMonth.length > 0 ? (
              <PieChart data={paymentDataByMonth} />
            ) : (
              <Typography>Cargando datos...</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
