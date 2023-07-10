import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DashboardLayout from '../../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../../components/settings';
import { AuthContext } from '../../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nombre de la compañía es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  description: Yup.string()
    .required('Descripción de la compañía es requerida')
    .max(200, 'La descripción debe tener como máximo 200 caracteres'),
  category: Yup.string()
    .required('Categoría de la compañía es requerida')
    .max(30, 'La categoría debe tener como máximo 30 caracteres'),
  primary_phone_number: Yup.string()
    .required('Número de teléfono es requerido')
    .max(30, 'El número de teléfono debe tener como máximo 30 caracteres'),
  secondary_phone_number: Yup.string()
    .required('Número de teléfono es requerido')
    .max(30, 'El número de teléfono debe tener como máximo 30 caracteres'),
  city: Yup.string()
    .required('Ciudad es requerida')
    .max(30, 'La ciudad debe tener como máximo 30 caracteres'),
  state: Yup.string()
    .required('Estado es requerido')
    .max(30, 'El estado debe tener como máximo 30 caracteres'),
  country: Yup.string()
    .required('País es requerido')
    .max(30, 'El país debe tener como máximo 30 caracteres'),
  is_active: Yup.boolean().required('Estado es requerido').default(true),
});

const EditCompany = () => {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = (values) => {
    axios
      .patch(`https://control-financiero.herokuapp.com/api/v1/company/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log(response);
        toast.success('Compañía actualizada con éxito');
        router.push('/dashboard/company/list');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar la compañía');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    formik.setFieldValue(name, value);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      display_name: '',
      description: '',
      is_active: true,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (id) {
      // Fetch company data from the API using the provided ID
      axios
        .get(`https://control-financiero.herokuapp.com/api/v1/company/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const company = response.data;
          formik.setValues({
            name: company.name,
            description: company.description,
            category: company.category,
            primary_phone_number: company.primary_phone_number,
            secondary_phone_number: company.secondary_phone_number,
            city: company.city,
            state: company.state,
            country: company.country,
            is_active: company.is_active,
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
        <title>Editar compañía | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar compañía
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de editar compañía */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Nombre de la compañía"
                name="name"
                value={formik.values.name}
                onChange={handleInputChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Descripción de la Compañía"
                name="description"
                value={formik.values.description}
                onChange={handleInputChange}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                inputProps={{
                  maxLength: 200,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Categoría"
                name="category"
                value={formik.values.category}
                onChange={handleInputChange}
                error={formik.touched.category && formik.errors.category}
                helperText={formik.touched.category && formik.errors.category}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Primer número de teléfono"
                name="primary_phone_number"
                value={formik.values.primary_phone_number}
                onChange={handleInputChange}
                error={formik.touched.primary_phone_number && formik.errors.primary_phone_number}
                helperText={formik.touched.primary_phone_number && formik.errors.primary_phone_number}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Segundo número de teléfono"
                name="secondary_phone_number"
                value={formik.values.secondary_phone_number}
                onChange={handleInputChange}
                error={formik.touched.secondary_phone_number && formik.errors.secondary_phone_number}
                helperText={formik.touched.secondary_phone_number && formik.errors.secondary_phone_number}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Ciudad"
                name="city"
                value={formik.values.city}
                onChange={handleInputChange}
                error={formik.touched.city && formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Estado"
                name="state"
                value={formik.values.state}
                onChange={handleInputChange}
                error={formik.touched.state && formik.errors.state}
                helperText={formik.touched.state && formik.errors.state}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="País"
                name="country"
                value={formik.values.country}
                onChange={handleInputChange}
                error={formik.touched.country && formik.errors.country}
                helperText={formik.touched.country && formik.errors.country}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.is_active}
                    onChange={handleInputChange}
                    name="is_active"
                    color="primary"
                  />
                }
                label="Activo"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de aplicaciones */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push("/dashboard/company/list")}
              >
                Volver a la lista de aplicaciones
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

EditCompany.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditCompany;
