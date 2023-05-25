// next
import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import axios from 'axios';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

const initialValues = {
  name: '',
  phone: '',
  email: '',
  date: '',
  salary: '',
  position: '',
  department: '',
  schedule: '',
  restDays: '',
  vacationDays: ''
};

const HrAdd = () => {
  const { themeStretch } = useSettingsContext();

  const handleSubmit = (values) => {
    axios
      .post('https://control-financiero.herokuapp.com/api/v1/human-resources', values)
      .then((response) => {
        console.log(response);
        toast.success('Empleado agregado correctamente');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error al agregar el empleado');
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <>
      <Head>
        <title>Agregar Empleado | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Empleado
        </Typography>
      </Container>

      <ToastContainer />

      {/* formulario de agregar empleado */}
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
                label="Nombre del empleado"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de ingreso"
                name="date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salario"
                name="salary"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cargo"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Departamento"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Horario"
                name="schedule"
                value={formik.values.schedule}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Días de descanso"
                name="restDays"
                value={formik.values.restDays}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Días de vacaciones"
                name="vacationDays"
                value={formik.values.vacationDays}
                onChange={formik.handleChange}
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
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

HrAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HrAdd;
