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
  supplier_name: Yup.string()
    .required('El nombre del proveedor es obligatorio')
    .max(30, 'El nombre del proveedor debe tener como máximo 30 caracteres'),
});

export default function SupplierForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/supplier', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Agregado correctamente');
      setTimeout(() => {
        router.push('/dashboard/supplier/list'); // Redireccionar a la lista de proveedores
      }, 2000);
    } catch (error) {
      toast.error('Error al agregar puesto');
    }
  };

  const formik = useFormik({
    initialValues: {
      supplier_name: '',
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
          Agregar proveedor
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
                label="Nombre del proveedor"
                name="supplier_name"
                value={formik.values.supplier_name}
                onChange={handleInputChange}
                error={formik.touched.supplier_name && formik.errors.supplier_name}
                helperText={formik.touched.supplier_name && formik.errors.supplier_name}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de proveedores */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/dashboard/supplier/list')}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de proveedores
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
