import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

export default function Invoice() {
  const { themeStretch } = useSettingsContext();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    employee_name: Yup.string().required('Nombre es requerido'),
    available_quantity: Yup.number().required('Cantidad disponible es requerida'),
    start_date: Yup.date().required('Fecha de inicio es requerida'),
    reentry_date: Yup.date().required('Fecha de reingreso es requerida')
  });

  const formik = useFormik({
    initialValues: {
      employee_name: '',
      available_quantity: '',
      start_date: '',
      reentry_date: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
          'https://control-financiero.herokuapp.com/api/v1/vacation',
          values,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
            },
          }
        );
        toast.success('Vacaciones agregadas correctamente');
        formik.resetForm();
      } catch (error) {
        toast.error('Error al agregar las vacaciones');
      }
      setLoading(false);
    },
  });

  return (
    <>
      <Head>
        <title>Solicitar vacaciones | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Solicitar vacaciones
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de solicitar vacaciones */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="employee_name"
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                value={formik.values.employee_name}
                onChange={formik.handleChange}
                error={formik.touched.employee_name && Boolean(formik.errors.employee_name)}
                helperText={formik.touched.employee_name && formik.errors.employee_name}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="available_quantity"
                label="Cantidad Disponible"
                InputLabelProps={{ shrink: true }}
                value={formik.values.available_quantity}
                onChange={formik.handleChange}
                error={formik.touched.available_quantity && Boolean(formik.errors.available_quantity)}
                helperText={formik.touched.available_quantity && formik.errors.available_quantity}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de inicio"
                name="start_date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.start_date}
                onChange={formik.handleChange}
                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                helperText={formik.touched.start_date && formik.errors.start_date}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de reintegro"
                name="reentry_date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.reentry_date}
                onChange={formik.handleChange}
                error={formik.touched.reentry_date && Boolean(formik.errors.reentry_date)}
                helperText={formik.touched.reentry_date && formik.errors.reentry_date}
              />
            </Grid>

            {/* Botón del formulario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
