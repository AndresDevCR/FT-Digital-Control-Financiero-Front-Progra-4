import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
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
import axios from 'axios';
import { AuthContext } from '../../../../../auth/JwtContext';
import DashboardLayout from '../../../../../layouts/dashboard';

EditUserPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Nombre del usuario es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  last_name: Yup.string()
    .required('Apellido del usuario es requerido')
    .max(30, 'El apellido debe tener como máximo 30 caracteres'),
  password: Yup.string()
    .required('Contraseña del usuario es requerida')
    .max(30, 'La contraseña debe tener como máximo 30 caracteres'),
  email: Yup.string()
    .email('Correo del usuario es inválido')
    .required('Correo del usuario es requerido')
    .max(70, 'El correo debe tener como máximo 70 caracteres'),
});

export default function EditUserPage() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { id } = router.query; // Obtiene el ID del empleado de la URL

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

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://control-financiero.herokuapp.com/api/v1/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userData = response.data;
      const formattedDate = userData.enrollment_date.slice(0, 10); // Extract the date part
      formik.setValues({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (accessToken && id) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

  const handleSubmit = async (values) => {
    try {
      await axios.patch(
        `https://control-financiero.herokuapp.com/api/v1/user/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success('Usuario actualizado exitosamente');
      router.push('/dashboard/user/list');
    } catch (error) {
      toast.error('Error al actualizar usuario');
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      is_active: true,
      company_start_date: '',
      role_name: '',
      company_name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'first_name' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (name === 'last_name' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (name === 'email' && value.length >= 70) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (name === 'password' && value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Editar Usuario
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
                label="Nombre del usuario"
                name="first_name"
                type="text"
                value={formik.values.first_name}
                onChange={handleInputChange}
                error={formik.touched.first_name && formik.errors.first_name}
                helperText={formik.touched.first_name && formik.errors.first_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Apellido del usuario"
                name="last_name"
                type="text"
                value={formik.values.last_name}
                onChange={handleInputChange}
                error={formik.touched.last_name && formik.errors.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Correo del usuario"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={handleInputChange}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{
                  maxLength: 70,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="text"
                onChange={handleInputChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                inputProps={{
                  maxLength: 30,
                }}
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
                onClick={() => router.push('/dashboard/user/list')}
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