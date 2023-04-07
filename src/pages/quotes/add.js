// next
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

// layouts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Invoice() {
    const { themeStretch } = useSettingsContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Cotización agregada correctamente');
    };

    return (
        <>
            <Head>
                <title>Agregar Cotización | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar Cotización
                </Typography>
            </Container>

            <ToastContainer />

            {/* Formulario de agregar cotización */}
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
                                label="Fecha de cotización"
                                name="quoteDate"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Número de cotización"
                                name="quoteNumber"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Cliente"
                                name="customerName"
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Producto o servicio"
                                name="productName"
                                multiline
                                minRows={2}
                                maxRows={5}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Cantidad"
                                name="quantity"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Precio unitario"
                                name="unitPrice"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Descuento (%)"
                                name="quoteDiscount"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Impuestos"
                                name="quoteTaxes"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h2" paragraph>
                                Subtotal
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h2" paragraph>
                                {/* Subtotal de la cotización (cálculo a partir de los campos anteriores) */}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h2" paragraph>
                                Total
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h2" paragraph>
                                {/* Total de la cotización (cálculo a partir de los campos anteriores) */}
                            </Typography>
                        </Grid>

                        {/* Botón del formulario */}
                        <Grid item xs={12} md={12}>
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}