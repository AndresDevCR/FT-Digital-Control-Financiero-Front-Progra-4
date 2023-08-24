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
  const [quotationRows, setQuotationRows] = useState([]);
  const [invoiceRows, setInvoiceRows] = useState([]);
  const { accessToken } = useContext(AuthContext);

  const [paymentDataByMonth, setPaymentDataByMonth] = useState([]);
  const [invoiceDataByMonth, setInvoiceDataByMonth] = useState([]);
  const [quotationDataByMonth, setQuotationDataByMonth] = useState([]);

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

  useEffect(() => {
    fetchQuotations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quotationRows.length > 0) {
      processQuotationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationRows]);

  useEffect(() => {
    console.log('quotationDataByMonth updated:', quotationDataByMonth);
  }, [quotationDataByMonth]);

  // quotation data
  const fetchQuotations = async () => {
    try {
      const response = await axios.get(
        'https://control-financiero.herokuapp.com/api/v1/quotation',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuotationRows(response.data);
      processQuotationData();
    } catch (error) {
      console.log(error);
    }
  };

  const processQuotationData = () => {
    const dataByMonth = {};

    quotationRows.forEach((quotationItem) => {
      const month = new Date(quotationItem.created_at).getMonth();
      if (!dataByMonth[month]) {
        dataByMonth[month] = 0;
      }
      dataByMonth[month] += quotationItem.total_payment;
    });

    const dataForChart = Object.keys(dataByMonth).map((month) => ({
      month: Number(month) + 1,
      value: dataByMonth[month],
    }));

    setQuotationDataByMonth(dataForChart);
    console.log(quotationDataByMonth);
  };

  // invoice data
  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (invoiceRows.length > 0) {
      processInvoiceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceRows]);

  useEffect(() => {
    console.log('invoiceDataByMonth updated:', invoiceDataByMonth);
  }, [invoiceDataByMonth]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/invoice', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setInvoiceRows(response.data);
      processInvoiceData();
    } catch (error) {
      console.log(error);
    }
  };

  const processInvoiceData = () => {
    const dataByMonth = {};

    invoiceRows.forEach((invoiceItem) => {
      const month = new Date(invoiceItem.created_at).getMonth();
      if (!dataByMonth[month]) {
        dataByMonth[month] = 0;
      }
      dataByMonth[month] += invoiceItem.total_colon;
    });

    const dataForChart = Object.keys(dataByMonth).map((month) => ({
      month: Number(month) + 1,
      value: dataByMonth[month],
    }));

    setInvoiceDataByMonth(dataForChart);
    console.log(invoiceDataByMonth);
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
            <Typography variant="h6" gutterBottom>
              Gráfico total de pagos mensuales
            </Typography>
            {paymentDataByMonth && paymentDataByMonth.length > 0 ? (
              <PieChart data={paymentDataByMonth} />
            ) : (
              <Typography>Cargando datos...</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
              Gráfico total de cotizaciones mensuales
            </Typography>
            {quotationDataByMonth && quotationDataByMonth.length > 0 ? (
              <PieChart data={quotationDataByMonth} />
            ) : (
              <Typography>Cargando datos...</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
              Gráfico total de facturas mensuales
            </Typography>
            {invoiceDataByMonth && invoiceDataByMonth.length > 0 ? (
              <PieChart data={invoiceDataByMonth} />
            ) : (
              <Typography>Cargando datos...</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
