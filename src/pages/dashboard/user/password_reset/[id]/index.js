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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/role', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
      const response= await axios.patch(`https://control-financiero.herokuapp.com/api/v1/auth/edit/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        enqueueSnackbar('Usuario actualizado exitosamente', { variant: 'success' });
        router.push('/dashboard/user/list');
      }
    } catch (error) {
      enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
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
    <RoleBasedGuard roles={['administrator', 'admin']} hasContent>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Cambiar contraseña
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
    </RoleBasedGuard>
  );
}
