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
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      setInvoice(response.data);
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
      const response = await axios.get(`https://control-financiero.herokuapp.com/api/v1/v1/pdf/download/invoice/${id}`, {
        responseType: 'blob', // Set the response type to blob to handle binary data
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  if (!invoice) {
    return null; // Render loading state or handle error
  }

  return (
    <>
      <Head>
        <title>Detalles de la Factura | FT Control Financiero</title>
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
            style={{ width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0, zIndex: -1, borderRadius: '10px' }}
          />
        </Box>

        <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
          Detalles de la Factura
        </Typography>

        <Card sx={{ marginTop: '2rem' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Fecha de emisión: {invoice.issue_date.split('T')[0]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Fecha de expiración: {invoice.expiration_date.split('T')[0]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Código de factura: {invoice.invoice_number}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Monto en dólares: {invoice.total_dollar}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Monto en colones: {invoice.total_colon}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Tipo de cambio: {invoice.dollar_value}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.back()}
          >
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
    </>
  );
}

export default Details;
