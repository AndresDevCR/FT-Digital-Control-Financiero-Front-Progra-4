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
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../../../auth/JwtContext';
import DashboardLayout from '../../../../layouts/dashboard';
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';

EditPaymentsForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  employee_id: Yup.number()
    .required('Id de empleado es requerido')
    .min(1, 'El campo debe tener como mínimo 1 dígito'),
  dollar: Yup.number()
    .required('Tipo de cambio de dólar requerido')
    .min(1, 'El campo debe tener como mínimo 1 dígito')
    .typeError('Solo se permiten números en el campo de tipo de cambio de dólar'),
  extra_time: Yup.number().min(0, 'El campo debe ser mayor o igual a 0'),
  medical_leave_days: Yup.number().min(0, 'El campo debe ser mayor o igual a 0'),
  not_payed_leave_days: Yup.number().min(0, 'El campo debe ser mayor o igual a 0'),
});

export default function EditPaymentsForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [paymentsData, setPaymentsData] = useState(null);

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
      const response = await axios.patch(`https://control-financiero.herokuapp.com/api/v1/payments/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        enqueueSnackbar('Pago editado exitosamente', { variant: 'success' });
        router.push('/payments/list');
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error al editar pago', { variant: 'error' });
    }
  };

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
        setPaymentsData(payments);
        formik.setValues({
          employee_id: payments.employee_id,
          dollar: payments.dollar,
          extra_time: payments.extra_time,
          medical_leave_days: payments.medical_leave_days,
          not_payed_leave_days: payments.not_payed_leave_days,
        });
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
  
    fetchPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);
  
  const formik = useFormik({
    initialValues: {
      employee_id: '',
      dollar: '',
      extra_time: '',
      medical_leave_days: '',
      not_payed_leave_days: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  

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
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
                error={formik.touched.extra_time && formik.errors.extra_time}
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
                error={
                  formik.touched.medical_leave_days &&
                  formik.errors.medical_leave_days
                }
                helperText={
                  formik.touched.medical_leave_days &&
                  formik.errors.medical_leave_days
                }
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
                error={
                  formik.touched.not_payed_leave_days &&
                  formik.errors.not_payed_leave_days
                }
                helperText={
                  formik.touched.not_payed_leave_days &&
                  formik.errors.not_payed_leave_days
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
        </Box>
      </Container>
    </RoleBasedGuard>
  );
}
