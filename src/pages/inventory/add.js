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
  const { themeStretch, accessToken } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required('El nombre del producto/servicio es obligatorio')
      .max(30, 'El nombre debe tener máximo 30 caracteres'),
    availableQuantity: Yup.number()
      .required('La cantidad disponible es obligatoria')
      .max(9999999999, 'La cantidad debe tener máximo 10 dígitos')
      .typeError('La cantidad debe ser un número'),
    description: Yup.string()
      .required('La descripción es obligatoria')
      .max(250, 'La descripción debe tener máximo 250 caracteres'),
    entryDate: Yup.date().required('La fecha de ingreso es obligatoria'),
  });

  const formik = useFormik({
    initialValues: {
      productName: '',
      availableQuantity: 0,
      description: '',
      entryDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://control-financiero.herokuapp.com/api/v1/inventory', values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        toast.success('Inventario agregado con éxito');
      } catch (error) {
        toast.error('Error al agregar el inventario');
        console.log(error);
      }

      formik.resetForm();
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'productName') {
      if (value.length > 30) {
        event.target.value = value.slice(0, 30);
        toast.warning('Se ha alcanzado el límite máximo de caracteres para el nombre del producto/servicio');
      }
    }

    if (name === 'availableQuantity') {
      if (value.length > 10) {
        event.target.value = value.slice(0, 10);
        toast.warning('Se ha alcanzado el límite máximo de caracteres para la cantidad disponible');
      } else {
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
          event.target.value = '';
        } else {
          event.target.value = numberValue.toString();
        }
      }
    }

    if (name === 'description') {
      if (value.length > 250) {
        event.target.value = value.slice(0, 250);
        toast.warning('Se ha alcanzado el límite máximo de caracteres para la descripción');
      }
    }

    formik.handleChange(event);
  };

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

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del producto/servicio"
                name="productName"
                value={formik.values.productName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                value={formik.values.entryDate}
                onChange={handleInputChange}
                error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
                helperText={formik.touched.entryDate && formik.errors.entryDate}
              />
            </Grid>

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
