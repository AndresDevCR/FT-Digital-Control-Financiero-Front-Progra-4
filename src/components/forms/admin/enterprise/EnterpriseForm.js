import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  enterprise_name: Yup.string()
    .required('El nombre de la empresa es obligatorio')
    .max(30, 'El nombre de la empresa debe tener como máximo 30 caracteres'),
});

export default function EnterpriseForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/enterprise', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Agregado correctamente al inventario');
      router.push('/dashboard/enterprise/list'); // Redireccionar a la lista de inventario
    } catch (error) {
      toast.error('Error al agregar a los empresas');
    }
  };

  const formik = useFormik({
    initialValues: {
      enterprise_name: '',
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
          Agregar empresa
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
                label="Nombre de la empresa"
                name="enterprise_name"
                value={formik.values.enterprise_name}
                onChange={handleInputChange}
                error={formik.touched.enterprise_name && formik.errors.enterprise_name}
                helperText={formik.touched.enterprise_name && formik.errors.enterprise_name}
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

            {/* Botón para volver a la lista de empresas */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push("/dashboard/enterprise/list")}
              >
                Volver a la lista de empresas
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
