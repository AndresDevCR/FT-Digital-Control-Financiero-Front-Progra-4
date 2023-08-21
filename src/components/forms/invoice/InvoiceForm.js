import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { useSnackbar } from 'notistack';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
  invoice_number: Yup.string().required('Número de factura es requerido'),
  dollar_value: Yup.number()
    .required('Valor requerido')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  total_colon: Yup.number()
    .required('Valor requerido')
    .max(999999, 'La cantidad debe tener como máximo 999,999'),
  total_dollar: Yup.number().required('Valor requerido'),
  issue_date: Yup.date().required('Fecha de ingreso es requerida'),
  expiration_date: Yup.date().required('Fecha de ingreso es requerida'),
});

export default function InvoiceForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [quotations, setQuotations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/quotation',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setQuotations(response.data);
      } catch (error) {
        enqueueSnackbar('Error al cargar cotizaciones', { variant: 'error' });
      }
    };

    fetchQuotations();
  }, [accessToken, enqueueSnackbar]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          'https://control-financiero.herokuapp.com/api/v1/supplier',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSuppliers(response.data);
      } catch (error) {
        enqueueSnackbar('Error al cargar proveedores', { variant: 'error' });
      }
    };

    fetchSuppliers();
  }, [accessToken, enqueueSnackbar]);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post('https://control-financiero.herokuapp.com/api/v1/invoice', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      console.log(response);
      if (response.status === 201) {
        enqueueSnackbar('Factura agregada correctamente', { variant: 'success' });
        router.push('/invoice');
      }
    } catch (error) {
      enqueueSnackbar('Error al agregar factura', { variant: 'error' });
    }

  };

  const formik = useFormik({
    initialValues: {
      quotation_id: 1,
      supplier_id: 1,
      issue_date: new Date().toISOString().split('T')[0],
      expiration_date: new Date().toISOString().split('T')[0],
      invoice_number: 0,
      dollar_value: 0,
      total_colon: 0,
      total_dollar: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'invoice_number' && event.target.value.length >= 30) {
      enqueueSnackbar('Se ha alcanzado el límite de caracteres permitidos ', {
        variant: 'info',
      });
    }

    if (event.target.name === 'dollar_value' && !/^\d+$/.test(event.target.value)) {
      enqueueSnackbar('Solo se permiten números', { variant: 'info' });
    }

    if (event.target.name === 'total_colon' && event.target.value.length >= 15) {
      event.target.value = event.target.value.slice(0, 15);
      enqueueSnackbar('Se ha alcanzado el límite de números permitidos ', {
        variant: 'info',
      });
    }
    if (event.target.name === 'total_dollar' && event.target.value.length >= 15) {
      event.target.value = event.target.value.slice(0, 15);
      enqueueSnackbar('Se ha alcanzado el límite de números permitidos ', {
        variant: 'info',
      });
    }

    formik.handleChange(event);
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Agregar Factura
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
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="quotation_label" style={{ marginTop: '10px' }}>
                  Cotización
                </InputLabel>
                <Select
                  labelId="quotation_label"
                  id="quotation"
                  name="quotation_id"
                  value={formik.values.quotation_id}
                  onChange={formik.handleChange}
                  error={formik.touched.quotation_id && formik.errors.quotation_id}
                  fullWidth
                >
                  {quotations.map((quotation) => (
                    <MenuItem key={quotation.id} value={quotation.id}>
                      {quotation.e_invoice_code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="supplier_label" style={{ marginTop: '10px' }}>
                  Proveedor
                </InputLabel>
                <Select
                  labelId="supplier_label"
                  id="supplier"
                  name="supplier_id"
                  value={formik.values.supplier_id}
                  onChange={formik.handleChange}
                  error={formik.touched.supplier_id && formik.errors.supplier_id}
                  fullWidth
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      {supplier.supplier_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de emisión"
                name="issue_date"
                type="date"
                value={formik.values.issue_date}
                onChange={formik.handleChange}
                error={formik.touched.issue_date && formik.errors.issue_date}
                helperText={formik.touched.issue_date && formik.errors.issue_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de expiración"
                name="expiration_date"
                type="date"
                value={formik.values.expiration_date}
                onChange={formik.handleChange}
                error={formik.touched.expiration_date && formik.errors.expiration_date}
                helperText={formik.touched.expiration_date && formik.errors.expiration_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Numero de factura"
                name="invoice_number"
                type="number"
                value={formik.values.invoice_number}
                onChange={handleInputChange}
                error={formik.touched.invoice_number && formik.errors.invoice_number}
                helperText={formik.touched.invoice_number && formik.errors.invoice_number}
                inputProps={{
                  maxLength: 30,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Valor del dólar"
                name="dollar_value"
                type="number"
                value={formik.values.dollar_value}
                onChange={handleInputChange}
                error={formik.touched.dollar_value && formik.errors.dollar_value}
                helperText={formik.touched.dollar_value && formik.errors.dollar_value}
                inputProps={{
                  maxLength: 15,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total en colones"
                name="total_colon"
                type="number"
                value={formik.values.total_colon}
                onChange={handleInputChange}
                error={formik.touched.total_colon && formik.errors.total_colon}
                helperText={formik.touched.total_colon && formik.errors.total_colon}
                inputProps={{
                  maxLength: 15,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total en dólares"
                name="total_dollar"
                type="number"
                value={formik.values.total_dollar}
                onChange={handleInputChange}
                error={formik.touched.total_dollar && formik.errors.total_dollar}
                helperText={formik.touched.total_dollar && formik.errors.total_dollar}
                inputProps={{
                  maxLength: 15,
                }}
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
                onClick={() => router.push('/invoice')}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver a la lista de facturas
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
