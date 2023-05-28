import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import { AuthContext } from '../../../../auth/JwtContext';

const EditInvoice = () => {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    clientName: '',
    address: '',
    phone: '',
    email: '',
    issueDate: '',
    expirationDate: '',
    invoiceNumber: 0,
    orderNumber: 0,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const invoice = response.data;
          formik.setValues({
            clientName: invoice.client_name,
            address: invoice.address,
            phone: invoice.phone,
            email: invoice.email,
            issueDate: invoice.issue_date,
            expirationDate: invoice.expiration_date,
            invoiceNumber: invoice.invoice_number,
            orderNumber: invoice.order_number,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error al cargar la factura');
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, accessToken]);

  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required('El nombre del cliente es requerido'),
    address: Yup.string().required('La dirección es requerida'),
    phone: Yup.string().required('El teléfono es requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    issueDate: Yup.string().required('La fecha de emisión es requerida'),
    expirationDate: Yup.string().required('La fecha de vencimiento es requerida'),
    invoiceNumber: Yup.number().required('El número de factura es requerido'),
    orderNumber: Yup.number().required('El número de orden es requerido'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    axios
      .patch(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success('Factura actualizada con éxito');
        router.push('/invoice');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar la factura');
      });
  };

  return (
    <>
      <Head>
        <title>Editar Factura | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar Factura
        </Typography>
      </Container>

      <ToastContainer />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del cliente"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                helperText={formik.touched.clientName && formik.errors.clientName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de emisión"
                name="issueDate"
                type="date"
                value={formik.values.issueDate}
                onChange={formik.handleChange}
                error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
                helperText={formik.touched.issueDate && formik.errors.issueDate}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de vencimiento"
                name="expirationDate"
                type="date"
                value={formik.values.expirationDate}
                onChange={formik.handleChange}
                error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
                helperText={formik.touched.expirationDate && formik.errors.expirationDate}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de factura"
                name="invoiceNumber"
                type="number"
                value={formik.values.invoiceNumber}
                onChange={formik.handleChange}
                error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de orden"
                name="orderNumber"
                type="number"
                value={formik.values.orderNumber}
                onChange={formik.handleChange}
                error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
                helperText={formik.touched.orderNumber && formik.errors.orderNumber}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
                Guardar cambios
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

EditInvoice.layout = DashboardLayout;

export default EditInvoice;
