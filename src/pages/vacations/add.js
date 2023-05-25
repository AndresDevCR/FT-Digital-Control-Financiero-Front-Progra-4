import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  vacationsStartDate: Yup.date().required('Fecha de inicio es requerida'),
  vacationsEndDate: Yup.date().required('Fecha de reintegro es requerida'),
});

export default function Invoice() {
  const { themeStretch } = useSettingsContext();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      vacationsName: '',
      vacationsQty: '',
      vacationsStartDate: '',
      vacationsEndDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Aquí realizarías la solicitud POST a tu API utilizando axios
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('', values);
        toast.success('Solicitud enviada');
        formik.resetForm();
      } catch (error) {
        toast.error('Error al enviar la solicitud');
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

      {/* formulario de solicitar vacaciones */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="vacationsName"
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                value={formik.values.vacationsName}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="vacationsQty"
                label="Cantidad Disponible"
                InputLabelProps={{ shrink: true }}
                value={formik.values.vacationsQty}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de inicio"
                name="vacationsStartDate"
                InputLabelProps={{ shrink: true }}
                value={formik.values.vacationsStartDate}
                onChange={formik.handleChange}
                error={formik.touched.vacationsStartDate && Boolean(formik.errors.vacationsStartDate)}
                helperText={formik.touched.vacationsStartDate && formik.errors.vacationsStartDate}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de reintegro"
                name="vacationsEndDate"
                InputLabelProps={{ shrink: true }}
                value={formik.values.vacationsEndDate}
                onChange={formik.handleChange}
                error={formik.touched.vacationsEndDate && Boolean(formik.errors.vacationsEndDate)}
                helperText={formik.touched.vacationsEndDate && formik.errors.vacationsEndDate}
              />
            </Grid>

            {/* boton del formulario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={formik.handleSubmit}
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
