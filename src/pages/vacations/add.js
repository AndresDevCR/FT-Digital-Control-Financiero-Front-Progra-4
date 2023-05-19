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
        toast.success('Solicitud enviada');
    };

    return (
        <>
            <Head>
                <title> Solicitar vacaciones | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Solicitar vacaciones
                </Typography>
            </Container>

            <ToastContainer />

            {/* formulario de solicitar vacaciones */}
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
                                InputProps={{
                                    readOnly: true,
                                }}
                                label="Nombre"
                                InputLabelProps={{ shrink: true }} 
                                
                            // value={name}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="vacationsQty"
                                value="6"
                                InputProps={{
                                    readOnly: true,
                                }}
                                label="Cantidad Disponible"
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
                            // value={address}
                            // onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Fecha de reintegro"
                                name="vacationsEndDate"
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
