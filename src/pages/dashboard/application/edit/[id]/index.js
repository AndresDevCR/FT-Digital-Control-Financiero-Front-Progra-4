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
      .required('Nombre del producto/servicio es requerido')
      .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    display_name: Yup.string()
      .required('Cantidad disponible es requerida')
      .max(30, 'El nombre de visualización debe tener como máximo 30 caracteres'),
    description: Yup.string()
      .max(200, 'La descripción debe tener como máximo 200 caracteres'),
    is_active: Yup.boolean().default(true),
  });

const EditApplication = () => {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = (values) => {
    axios
      .patch(`https://control-financiero.herokuapp.com/api/v1/application/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log(response);
        toast.success('aplicación actualizado con éxito');
        router.push('/dashboard/application/list');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar la aplicación');
      });
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'name' && event.target.value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (event.target.name === 'display_name' && event.target.value.length >= 30) {
        toast.info('Se ha alcanzado el límite de caracteres permitidos');
      }

    if (event.target.name === 'description' && event.target.value.length >= 200) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos para la descripción');
    }

    formik.handleChange(event);
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
      // Fetch application data from the API using the provided ID
      axios
        .get(`https://control-financiero.herokuapp.com/api/v1/application/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const application = response.data;
          formik.setValues({
            name: application.name,
            display_name: application.display_name,
            description: application.description,
            is_active: application.is_active
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
        <title>Editar aplicación | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar aplicación
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de editar aplicación */}
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
                label="Nombre de la aplicación"
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
                label="Nombre de visualización"
                name="display_name"
                value={formik.values.display_name}
                onChange={handleInputChange}
                error={formik.touched.display_name && formik.errors.display_name}
                helperText={formik.touched.display_name && formik.errors.display_name}
                inputProps={{
                  maxLength: 30,
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
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                inputProps={{
                  maxLength: 200,
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
                onClick={() => router.push("/dashboard/application/list")}
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

EditApplication.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditApplication;
