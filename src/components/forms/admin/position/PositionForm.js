import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  position_name: Yup.string()
    .required('El titulo del puesto es obligatorio')
    .max(30, 'El titulo del puesto debe tener como máximo 30 caracteres'),
});

export default function PositionForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/position', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Agregado correctamente');
      router.push('/dashboard/position/list'); // Redireccionar a la lista de inventario
    } catch (error) {
      toast.error('Error al agregar puesto');
    }
  };

  const formik = useFormik({
    initialValues: {
      position_name: '',
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
          Agregar Puesto
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
                label="Titulo del puesto"
                name="position_name"
                value={formik.values.position_name}
                onChange={handleInputChange}
                error={formik.touched.position_name && formik.errors.position_name}
                helperText={formik.touched.position_name && formik.errors.position_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained" startIcon={<SaveIcon />}>
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de puestos */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push("/dashboard/position/list")}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de puestos
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
