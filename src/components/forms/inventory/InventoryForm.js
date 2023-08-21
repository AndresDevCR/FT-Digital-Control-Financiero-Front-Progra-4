import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .required('Nombre del producto/servicio es requerido')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  availableQuantity: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  description: Yup.string()
    .required('Descripción es requerida')
    .max(200, 'La descripción debe tener como máximo 200 caracteres'),
  entryDate: Yup.date().required('Fecha de ingreso es requerida'),
});

export default function InventoryForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSubmit = async (values) => {
    try {
     const response= await axios.post('https://control-financiero.herokuapp.com/api/v1/inventory', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      if (response.status === 201) {
        enqueueSnackbar('Producto agregado al inventario', { variant: 'success' });
        router.push('/inventory');
      }
    } catch (error) {
      enqueueSnackbar('Error al agregar el producto al inventario', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      availableQuantity: 1,
      description: '',
      entryDate: new Date().toISOString().split('T')[0],
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'productName' && event.target.value.length >= 30) {
      enqueueSnackbar('Se ha alcanzado el límite de caracteres permitidos para el nombre', {
        variant: 'info',
      });
    }

    if (event.target.name === 'availableQuantity' && !/^\d+$/.test(event.target.value)) {
      enqueueSnackbar('Solo se permiten números enteros', { variant: 'info' });
    }

    if (event.target.name === 'availableQuantity' && event.target.value.length >= 7) {
      event.target.value = event.target.value.slice(0, 6); // Limitar a 6 dígitos
      enqueueSnackbar('Se ha alcanzado el límite de dígitos permitidos para la cantidad', {
        variant: 'info',
      });
    }

    if (event.target.name === 'description' && event.target.value.length >= 200) {
      enqueueSnackbar('Se ha alcanzado el límite de caracteres permitidos para la descripción', {
        variant: 'info',
      });
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Inventario
        </Typography>
      </Container>

      <Container>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del producto/servicio"
                name="productName"
                value={formik.values.productName}
                onChange={handleInputChange}
                error={formik.touched.productName && formik.errors.productName}
                helperText={formik.touched.productName && formik.errors.productName}
                inputProps={{
                  maxLength: 30,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cantidad disponible"
                name="availableQuantity"
                type="number"
                value={formik.values.availableQuantity}
                onChange={handleInputChange}
                error={formik.touched.availableQuantity && formik.errors.availableQuantity}
                helperText={formik.touched.availableQuantity && formik.errors.availableQuantity}
                inputProps={{
                  max: 999999,
                  maxLength: 6,
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
              <TextField
                fullWidth
                label="Fecha de ingreso"
                name="entryDate"
                type="date"
                value={formik.values.entryDate}
                onChange={formik.handleChange}
                error={formik.touched.entryDate && formik.errors.entryDate}
                helperText={formik.touched.entryDate && formik.errors.entryDate}
                InputLabelProps={{
                  shrink: true,
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

            {/* Botón para volver a la lista de inventario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/inventory')}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de inventario
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
