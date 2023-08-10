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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  employee_name: Yup.string()
    .required('Nombre del empleado es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  enrollment_date: Yup.string()
    .required('Fecha de registro es requerida')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  position_id: Yup.number().required('ID de la posición es requerido'),
  department_id: Yup.number().required('ID del departamento es requerido'),
  monthly_salary: Yup.number().required('Salario mensual es requerido'),
  email: Yup.string()
    .required('Correo electrónico es requerido')
    .max(70, 'El correo debe tener como máximo 70 caracteres')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      ' El correo electrónico ingresado no tiene un formato válido'
    ),
  phone: Yup.string()
    .required('Número de teléfono es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  available_vacation_quantity: Yup.number().required(
    'Cantidad de vacaciones disponibles es requerido'
  ),
});

export default function EmployeeForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/position',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/department',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchPositions();
    fetchDepartments();
  }, [accessToken]);

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/employee', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success('Empleado agregado exitosamente');
      setTimeout(() => {
        router.push('/dashboard/employee/list');
      }, 2000);
    } catch (error) {
      toast.error('Error al agregar empleado');
    }
  };

  const formik = useFormik({
    initialValues: {
      employee_name: '',
      enrollment_date: new Date().toISOString().split('T')[0],
      position_id: 1,
      department_id: 1,
      monthly_salary: 0,
      email: '',
      phone: '',
      available_vacation_quantity: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'employee_name' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (name === 'phone' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }
    if (event.target.name === 'phone' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en este campo');
    }

    if (name === 'email' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Empleado
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
              <TextField
                fullWidth
                label="Nombre del empleado"
                name="employee_name"
                type="text"
                value={formik.values.employee_name}
                onChange={handleInputChange}
                error={formik.touched.employee_name && formik.errors.employee_name}
                helperText={formik.touched.employee_name && formik.errors.employee_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de registro"
                name="enrollment_date"
                type="date"
                value={formik.values.enrollment_date}
                onChange={formik.handleChange}
                error={formik.touched.enrollment_date && formik.errors.enrollment_date}
                helperText={formik.touched.enrollment_date && formik.errors.enrollment_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="position-label" style={{ marginTop: '10px' }}>
                  Posición
                </InputLabel>
                <Select
                  labelId="position-label"
                  id="position_id"
                  name="position_id"
                  type="number"
                  value={formik.values.position_id}
                  onChange={formik.handleChange}
                  error={formik.touched.position_id && formik.errors.position_id}
                  fullWidth
                >
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.position_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="department-label" style={{ marginTop: '10px' }}>
                  Departamento
                </InputLabel>
                <Select
                  labelId="department-label"
                  id="department_id"
                  type="number"
                  name="department_id"
                  value={formik.values.department_id}
                  onChange={formik.handleChange}
                  error={formik.touched.department_id && formik.errors.department_id}
                  fullWidth
                >
                  {departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.department_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Salario mensual"
                name="monthly_salary"
                type="number"
                value={formik.values.monthly_salary}
                onChange={handleInputChange}
                error={formik.touched.monthly_salary && formik.errors.monthly_salary}
                helperText={formik.touched.monthly_salary && formik.errors.monthly_salary}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={handleInputChange}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Número de teléfono"
                name="phone"
                value={formik.values.phone}
                onChange={handleInputChange}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Cantidad de vacaciones disponibles"
                name="available_vacation_quantity"
                type="number"
                value={formik.values.available_vacation_quantity}
                onChange={handleInputChange}
                error={
                  formik.touched.available_vacation_quantity &&
                  formik.errors.available_vacation_quantity
                }
                helperText={
                  formik.touched.available_vacation_quantity &&
                  formik.errors.available_vacation_quantity
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
                onClick={() => router.push('/dashboard/employee/list')}
              >
                Volver a la lista de empleados
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
