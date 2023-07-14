/* eslint-disable no-unused-vars */
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

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .required('Nombre del producto/servicio es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  availableQuantity: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  description: Yup.string()
    .required('Descripción es requerida')
    .max(200, 'La descripción debe tener como máximo 200 caracteres'),
  entryDate: Yup.date().required('Fecha de ingreso es requerida'),
});

const EditInventory = () => {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = (values) => {
    axios
      .patch(`https://control-financiero.herokuapp.com/api/v1/inventory/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log(response);
        toast.success('Inventario actualizado con éxito');
        router.push('/inventory');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar el inventario');
      });
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'productName' && event.target.value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (event.target.name === 'availableQuantity' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en el campo de Cantidad disponible');
    }

    if (event.target.name === 'availableQuantity' && event.target.value.length >= 7) {
      event.target.value = event.target.value.slice(0, 6); // Limitar a 6 dígitos
      toast.info('Se ha alcanzado el límite de numeros permitidos ');
    }

    if (event.target.name === 'description' && event.target.value.length >= 200) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos para la descripción');
    }
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      availableQuantity: 0,
      description: '',
      entryDate: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (id) {
      // Fetch inventory data from the API using the provided ID
      axios
        .get(`https://control-financiero.herokuapp.com/api/v1/inventory/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const inventory = response.data;
          formik.setValues({
            productName: inventory.productName,
            availableQuantity: inventory.availableQuantity,
            description: inventory.description,
            entryDate: inventory.entryDate
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error al cargar el inventario');
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id, formik.setValues]);

  return (
    <>
      <Head>
        <title>Editar Inventario | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar Inventario
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de editar Inventario */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
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
                inputProps={{
                  maxLength: 30,
                }}
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
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
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
                inputProps={{
                  maxLength: 200,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de ingreso"
                name="entryDate"
                type="date"
                value={formik.values.entryDate}
                onChange={handleInputChange}
                error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
                helperText={formik.touched.entryDate && formik.errors.entryDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Botón del formulario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
              >
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de inventario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/inventory')}
              >
                Volver a la lista de inventario
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </>
  );
};

EditInventory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditInventory;
