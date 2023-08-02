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
import RoleBasedGuard from '../../../../../auth/RoleBasedGuard';

EditUserPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Nombre del usuario es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  last_name: Yup.string()
    .required('Apellido del empleado es requerido')
    .max(30, 'El apellido debe tener como máximo 30 caracteres'),
    email: Yup.string()
    .required('El correo del usuario es requerido')
    .max(70, 'El correo debe tener como máximo 70 caracteres')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'El correo electrónico ingresado no tiene un formato válido'
    ),
    password: Yup.string()
    .required('Ingrese su nueva contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(30, 'La contraseña debe tener como máximo 30 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y no puede tener caracteres especiales'
    ),
});

export default function EditUserPage() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const { id } = router.query; // Obtiene el ID del empleado de la URL

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/role',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, [accessToken]);

    useEffect(() => {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(
            'https://control-financiero.herokuapp.com/api/v1/company',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setCompanies(response.data);
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
      fetchCompany();
    }, [accessToken]);

    useEffect(() => {
      const fetchApplication = async () => {
        try {
          const response = await axios.get(
            'https://control-financiero.herokuapp.com/api/v1/application',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setApplications(response.data);
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      };
      fetchApplication();
    }, [accessToken]);

  
  useEffect(() => {

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
        formik.setValues({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          company_id: userData.company_id,
          role_id: userData.company_id,
          application_id: userData.application_id,
          company_start_date: userData.company_start_date,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

  const handleSubmit = async (values) => {
    try {
      await axios.patch(`https://control-financiero.herokuapp.com/api/v1/auth/edit/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
        company_id: 1,
        role_id: 1,
        application_id: 1,
        company_start_date: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value.length >= 30 && name !== 'email') {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (name === 'password' && value.length >= 15) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }
    if (name === 'email' && value.length >= 70) {
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
                label="Nueva contraseña"
                name="password"
                type="text"
                value={formik.values.password}
                onChange={handleInputChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                inputProps={{
                  maxLength: 15,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="company-label" color="secondary">
                  Empresa
                </InputLabel>
                <Select
                  labelId="company-label"
                  id="company_id"
                  name="company_id"
                  value={formik.values.company_id}
                  onChange={formik.handleChange}
                  error={formik.touched.company_id && formik.errors.company_id}
                  helperText={formik.touched.company && formik.errors.company}
                  fullWidth
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Posición</InputLabel>
                <Select
                  labelId="role-label"
                  id="role_id"
                  name="role_id"
                  value={formik.values.role_id}
                  onChange={formik.handleChange}
                  error={formik.touched.role_id && formik.errors.role_id}
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="application-label">Aplicación</InputLabel>
                <Select
                  labelId="application-label"
                  id="application_id"
                  name="application_id"
                  value={formik.values.application_id}
                  onChange={formik.handleChange}
                  error={formik.touched.application_id && formik.errors.application_id}
                  fullWidth
                >
                  {applications.map((application) => (
                    <MenuItem key={application.id} value={application.id}>
                      {application.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de inicio en la empresa"
                name="company_start_date"
                type="date"
                value={formik.values.company_start_date}
                onChange={formik.handleChange}
                error={formik.touched.company_start_date && formik.errors.company_start_date}
                helperText={formik.touched.company_start_date && formik.errors.company_start_date}
                InputLabelProps={{
                  shrink: true,
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
