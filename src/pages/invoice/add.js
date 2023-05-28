import { useState, useContext } from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../auth/JwtContext';

import DashboardLayout from '../../layouts/dashboard';

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  client_name: Yup.string().required('Nombre del cliente es requerido'),
  address: Yup.string().required('Dirección es requerida'),
  phone: Yup.string().required('Teléfono es requerido'),
  email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  issue_date: Yup.date().required('Fecha de emisión es requerida'),
  expiration_date: Yup.date().required('Fecha de vencimiento es requerida'),
  invoice_number: Yup.number().required('Número de factura es requerido'),
  order_number: Yup.number().required('Número de orden es requerido'),
});

export default function Invoice() {
  const { accessToken } = useContext(AuthContext); // Obtiene el accessToken del AuthContext
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      client_name: '',
      address: '',
      phone: '',
      email: '',
      issue_date: '',
      expiration_date: '',
      invoice_number: '',
      order_number: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post('https://control-financiero.herokuapp.com/api/v1/invoice', values,{
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        });
        toast.success('Factura agregada correctamente');
        formik.resetForm();
      } catch (error) {
        toast.error('Error al agregar la factura');
      }
      setLoading(false);
    },
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <>
      <Head>
        <title>Agregar Factura | FT Control Financiero</title>
      </Head>

      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          Agregar Factura
        </Typography>
      </Container>

      <ToastContainer />

      <Container maxWidth="xl">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del cliente"
                name="client_name"
                value={values.client_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.client_name && !!errors.client_name}
                helperText={touched.client_name && errors.client_name}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de emisión"
                name="issue_date"
                type="date"
                value={values.issue_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de vencimiento"
                name="expiration_date"
                type="date"
                value={values.expiration_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.expiration_date && !!errors.expiration_date}
                helperText={touched.expiration_date && errors.expiration_date}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de factura"
                name="invoice_number"
                type="number"
                value={values.invoice_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.invoice_number && !!errors.invoice_number}
                helperText={touched.invoice_number && errors.invoice_number}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de orden"
                name="order_number"
                type="number"
                value={values.order_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.order_number && !!errors.order_number}
                helperText={touched.order_number && errors.order_number}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
