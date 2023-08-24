/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
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
  const [quotation, setQuotation] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id) {
      fetchQuotation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchQuotation = async () => {
    try {
      const response = await axios.get(
        `https://control-financiero.herokuapp.com/api/v1/quotation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        }
      );
      setQuotation(response.data);
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
        `https://control-financiero.herokuapp.com/api/v1/v1/pdf/download/quotation/${id}`,
        {
          responseType: 'blob', // Set the response type to blob to handle binary data
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar('Cotización descargada correctamente', { variant: 'success' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `quotation_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      enqueueSnackbar('Error al descargar la cotización', { variant: 'error' });
    }
  };

  if (!quotation) {
    return null;
  }
  

  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <Head>
        <title>Detalles de la cotización | FT Control Financiero</title>
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

        <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
          Detalles de la cotización
        </Typography>

        <Card sx={{ marginTop: '2rem' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Total a pagar: {quotation.total_payment}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Total a pagar en dólares: {quotation.total_payment_dollar}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Código de cotización: {quotation.e_invoice_code}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Código de orden: {quotation.po_number}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Título : {quotation.quote_title}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Descripción: {quotation.description}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Fecha de emisión: {formatDate(quotation.issue_date)}
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
    </RoleBasedGuard>
  );
}

export default Details;
