import React, { useContext } from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for form validation
import axios from 'axios';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

const HrAdd = () => {
  const { themeStretch } = useSettingsContext();
  const { accessToken } = useContext(AuthContext); // Update this line to destructure accessToken from AuthContext

  const initialValues = {
    employee_name: '',
    phone: '',
    email: '',
    entry_date: '',
    salary: '',
    position: '',
    department: '',
    schedule: '',
    rest_days: '',
    vacation_days: ''
  };

  const validationSchema = Yup.object().shape({
    employee_name: Yup.string().required('Ingrese el nombre del empleado'),
    phone: Yup.string().required('Ingrese el teléfono'),
    email: Yup.string().email('Ingrese un correo electrónico válido').required('Ingrese el correo electrónico'),
    entry_date: Yup.date().required('Ingrese la fecha de ingreso'),
    salary: Yup.number().min(0, 'Ingrese un salario válido').required('Ingrese el salario'),
    position: Yup.string().required('Ingrese el cargo'),
    department: Yup.string().required('Ingrese el departamento'),
    schedule: Yup.string().required('Ingrese el horario'),
    rest_days: Yup.string().required('Ingrese los días de descanso'),
    vacation_days: Yup.string().required('Ingrese los días de vacaciones')
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/human-rescourse', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the authentication token in the header
        },
      });
      toast.success('Empleado agregado con éxito');
      formik.resetForm();
    } catch (error) {
      toast.error('Error al agregar el empleado');
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema // Set the validation schema
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
              name="employee_name"
              value={formik.values.employee_name}
              onChange={formik.handleChange}
              error={formik.touched.employee_name && Boolean(formik.errors.employee_name)}
              helperText={formik.touched.employee_name && formik.errors.employee_name}
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
              label="Fecha de ingreso"
              name="entry_date"
              type="date"
              value={formik.values.entry_date}
              onChange={formik.handleChange}
              error={formik.touched.entry_date && Boolean(formik.errors.entry_date)}
              helperText={formik.touched.entry_date && formik.errors.entry_date}
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
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cargo"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Departamento"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Horario"
              name="schedule"
              value={formik.values.schedule}
              onChange={formik.handleChange}
              error={formik.touched.schedule && Boolean(formik.errors.schedule)}
              helperText={formik.touched.schedule && formik.errors.schedule}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Días de descanso"
              name="rest_days"
              value={formik.values.rest_days}
              onChange={formik.handleChange}
              error={formik.touched.rest_days && Boolean(formik.errors.rest_days)}
              helperText={formik.touched.rest_days && formik.errors.rest_days}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Días de vacaciones"
              name="vacation_days"
              value={formik.values.vacation_days}
              onChange={formik.handleChange}
              error={formik.touched.vacation_days && Boolean(formik.errors.vacation_days)}
              helperText={formik.touched.vacation_days && formik.errors.vacation_days}
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
