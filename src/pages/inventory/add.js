/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

import DashboardLayout from '../../layouts/dashboard';
import { AuthContext } from '../../auth/JwtContext';

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Invoice() {
  const { themeStretch, accessToken } = useContext(AuthContext); // Obtiene el accessToken del AuthContext

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('El nombre del producto/servicio es obligatorio'),
    availableQuantity: Yup.number().required('La cantidad disponible es obligatoria'),
    description: Yup.string().required('La descripción es obligatoria'),
    entryDate: Yup.date().required('La fecha de ingreso es obligatoria'),
  });

  const formik = useFormik({
    initialValues: {
      productName: '',
      availableQuantity: '',
      description: '',
      entryDate: '',
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post('https://control-financiero.herokuapp.com/api/v1/inventory', values, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
          },
        })
        .then((response) => {
          console.log(response);
          toast.success('Inventario agregado con éxito');
        })
        .catch((error) => {
          toast.error('Error al agregar el inventario');
          console.log(error);
        });

      formik.resetForm();
    },
  });

  return (
    <>
      <Head>
        <title>Agregar Inventario | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Inventario
        </Typography>
      </Container>

      <ToastContainer />

      {/* formulario de agregar Inventario */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del producto/servicio"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cantidad disponible"
                name="availableQuantity"
                type="number"
                value={formik.values.availableQuantity}
                onChange={formik.handleChange}
                error={formik.touched.availableQuantity && Boolean(formik.errors.availableQuantity)}
                helperText={formik.touched.availableQuantity && formik.errors.availableQuantity}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                multiline
                minRows={5}
                maxRows={10}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <div>
                <label style={{ fontWeight: 'bold' }}>Fecha de ingreso</label>
              </div>
              <TextField
                fullWidth
                name="entryDate"
                type="date"
                onChange={formik.handleChange}
                error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
                helperText={formik.touched.entryDate && formik.errors.entryDate}
              />
            </Grid>

            {/* boton del formulario */}
            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
