import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../auth/JwtContext';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre de la aplicación es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    description: Yup.string()
        .required('Descripción de la aplicación es requerida')
        .max(200, 'La descripción debe tener como máximo 200 caracteres'),
    category: Yup.string()
        .required('Categoría de la aplicación es requerida')
        .max(30, 'La categoría debe tener como máximo 30 caracteres'),
    primary_phone_number: Yup.string()
        .required('Número de teléfono es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    secondary_phone_number: Yup.string()
        .required('Número de teléfono es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    city: Yup.string()
        .required('Ciudad es requerida')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    state: Yup.string()
        .required('Estado es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    country: Yup.string()
        .required('País es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    is_active: Yup.boolean().required('Estado es requerido').default(true),

});

export default function CompanyForm() {
    const { accessToken } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            await axios.post('https://control-financiero.herokuapp.com/api/v1/company', values, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
                },
            });
            toast.success('Agregado correctamente al inventario');
            router.push('/dashboard/company/list');
        } catch (error) {
            toast.error('Error al agregar a las aplicaciones');
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            display_name: '',
            description: '',
            is_active: true,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleInputChange = (event) => {
        if (event.target.name === 'name' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'description' && event.target.value.length >= 200) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'category' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'primary_phone_number' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'secondary_phone_number' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'city' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'state' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'country' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'is_active' && event.target.value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }

        formik.handleChange(event);
    };

    return (
        <>
            <Container>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar aplicación
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
                            <TextField
                                fullWidth
                                label="Nombre de la aplicación"
                                name="name"
                                value={formik.values.name}
                                onChange={handleInputChange}
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Descripción de la Compañía"
                                name="description"
                                value={formik.values.description}
                                onChange={handleInputChange}
                                error={formik.touched.description && formik.errors.description}
                                helperText={formik.touched.description && formik.errors.description}
                                inputProps={{
                                    maxLength: 200,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Categoría"
                                name="category"
                                value={formik.values.category}
                                onChange={handleInputChange}
                                error={formik.touched.category && formik.errors.category}
                                helperText={formik.touched.category && formik.errors.category}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Primer número de teléfono"
                                name="primary_phone_number"
                                value={formik.values.primary_phone_number}
                                onChange={handleInputChange}
                                error={formik.touched.primary_phone_number && formik.errors.primary_phone_number}
                                helperText={formik.touched.primary_phone_number && formik.errors.primary_phone_number}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Segundo número de teléfono"
                                name="secondary_phone_number"
                                value={formik.values.secondary_phone_number}
                                onChange={handleInputChange}
                                error={formik.touched.secondary_phone_number && formik.errors.secondary_phone_number}
                                helperText={formik.touched.secondary_phone_number && formik.errors.secondary_phone_number}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                name="email"
                                value={formik.values.email}
                                onChange={handleInputChange}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Ciudad"
                                name="city"
                                value={formik.values.city}
                                onChange={handleInputChange}
                                error={formik.touched.city && formik.errors.city}
                                helperText={formik.touched.city && formik.errors.city}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Estado"
                                name="state"
                                value={formik.values.state}
                                onChange={handleInputChange}
                                error={formik.touched.state && formik.errors.state}
                                helperText={formik.touched.state && formik.errors.state}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="País"
                                name="country"
                                value={formik.values.country}
                                onChange={handleInputChange}
                                error={formik.touched.country && formik.errors.country}
                                helperText={formik.touched.country && formik.errors.country}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>



                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.values.is_active}
                                        onChange={handleInputChange}
                                        name="is_active"
                                        color="primary"
                                    />
                                }
                                label="Activo"
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Button fullWidth size="large" type="submit" variant="contained">
                                Guardar
                            </Button>
                        </Grid>

                        {/* Botón para volver a la lista de aplicaciones */}
                        <Grid item xs={12} md={12}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                onClick={() => router.push("/dashboard/company/list")}
                            >
                                Volver a la lista de aplicaciones
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
