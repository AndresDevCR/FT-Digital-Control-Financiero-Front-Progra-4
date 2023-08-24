/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthContext } from '../../../../auth/JwtContext';
import DashboardLayout from '../../../../layouts/dashboard';
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';

EditVacationPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  employee_id: Yup.number().required('Empleado es requerido'),
  start_date: Yup.string().required('Fecha de inicio es requerida'),
  reentry_date: Yup.string().required('Fecha de reingreso es requerida'),
  request_status: Yup.string().required('Estado de solicitud es requerido'),
});

export default function EditVacationPage() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const { id } = router.query; // Obtiene el ID de la vacación de la URL
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/employee',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [accessToken]);

  const fetchVacationData = async () => {
    try {
      const response = await axios.get(
        `https://control-financiero.herokuapp.com/api/v1/vacation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const vacationData = response.data;
      const formattedStartDate = vacationData.start_date.slice(0, 10); // Extract the date part
      const formattedReentryDate = vacationData.reentry_date.slice(0, 10); // Extract the date part
      formik.setValues({
        employee_id: vacationData.employee_id,
        start_date: formattedStartDate,
        reentry_date: formattedReentryDate,
        request_status: vacationData.request_status,
      });
    } catch (error) {
      console.error('Error fetching vacation data:', error);
    }
  };

  useEffect(() => {
    if (accessToken && id) {
      fetchVacationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.patch(`https://control-financiero.herokuapp.com/api/v1/vacation/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        enqueueSnackbar('Vacaciones actualizadas exitosamente', { variant: 'success' });
        router.push('/vacations/list');
      }
    } catch (error) {
      enqueueSnackbar('Error al actualizar las vacaciones', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues: {
      employee_id: '',
      start_date: '',
      reentry_date: '',
      request_status: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    formik.handleChange(event);
  };

  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Editar Vacaciones
        </Typography>
      </Container>

      <ToastContainer />

      <Container>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="employee-label" style={{ marginTop: '10px' }}>
                  Empleado
                </InputLabel>
                <Select
                  labelId="employee-label"
                  id="employee_id"
                  name="employee_id"
                  value={formik.values.employee_id}
                  onChange={formik.handleChange}
                  error={formik.touched.employee_id && formik.errors.employee_id}
                  fullWidth
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.employee_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de inicio"
                name="start_date"
                type="date"
                value={formik.values.start_date}
                onChange={formik.handleChange}
                error={formik.touched.start_date && formik.errors.start_date}
                helperText={formik.touched.start_date && formik.errors.start_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de reingreso"
                name="reentry_date"
                type="date"
                value={formik.values.reentry_date}
                onChange={formik.handleChange}
                error={formik.touched.reentry_date && formik.errors.reentry_date}
                helperText={formik.touched.reentry_date && formik.errors.reentry_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="request-status-label" style={{ marginTop: '10px' }}>
                  Estado de solicitud
                </InputLabel>
                <Select
                  labelId="request-status-label"
                  id="request_status"
                  name="request_status"
                  value={formik.values.request_status}
                  onChange={formik.handleChange}
                  error={formik.touched.request_status && formik.errors.request_status}
                  fullWidth
                >
                  <MenuItem value="En Progreso">En Progreso</MenuItem>
                  <MenuItem value="Rechazada">Rechazada</MenuItem>
                  <MenuItem value="Aprobada">Aprobada</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/vacations/list')}
              >
                Volver a la lista de vacaciones
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RoleBasedGuard>
  );
}
