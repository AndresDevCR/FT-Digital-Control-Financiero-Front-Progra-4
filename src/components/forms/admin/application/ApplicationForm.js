import React, { useContext } from 'react';
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
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nombre de la aplicación es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  display_name: Yup.string()
    .required('Nombre de visualización es requerida')
    .max(30, 'El nombre de visualización debe tener como máximo 30 caracteres'),
  description: Yup.string().max(200, 'La descripción debe tener como máximo 200 caracteres'),
  is_active: Yup.boolean().default(true),
});

export default function ApplicationForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const response= await axios.post('https://control-financiero.herokuapp.com/api/v1/application', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      if (response.status === 201) {
        enqueueSnackbar('Agregado correctamente a las aplicaciones', { variant: 'success' });
        router.push('/dashboard/application/list');
      }
    } catch (error) {
      enqueueSnackbar('Error al agregar a las aplicaciones', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      display_name: '',
      description: '',
      is_active: true,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'name' && event.target.value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (event.target.name === 'display_name' && event.target.value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (event.target.name === 'description' && event.target.value.length >= 200) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos para la descripción');
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar aplicación
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
                label="Nombre de la aplicación"
                name="name"
                value={formik.values.name}
                onChange={handleInputChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Nombre de visualización"
                name="display_name"
                value={formik.values.display_name}
                onChange={handleInputChange}
                error={formik.touched.display_name && formik.errors.display_name}
                helperText={formik.touched.display_name && formik.errors.display_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                multiline
                minRows={5}
                maxRows={10}
                value={formik.values.description}
                onChange={handleInputChange}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                inputProps={{
                  maxLength: 200,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.is_active}
                    onChange={handleInputChange}
                    name="is_active"
                    color="primary"
                  />
                }
                label="Activo"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de aplicaciones */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/dashboard/application/list')}
              >
                Volver a la lista de aplicaciones
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
