// next
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// ----------------------------------------------------------------------

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Invoice() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title> Agregar Factura | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar Factura
                </Typography>
            </Container>

            {/* formulario de agregar factura */}
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ mt: 3 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nombre del cliente"
                            name="name"
                        // value={name}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            name="address"
                        // value={address}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                        // value={phone}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            name="email"
                        // value={email}
                        // onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Fecha de emisión"
                            name="date"
                        // value={date}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Fecha de vencimiento"
                            name="dueDate"
                        // value={dueDate}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Número de factura"
                            name="invoiceNumber"
                        // value={invoiceNumber}
                        // onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Número de orden"
                            name="orderNumber"
                        // value={orderNumber}
                        // onChange={handleChange}
                        />
                    </Grid>

                    {/* boton del formulario */}
                    <Grid item xs={12} md={12}>
                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Agregar Factura
                        </Button>
                    </Grid>


                    {/* fin de formulario */}
                </Grid>
            </Box>



        </>
    );
}
