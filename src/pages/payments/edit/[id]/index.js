/* eslint-disable no-unused-vars */
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
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';
import DashboardLayout from '../../../../layouts/dashboard';
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';

EditPaymentsForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  client_id: Yup.number()
    .required('Id de cliente es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  total_payment: Yup.number()
    .required('Total de pago es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  total_payment_dollar: Yup.number()
    .required('Total de pago en dolares es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  e_invoice_code: Yup.string()
    .required('Codigo de factura es requerido')
    .min(1, 'El campo debe tener como mínimo 1 caracter'),
  issue_date: Yup.date().required('Fecha de emisión es requerido'),
  po_number: Yup.number()
    .required('Numero de orden de compra es requerido')
    .min(1, 'El campo debe tener como mínimo 1 digito'),
  po_date: Yup.date().required('Fecha de orden de compra es requerido'),
  description: Yup.string()
    .required('Descripción es requerido')
    .max(200, 'El campo debe tener como máximo 200 caracteres'),
  quote_title: Yup.string()
    .required('Titulo de cotización es requerido')
    .max(30, 'El campo debe tener como máximo 30 caracteres'),
});
export default function EditPaymentsForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [paymentsData, setPayments] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const response = await axios.get(
          `https://control-financiero.herokuapp.com/api/v1/payments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const payments = response.data;
        setPayments(payments);
        formik.setValues({
          id: payments.id,
          employee_id: payments.employee_id,
          extra_time: payments.extra_time,
          medical_leave_days: payments.medical_leave_days,
          not_payed_leave_days: payments.not_payed_leave_days,
          dollar: payments.dollar,
        });
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

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
      await axios.patch(`https://control-financiero.herokuapp.com/api/v1/payments/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success('Pago editada exitosamente');
      router.push('/payments/list');
    } catch (error) {
      toast.error('Error al editar cotización');
    }
  };

  const formik = useFormik({
    initialValues: {
      id: 1,
      employee_id: 1,
      extra_time: 0,
      medical_leave_days: 0,
      not_payed_leave_days: 0,
      dollar: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

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
      [
        'employee_id',
        'extra_time',
        'medical_leave_days',
        'not_payed_leave_days',
        'dollar',
      ].includes(name)
    ) {
      formik.setFieldValue(name, value === '' ? null : parseFloat(value) || 0);
    } else {
      formik.handleChange(event);
    }
  };

  if (!paymentsData) {
    return <div>Loading...</div>;
  }

  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Editar Pago
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
                  error={
                    formik.touched.not_payed_leave_days && !!formik.errors.not_payed_leave_days
                  }
                  helperText={
                    formik.touched.not_payed_leave_days && formik.errors.not_payed_leave_days
                  }
                />
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
                  onClick={() => router.push('/payments/list')}
                >
                  Volver a la lista de pagos
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RoleBasedGuard>
  );
}
