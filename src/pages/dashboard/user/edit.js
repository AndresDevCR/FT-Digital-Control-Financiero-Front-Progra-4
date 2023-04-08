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
        toast.success('Datos actualizados');
    };

    return (
        <>
            <Head>
                <title>Editar Usuario | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Editar Usuario
                </Typography>
            </Container>

            <ToastContainer />

            {/* Formulario para editar un usuario */}
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
                            <TextField fullWidth label="Nombre" name="userName" defaultValue="David Cardenas Orozco"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Correo Electrónico" name="userEmail" type="email"  defaultValue="dcardenas90058@ufide.ac.cr" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Contraseña" name="userPassword" type="password" defaultValue="1234"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Teléfono" name="userNumber" type="tel"  defaultValue="72554567" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Identificación" name="userIdentification" defaultValue="118790058" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-job-label">Puesto</InputLabel>
                                <Select labelId="user-job-label" label="Puesto" name="userJob"  defaultValue="Full Stack Developer">
                                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                                    <MenuItem value="Back-End Developer">Back-End Developer</MenuItem>
                                    <MenuItem value="Front-End Developer">Front-End Developer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-role-label">Rol</InputLabel>
                                <Select labelId="user-role-label" label="Rol" name="userRole" defaultValue="Administrador">
                                    <MenuItem value="Usuario">Usuario</MenuItem>
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="user-status-label">Estado</InputLabel>
                                <Select labelId="user-status-label" label="Estado" name="userStatus" defaultValue="Activo">
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