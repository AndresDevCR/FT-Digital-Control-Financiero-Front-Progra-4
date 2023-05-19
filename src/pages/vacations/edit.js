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
        toast.success('Datos actualizados');
    };

    return (
        <>
            <Head>
                <title> Editar Solicitud | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Editar solicitud de vacaciones
                </Typography>
            </Container>

            <ToastContainer />

            {/* formulario de editar Inventario */}
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
                                name="vacationsName"
                                value="Juan Perez"
                                label="Nombre"
                                InputLabelProps={{ shrink: true }} 
                            // value={name}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="inventoryQty"
                                value="8"
                                label="Cantidad disponible"
                                InputLabelProps={{ shrink: true }} 
                            // value={name}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Fecha de inicio"
                                name="vacationsStartDate"
                                value="2023-04-03"
                                InputLabelProps={{ shrink: true }} 
                            // value={address}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Fecha de reingreso"
                                name="vacationsEndDate"
                                value="2023-04-05"
                                InputLabelProps={{ shrink: true }} 
                            // value={date}
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
                                Guardar
                            </Button>
                        </Grid>


                        {/* fin de formulario */}
                    </Grid>
                </Box>
            </Container>



        </>
    );
}
