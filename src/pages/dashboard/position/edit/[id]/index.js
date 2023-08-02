/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DashboardLayout from '../../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../../components/settings';
import { AuthContext } from '../../../../../auth/JwtContext';
import RoleBasedGuard from '../../../../../auth/RoleBasedGuard';

const validationSchema = Yup.object().shape({
    position_name: Yup.string()
        .required('El titulo del puesto es obligatorio'),
});

const EditPosition = () => {
    const { accessToken } = useContext(AuthContext);
    const { themeStretch } = useSettingsContext();
    const router = useRouter();
    const { id } = router.query;

    const handleSubmit = (values) => {
        axios
            .patch(`https://control-financiero.herokuapp.com/api/v1/position/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response);
                toast.success('Puesto actualizado con éxito');
                router.push('/dashboard/position/list');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error al actualizar el Puesto');
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }

        formik.setFieldValue(name, value);
    };

    const formik = useFormik({
        initialValues: {
            position_name: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (id) {
            // Fetch position data from the API using the provided ID
            axios
                .get(`https://control-financiero.herokuapp.com/api/v1/position/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    const position = response.data;
                    formik.setValues({
                        position_name: position.position_name,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Error al cargar el puesto');
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, id, formik.setValues]);

    return (
        <>
            <Head>
                <title>Editar Puesto | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Editar Puesto
                </Typography>
            </Container>

            <ToastContainer />

            {/* Formulario de editar Empresa */}
            <Container maxWidth={themeStretch ? false : 'xl'}>
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
                                label="Titulo del puesto"
                                name="position_name"
                                value={formik.values.position_name}
                                onChange={handleInputChange}
                                error={
                                    formik.touched.position_name &&
                                    formik.errors.position_name
                                }
                                helperText={
                                    formik.touched.position_name &&
                                    formik.errors.position_name
                                }
                                inputProps={{
                                    maxLength: 30,
                                }}
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
                                startIcon={<SaveIcon />}
                            >
                                Guardar
                            </Button>
                        </Grid>

                        {/* Botón para volver a la lista de Empresas */}
                        <Grid item xs={12} md={12}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                onClick={() => router.push("/dashboard/position/list")}
                                startIcon={<KeyboardBackspaceIcon />}
                            >
                                Volver a la lista de Puestos
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

EditPosition.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditPosition;
