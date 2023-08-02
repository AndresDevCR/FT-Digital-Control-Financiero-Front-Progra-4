// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DashboardLayout from '../../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../../components/settings';
import { AuthContext } from '../../../../../auth/JwtContext';
import RoleBasedGuard from '../../../../../auth/RoleBasedGuard';

const validationSchema = Yup.object().shape({
  supplier_name: Yup.string().required('El nombre es obligatorio'),
});

const EditSupplier = () => {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = (values) => {
    axios
      .patch(`https://control-financiero.herokuapp.com/api/v1/supplier/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success('Proveedor actualizado con éxito');
        router.push('/dashboard/supplier/list');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar el proveedor');
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
      supplier_name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (id) {
      // Fetch supplier data from the API using the provided ID
      axios
        .get(`https://control-financiero.herokuapp.com/api/v1/supplier/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const supplier = response.data;
          formik.setValues({
            supplier_name: supplier.supplier_name,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error al cargar el proveedor');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id, formik.setValues]);

  return (
    <RoleBasedGuard roles={['administrator', 'admin']} hasContent>
      <Head>
        <title>Editar Proveedor | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar Proveedor
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de editar Empresa */}
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
                label="Nombre del Proveedor"
                name="supplier_name"
                value={formik.values.supplier_name}
                onChange={handleInputChange}
                error={formik.touched.supplier_name && formik.errors.supplier_name}
                helperText={formik.touched.supplier_name && formik.errors.supplier_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            {/* Botón del formulario */}
            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de Proveedores */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/dashboard/supplier/list')}
              >
                Volver a la lista de Proveedores
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RoleBasedGuard>
  );
};

EditSupplier.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditSupplier;
