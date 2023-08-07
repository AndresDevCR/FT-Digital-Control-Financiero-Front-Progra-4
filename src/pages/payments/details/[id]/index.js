/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DashboardLayout from '../../../../layouts/dashboard';
import { AuthContext } from '../../../../auth/JwtContext';
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function Details() {
  const { accessToken } = useContext(AuthContext); // Obtiene el accessToken del AuthContext
  const router = useRouter();
  const { id } = router.query;
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `https://control-financiero.herokuapp.com/api/v1/payments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        }
      );
      setPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://control-financiero.herokuapp.com/api/v1/v1/pdf/download/payments/${id}`,
        {
          responseType: 'blob', // Set the response type to blob to handle binary data
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payments_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  if (!payment) {
    return null; // Render loading state or handle error
  }

  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <Head>
        <title>Detalles de la pago | FT Control Financiero</title>
      </Head>

      <Container maxWidth="xl">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: '15rem',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,.2)',
          }}
          xs={{
            height: '1rem',
            '@media (min-width: 600px)': {
              height: '1rem',
            },
          }}
        >
          <img
            src="https://i.imgur.com/kMkFPom.png"
            alt="Foto de portada"
            style={{
              width: '100%',
              height: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              borderRadius: '10px',
            }}
          />
        </Box>

        
        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Salario 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Salario quincenal: {payment.biweekly_salary}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Salario diario: {payment.daily_salary}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Subsidio: {payment.subsidy}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Tarifa horaria: {payment.hour_rate}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Horas extra 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Horas extra: {payment.extra_time}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Valor de la hora extra: {payment.extra_time_value}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Total de horas extra: {payment.extra_time_total}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Permisos 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Licencias médicas: {payment.medical_leave_days}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Licencias sin goce de salario: {payment.not_payed_leave_days}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Pago bruto 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Pago bruto: {payment.gross_payment}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Pago bruto en dólares: {payment.gross_payment_dollar}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Tipo de cambio del dólar: {payment.dollar}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Deducciones 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Deducciones del seguro social: {payment.gross_payment_social_deduction}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Adelanto de pago: {payment.payment_advance}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Total de deducciones: {payment.deduction_total}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5" paragraph sx={{ ml: 3 , mt:1}}>
          Pago neto 
        </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Pago neto: {payment.net_payment}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Pago neto en dólares: {payment.net_payment_dollar}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Tipo de cambio: {payment.dollar}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>



        <Box sx={{ mt: 3 }}>
          <Button color="primary" variant="contained" onClick={() => router.back()}>
            Volver
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDownloadPDF}
            startIcon={<PictureAsPdfIcon />}
            sx={{ ml: 2 }}
          >
            Descargar PDF
          </Button>
        </Box>
      </Container>
    </RoleBasedGuard >
  );
}

export default Details;
