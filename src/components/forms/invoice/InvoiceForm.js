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
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  invoice_number: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  dollar_value: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  total_colon: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  total_dollar: Yup.number()
    .required('Cantidad disponible es requerida')
    .integer('Solo se permiten números enteros')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  issue_date: Yup.date().required('Fecha de ingreso es requerida'),
  expiration_date: Yup.date().required('Fecha de ingreso es requerida'),
});

export default function InvoiceForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://control-financiero.herokuapp.com/api/v1/invoice', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Agregado correctamente la factura');
      router.push('/invoice'); // Redireccionar a la lista de inventario
    } catch (error) {
      toast.error('Error al agregar la factura');
    }
  };

  const formik = useFormik({
    initialValues: {
      quotation_id: 1,
      supplier_id: 1,
      issue_date: new Date().toISOString().split('T')[0],
      expiration_date: new Date().toISOString().split('T')[0],
      invoice_number: 1,
      dollar_value: 0,
      total_colon: 0,
      total_dollar: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'productName' && event.target.value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    if (event.target.name === 'availableQuantity' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en el campo de Cantidad disponible');
    }

    if (event.target.name === 'availableQuantity' && event.target.value.length >= 7) {
      event.target.value = event.target.value.slice(0, 6); // Limitar a 6 dígitos
      toast.info('Se ha alcanzado el límite de números permitidos ');
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
          Agregar Inventario
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
