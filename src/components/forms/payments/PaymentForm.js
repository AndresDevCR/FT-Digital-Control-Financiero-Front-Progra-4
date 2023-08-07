import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useRouter } from 'next/router';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  employee_id: Yup.number().required('El empleado es requerido'),
  dollar: Yup.number().required('El precio del dolar del día es requerido'),
  payment_advance: Yup.number().optional(),
  extra_time: Yup.number().optional(),
  medical_leave_days: Yup.number().optional(),
  not_payed_leave_days: Yup.number().optional(),
});

export default function PaymentForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/employee', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, [accessToken]);

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/payments', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Pago agregado correctamente');
      router.push('/payments/list'); // Redireccionar a la lista de pagos
    } catch (error) {
      toast.error('Error al agregar pago');
    }
  };

  const formik = useFormik({
    initialValues: {
      employee_id: 1,
      dollar: 0,
      payment_advance: 0,
      extra_time: 0,
      medical_leave_days: 0,
      not_payed_leave_days: 0
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'employee_id' && !/^\d+$/.test(value)) {
      toast.error('Solo se permiten números en el campo de Id de empleado');
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar pago
        </Typography>
      </Container>

      <ToastContainer />

      <Container>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="employee-label">Empleado</InputLabel>
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

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Precio del dólar del día"
                name="dollar"
                type="number"
                value={formik.values.dollar}
                onChange={handleInputChange}
                error={formik.touched.dollar && formik.errors.dollar}
                helperText={
                  formik.touched.dollar && formik.errors.dollar
                }
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container alignItems="center">
              <Button variant="contained" color="primary" component="a" href="https://www.sucursalelectronica.com/redir/showLogin.go" target="_blank">
                <CurrencyExchangeIcon />
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Horas extras"
                name="extra_time"
                type="number"
                value={formik.values.extra_time}
                onChange={formik.handleChange}
                error={formik.touched.extra_time && !!formik.errors.extra_time}
                helperText={formik.touched.extra_time && formik.errors.extra_time}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Días de licencia médica"
                name="medical_leave_days"
                type="number"
                value={formik.values.medical_leave_days}
                onChange={formik.handleChange}
                error={formik.touched.medical_leave_days && !!formik.errors.medical_leave_days}
                helperText={formik.touched.medical_leave_days && formik.errors.medical_leave_days}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Días de licencia no pagados"
                name="not_payed_leave_days"
                type="number"
                value={formik.values.not_payed_leave_days}
                onChange={formik.handleChange}
                error={formik.touched.not_payed_leave_days && !!formik.errors.not_payed_leave_days}
                helperText={formik.touched.not_payed_leave_days && formik.errors.not_payed_leave_days}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pago anticipado"
                name="payment_advance"
                type="number"
                value={formik.values.payment_advance}
                onChange={formik.handleChange}
                error={formik.touched.payment_advance && !!formik.errors.payment_advance}
                helperText={formik.touched.payment_advance && formik.errors.payment_advance}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" variant="contained" type="submit" startIcon={<SaveIcon />}>
                Guardar
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/payments/list')}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de pagos
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}