import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
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
  dollar: Yup.number()
    .nullable()
    .required('El precio del dólar del día es requerido')
    .test(
      'is-valid-dollar',
      'Solo se permiten números en el campo de Precio del dólar',
      (value) => value === null || /^\d+(\.\d{1,2})?$/.test(value)
    ),
  payment_advance: Yup.number()
    .optional()
    .nullable()
    .default(0)
    .test(
      'is-valid-payment-advance',
      'El campo "Payment Advance" solo permite números enteros o decimales con hasta 2 dígitos decimales.',
      (value) => /^\d+(\.\d{1,2})?$/.test(value)
    ),
  extra_time: Yup.number()
    .optional()
    .nullable()
    .default(0)
    .test('is-valid-extra-time', 'El campo "Extra Time" solo permite números enteros.', (value) =>
      /^\d+$/.test(value)
    ),
  medical_leave_days: Yup.number()
    .optional()
    .nullable()
    .default(0)
    .test(
      'is-valid-medical-leave-days',
      'El campo "Medical Leave Days" solo permite números enteros.',
      (value) => /^\d+$/.test(value)
    ),
  not_payed_leave_days: Yup.number()
    .optional()
    .nullable()
    .default(0)
    .test(
      'is-valid-not-payed-leave-days',
      'El campo "Not Payed Leave Days" solo permite números enteros.',
      (value) => /^\d+$/.test(value)
    ),
});

export default function PaymentForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

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

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/payments', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Pago agregado correctamente');
      setTimeout(() => {
        router.push('/payments/list'); // Redireccionar a la lista de pagos
      }, 2000);
    } catch (error) {
      toast.error('Error al agregar pago');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'employee_id' && !/^\d+$/.test(value)) {
      toast.error('Solo se permiten números en el campo de Id de empleado');
    }

    if (name === 'dollar' && value !== '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
      toast.error(
        'El campo del tipo de cambio del dólar solo permite números enteros o decimales con hasta 2 dígitos decimales.'
      );
      return;
    }

    // Asignar el valor predeterminado solo si el campo está vacío
    if (
      ['payment_advance', 'extra_time', 'medical_leave_days', 'not_payed_leave_days'].includes(name)
    ) {
      formik.setFieldValue(name, value === '' ? null : parseFloat(value) || 0);
    } else {
      formik.handleChange(event);
    }
  };

  const formik = useFormik({
    initialValues: {
      employee_id: 1,
      dollar: 0,
      payment_advance: null,
      extra_time: null,
      medical_leave_days: null,
      not_payed_leave_days: null,
      biweekly_salary: 0,
      daily_salary: 0,
      subsidy: 0,
      hour_rate: 0,
      extra_time_value: 0,
      extra_time_total: 0,
      gross_payment: 0,
      gross_payment_dollar: 0,
      gross_payment_social_deduction: 0,
      deduction_total: 0,
      net_payment: 0,
      net_payment_dollar: 0,
      ins_payroll: 0,
      income_tax: 0,
      total_salary: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar pago
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
          <Grid container spacing={2}>
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

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Precio del dólar del día"
                name="dollar"
                type="number"
                value={formik.values.dollar}
                onChange={handleInputChange}
                error={formik.touched.dollar && formik.errors.dollar}
                helperText={formik.touched.dollar && formik.errors.dollar}
                inputProps={{
                  max: 999999,
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} container alignItems="center">
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="https://www.sucursalelectronica.com/redir/showLogin.go"
                target="_blank"
              >
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                error={formik.touched.not_payed_leave_days && !!formik.errors.not_payed_leave_days}
                helperText={
                  formik.touched.not_payed_leave_days && formik.errors.not_payed_leave_days
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pago anticipado"
                name="payment_advance"
                type="number"
                value={formik.values.payment_advance}
                onChange={handleInputChange}
                error={formik.touched.payment_advance && !!formik.errors.payment_advance}
                helperText={formik.touched.payment_advance && formik.errors.payment_advance}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                startIcon={<SaveIcon />}
              >
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
