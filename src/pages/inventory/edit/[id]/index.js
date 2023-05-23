import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';

const EditInvoice = () => {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  const [productName, setProductName] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [entryDate, setEntryDate] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch invoice data from the API using the provided ID
      axios
        .get(`/inventory/${id}`)
        .then((response) => {
          const invoice = response.data;
          setProductName(invoice.productName);
          setAvailableQuantity(invoice.availableQuantity);
          setDescription(invoice.description);
          setEntryDate(invoice.entryDate);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error al cargar el inventario');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3011/api/v1/inventory/${id}`, {
        productName,
        availableQuantity,
        description,
        entryDate
      })
      .then((response) => {
        console.log(response);
        toast.success('Inventario actualizado con éxito');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al actualizar el inventario');
      });
      router.push('/inventory');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'availableQuantity') {
      setAvailableQuantity(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'entryDate') {
      setEntryDate(value);
    }
  };

  return (
    <>
      <Head>
        <title>Editar Inventario | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Editar Inventario
        </Typography>
      </Container>

      <ToastContainer />

      {/* Formulario de editar Inventario */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del producto/servicio"
                name="productName"
                value={productName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cantidad disponible"
                name="availableQuantity"
                type="number"
                value={availableQuantity}
                onChange={handleInputChange}
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
                value={description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de ingreso"
                name="entryDate"
                type="date"
                value={entryDate}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Botón del formulario */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

EditInvoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditInvoice;
