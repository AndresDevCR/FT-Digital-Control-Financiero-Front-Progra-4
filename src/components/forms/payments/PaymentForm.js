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
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  employee_id: Yup.number().required('El empleado es requerido'),
  biweekly_salary: Yup.number().required('El salario quincenal es requerido'),
  daily_salary: Yup.number().required('El salario diario es requerido'),
  subsidy: Yup.number().required('El subsidio es requerido'),
  hour_rate: Yup.number().required('La tarifa por hora es requerida'),
  extra_time_value: Yup.number().required('El valor de las horas extras es requerido'),
  extra_time: Yup.number().required('Las horas extras son requeridas'),
  extra_time_total: Yup.number().required('El total de horas extras es requerido'),
  medical_leave_days: Yup.number().required('Los días de licencia médica son requeridos'),
  not_payed_leave_days: Yup.number().required('Los días de licencia no pagados son requeridos'),
  gross_payment: Yup.number().required('El pago bruto es requerido'),
  gross_payment_social_deduction: Yup.number().required('La deducción social del pago bruto es requerida'),
  payment_advance: Yup.number().required('El pago anticipado es requerido'),
  deduction_total: Yup.number().required('La deducción total es requerida'),
  net_payment: Yup.number().required('El pago neto es requerido'),
  net_payment_dollar: Yup.number().required('El pago neto en dólares es requerido'),
  ins_payroll: Yup.number().required('El seguro de nómina es requerido'),
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
      await axios.post('https://control-financiero.herokuapp.com/api/v1/payment', formik.values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Empleado agregado correctamente');
      router.push('/quotation'); // Redireccionar a la lista de cotizaciones
    } catch (error) {
      toast.error('Error al agregar empleado');
    }
  };

  const formik = useFormik({
    initialValues: {
      employee_id: '',
      biweekly_salary: '',
      daily_salary: '',
      subsidy: '',
      hour_rate: '',
      extra_time_value: '',
      extra_time: '',
      extra_time_total: '',
      medical_leave_days: '',
      not_payed_leave_days: '',
      gross_payment: '',
      gross_payment_social_deduction: '',
      payment_advance: '',
      deduction_total: '',
      net_payment: '',
      net_payment_dollar: '',
      ins_payroll: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'client_id' && !/^\d+$/.test(value)) {
      toast.error('Solo se permiten números en el campo de Id de cliente');
    }

    if (name === 'availableQuantity' && !/^\d+$/.test(value)) {
      toast.error('Solo se permiten números en el campo de Cantidad disponible');
    }

    if (name === 'availableQuantity' && value.length >= 7) {
      event.target.value = value.slice(0, 6); // Limitar a 6 dígitos
      toast.info('Se ha alcanzado el límite de números permitidos ');
    }

    if (name === 'description' && value.length >= 200) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos para la descripción');
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
                <InputLabel id="client-label">Empleado</InputLabel>
                <Select
                  labelId="client-label"
                  id="client_id"
                  name="client_id"
                  value={formik.values.client_id}
                  onChange={formik.handleChange}
                  error={formik.touched.client_id && formik.errors.client_id}
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
                label="Salario quincenal"
                name="biweekly_salary"
                type="number"
                value={formik.values.biweekly_salary}
                onChange={formik.handleChange}
                error={formik.touched.biweekly_salary && !!formik.errors.biweekly_salary}
                helperText={formik.touched.biweekly_salary && formik.errors.biweekly_salary}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salario diario"
                name="daily_salary"
                type="number"
                value={formik.values.daily_salary}
                onChange={formik.handleChange}
                error={formik.touched.daily_salary && !!formik.errors.daily_salary}
                helperText={formik.touched.daily_salary && formik.errors.daily_salary}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subsidio"
                name="subsidy"
                type="number"
                value={formik.values.subsidy}
                onChange={formik.handleChange}
                error={formik.touched.subsidy && !!formik.errors.subsidy}
                helperText={formik.touched.subsidy && formik.errors.subsidy}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tarifa por hora"
                name="hour_rate"
                type="number"
                value={formik.values.hour_rate}
                onChange={formik.handleChange}
                error={formik.touched.hour_rate && !!formik.errors.hour_rate}
                helperText={formik.touched.hour_rate && formik.errors.hour_rate}
              />
            </Grid>

            
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Valor de las horas extras"
              name="extra_time_value"
              type="number"
              value={formik.values.extra_time_value}
              onChange={formik.handleChange}
              error={formik.touched.extra_time_value && !!formik.errors.extra_time_value}
              helperText={formik.touched.extra_time_value && formik.errors.extra_time_value}
            />
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
              label="Total de horas extras"
              name="extra_time_total"
              type="number"
              value={formik.values.extra_time_total}
              onChange={formik.handleChange}
              error={formik.touched.extra_time_total && !!formik.errors.extra_time_total}
              helperText={formik.touched.extra_time_total && formik.errors.extra_time_total}
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
              label="Pago bruto"
              name="gross_payment"
              type="number"
              value={formik.values.gross_payment}
              onChange={formik.handleChange}
              error={formik.touched.gross_payment && !!formik.errors.gross_payment}
              helperText={formik.touched.gross_payment && formik.errors.gross_payment}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Deducción social del pago bruto"
              name="gross_payment_social_deduction"
              type="number"
              value={formik.values.gross_payment_social_deduction}
              onChange={formik.handleChange}
              error={formik.touched.gross_payment_social_deduction && !!formik.errors.gross_payment_social_deduction}
              helperText={formik.touched.gross_payment_social_deduction && formik.errors.gross_payment_social_deduction}
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

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Deducción total"
              name="deduction_total"
              type="number"
              value={formik.values.deduction_total}
              onChange={formik.handleChange}
              error={formik.touched.deduction_total && !!formik.errors.deduction_total}
              helperText={formik.touched.deduction_total && formik.errors.deduction_total}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Pago neto"
              name="net_payment"
              type="number"
              value={formik.values.net_payment}
              onChange={formik.handleChange}
              error={formik.touched.net_payment && !!formik.errors.net_payment}
              helperText={formik.touched.net_payment && formik.errors.net_payment}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Pago neto en dólares"
              name="net_payment_dollar"
              type="number"
              value={formik.values.net_payment_dollar}
              onChange={formik.handleChange}
              error={formik.touched.net_payment_dollar && !!formik.errors.net_payment_dollar}
              helperText={formik.touched.net_payment_dollar && formik.errors.net_payment_dollar}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Seguro de nómina"
              name="ins_payroll"
              type="number"
              value={formik.values.ins_payroll}
              onChange={formik.handleChange}
              error={formik.touched.ins_payroll && !!formik.errors.ins_payroll}
              helperText={formik.touched.ins_payroll && formik.errors.ins_payroll}
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
                Volver a la lista de cotizaciones
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}