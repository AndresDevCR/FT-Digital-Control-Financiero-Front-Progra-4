// next
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// ----------------------------------------------------------------------

HrAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function HrAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title> Agregar Empleado | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar Empleado
                </Typography>
            </Container>

            {/* formulario de agregar factura */}
            <Container maxWidth={themeStretch ? false : 'xl'}>
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
                                label="Nombre del empleado"
                                name="name"
                            // value={name}
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
                                label="Fecha de ingreso"
                                name="date"
                            // value={date}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Salario"
                                name="salary"
                            // value={salary}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Cargo"
                                name="position"
                            // value={position}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Departamento"
                                name="department"
                            // value={department}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Horario"
                                name="schedule"
                            // value={schedule}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Días de descanso"
                                name="restDays"
                            // value={restDays}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Días de vacaciones"
                                name="vacationDays"
                            // value={vacationDays}
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
