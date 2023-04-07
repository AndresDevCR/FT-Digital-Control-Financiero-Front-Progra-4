// next
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// layouts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../../layouts/dashboard';

// components
import { useSettingsContext } from '../../../components/settings';

// ----------------------------------------------------------------------

Invoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Invoice() {

    const { themeStretch } = useSettingsContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Usuario agregado correctamente');
    };

    return (
        <>
            <Head>
                <title>Agregar Usuario | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar Usuario
                </Typography>
            </Container>

            <ToastContainer />

            {/* Formulario para agregar un usuario */}
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
                            <TextField fullWidth label="Nombre" name="userName" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Correo Electrónico" name="userEmail" type="email" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Teléfono" name="userNumber" type="tel" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Identificación" name="userIdentification" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-job-label">Puesto</InputLabel>
                                <Select labelId="user-job-label" label="Puesto" name="userJob">
                                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                                    <MenuItem value="Back-End Developer">Back-End Developer</MenuItem>
                                    <MenuItem value="Front-End Developer">Front-End Developer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-role-label">Rol</InputLabel>
                                <Select labelId="user-role-label" label="Rol" name="userRole">
                                    <MenuItem value="Usuario">Usuario</MenuItem>
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-status-label">Estado</InputLabel>
                                <Select labelId="user-status-label" label="Estado" name="userStatus">
                                    <MenuItem value="Activo">Activo</MenuItem>
                                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Botón para guardar el usuario */}
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
                        </Grid                      >
                    </Grid>
                </Box>
            </Container>

        </>
    );
}
