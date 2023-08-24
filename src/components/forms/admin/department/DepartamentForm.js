import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  department_name: Yup.string()
    .required('El nombre es obligatorio')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
});

export default function DepartamentForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const response= await axios.post('https://control-financiero.herokuapp.com/api/v1/department', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      if (response.status === 201) {
        enqueueSnackbar('Departamento agregado exitosamente', { variant: 'success' });
        router.push('/dashboard/department/list'); 
      }
    } catch (error) {
      enqueueSnackbar('Error al agregar el departamentos', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues: {
      department_name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar departamento
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
                label="Nombre del departamento"
                name="department_name"
                value={formik.values.department_name}
                onChange={handleInputChange}
                error={formik.touched.department_name && formik.errors.department_name}
                helperText={formik.touched.department_name && formik.errors.department_name}
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

            {/* Botón para volver a la lista de departamentos */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/dashboard/department/list')}
              >
                Volver a la lista de departamentos
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
