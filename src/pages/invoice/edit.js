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
        toast.success('Factura editada correctamente');
    };

    return (
        <>
            <Head>
                <title> Editar factura | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Editar Factura
                </Typography>
            </Container>

            <ToastContainer />

            
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
                                label="Nombre del cliente"
                                name="name"
                                value={'Nallely Alfaro'}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="address"
                                
                            value={'Av. de los Insurgentes 1234, Col. Insurgentes, CDMX, México'}
                           
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="phone"
                             value={'+52 55 1234 5678'}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                name="email"
                            value={'nallealfaro889@empresa.com'}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Fecha de emisión"
                                name="date"
                            value={'2021-10-10'}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Fecha de vencimiento"
                                name="dueDate"
                             value={'2021-10-10'}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Número de factura"
                                name="invoiceNumber"
                             value={'1234'}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Número de orden"
                                name="orderNumber"
                             value={'1234'}
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
                                onClick={handleSubmit}
                            >
                               Editar factura
                            </Button>
                        </Grid>


                        {/* fin de formulario */}
                    </Grid>
                </Box>
            </Container>



        </>
    );
}
