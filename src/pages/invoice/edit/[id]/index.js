/* eslint-disable no-unused-vars */
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
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';
import DashboardLayout from '../../../../layouts/dashboard';

EditInvoiceForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

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
export default function EditInvoiceForm() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [quotations, setQuotations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [invoiceData, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(
          `https://control-financiero.herokuapp.com/api/v1/invoice/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const invoice = response.data;
        setInvoice(invoice);
        formik.setValues({
          quotation_id: invoice.quotation_id,
          supplier_id: invoice.supplier_id,
          issue_date: invoice.issue_date.split('T')[0],
          expiration_date: invoice.expiration_date.split('T')[0],
          invoice_number: invoice.invoice_number,
          dollar_value: invoice.dollar_value,
          total_colon: invoice.total_colon,
          total_dollar: invoice.total_dollar,
        });
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

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
        console.error('Error fetching quotations:', error);
      }
    };

    fetchQuotations();
  }, [accessToken]);

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
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, [accessToken]);

  const handleSubmit = async (values) => {
    try {
      await axios.patch(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success('Factura editada exitosamente');
      router.push('/invoice/list');
    } catch (error) {
      toast.error('Error al editar factura');
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
    const { name, value } = event.target;

    if (event.target.name === 'supplier_id' && !/^\d+$/.test(event.target.value)) {
      toast.error('Solo se permiten números en el campo de Id del proveedor');
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

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Editar Factura
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
              <FormControl fullWidth>
                <InputLabel id="quotation_label">Cotización</InputLabel>
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
                <InputLabel id="supplier_label">Proveedor</InputLabel>
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
              <Button fullWidth size="large" type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push('/invoice/list')}
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
