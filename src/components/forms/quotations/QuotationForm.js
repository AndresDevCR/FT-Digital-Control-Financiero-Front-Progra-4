import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  client_id: Yup.number()
    .required('Id de cliente es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  total_payment: Yup.number()
    .required('Total de pago es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  total_payment_dollar: Yup.number()
    .required('Total de pago en dolares es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  e_invoice_code: Yup.string()
    .required('Codigo de factura es requerido')
    .min(1, 'El campo debe tener como mínimo 1 caracter'),
  issue_date: Yup.date().required('Fecha de emisión es requerido'),
  po_number: Yup.number()
    .required('Numero de orden de compra es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  po_date: Yup.date().required('Fecha de orden de compra es requerido'),
  description: Yup.string()
    .required('Descripción es requerido')
    .max(200, 'El campo debe tener como máximo 200 caracteres'),
  quote_title: Yup.string()
    .required('Titulo de cotización es requerido')
    .max(30, 'El campo debe tener como máximo 30 caracteres'),
});

export default function QuotationForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/client', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, [accessToken]);

  const handleSubmit = async (values) => {
    try {
      const response= await axios.post('https://control-financiero.herokuapp.com/api/v1/quotation', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      if (response.status === 201) {
        enqueueSnackbar('Cotización agregada correctamente', { variant: 'success' });
        router.push('/quotations/list');
      }
    } catch (error) {
      enqueueSnackbar('Error al agregar la cotización', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues: {
      client_id: 1,
      total_payment: '',
      total_payment_dollar: '',
      e_invoice_code: '',
      issue_date: new Date().toISOString().split('T')[0],
      po_number: '',
      po_date: new Date().toISOString().split('T')[0],
      description: '',
      quote_title: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'client_id' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en el campo de Id de cliente');
    }

    if (event.target.name === 'availableQuantity' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en el campo de Cantidad disponible');
    }

    if (event.target.name === 'availableQuantity' && event.target.value.length >= 7) {
      event.target.value = event.target.value.slice(0, 6); // Limitar a 6 dígitos
      toast.info('Se ha alcanzado el límite de números permitidos ');
    }

    if (event.target.name === 'description' && event.target.value.length >= 200) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos para la descripción');
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Cotización
        </Typography>
      </Container>

      <ToastContainer />

      <Container>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="client-label" style={{ marginTop: '10px' }}>
                Cliente
              </InputLabel>
              <Select
                labelId="client-label"
                id="client_id"
                type="number"
                name="client_id"
                value={formik.values.client_id}
                onChange={formik.handleChange}
                error={formik.touched.client_id && formik.errors.client_id}
                fullWidth
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {`${client.client_name} (${client.email})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <br />

          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Total a pagar"
                name="total_payment"
                type="number"
                value={formik.values.total_payment}
                onChange={handleInputChange}
                error={formik.touched.total_payment && formik.errors.total_payment}
                helperText={formik.touched.total_payment && formik.errors.total_payment}
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Total a pagar en dolares"
                name="total_payment_dollar"
                type="number"
                value={formik.values.total_payment_dollar}
                onChange={handleInputChange}
                error={formik.touched.total_payment_dollar && formik.errors.total_payment_dollar}
                helperText={
                  formik.touched.total_payment_dollar && formik.errors.total_payment_dollar
                }
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container alignItems="center">
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="https://www.sucursalelectronica.com/redir/showLogin.go"
                target="_blank"
              >
                <CurrencyExchangeIcon />
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Código de factura electronica"
                name="e_invoice_code"
                type="text"
                value={formik.values.e_invoice_code}
                onChange={handleInputChange}
                error={formik.touched.e_invoice_code && formik.errors.e_invoice_code}
                helperText={formik.touched.e_invoice_code && formik.errors.e_invoice_code}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de emision"
                name="issue_date"
                type="date"
                value={formik.values.issue_date}
                onChange={handleInputChange}
                error={formik.touched.issue_date && formik.errors.issue_date}
                helperText={formik.touched.issue_date && formik.errors.issue_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Numero de orden de compra"
                name="po_number"
                type="number"
                value={formik.values.po_number}
                onChange={handleInputChange}
                error={formik.touched.po_number && formik.errors.po_number}
                helperText={formik.touched.po_number && formik.errors.po_number}
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de orden de compra"
                name="po_date"
                type="date"
                value={formik.values.po_date}
                onChange={handleInputChange}
                error={formik.touched.po_date && formik.errors.po_date}
                helperText={formik.touched.po_date && formik.errors.po_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Descripcion"
                name="description"
                type="text"
                value={formik.values.description}
                onChange={handleInputChange}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                inputProps={{
                  maxLength: 200,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Titulo de cotizacion"
                name="quote_title"
                type="text"
                value={formik.values.quote_title}
                onChange={handleInputChange}
                error={formik.touched.quote_title && formik.errors.quote_title}
                helperText={formik.touched.quote_title && formik.errors.quote_title}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/quotations/list')}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de cotizaciones
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
