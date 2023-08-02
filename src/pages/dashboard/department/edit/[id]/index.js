/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DashboardLayout from '../../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../../components/settings';
import { AuthContext } from '../../../../../auth/JwtContext';
import RoleBasedGuard from '../../../../../auth/RoleBasedGuard';

const validationSchema = Yup.object().shape({
    department_name: Yup.string()
        .required('El nombre es obligatorio'),
});

const EditDepartment = () => {
    const { accessToken } = useContext(AuthContext);
    const { themeStretch } = useSettingsContext();
    const router = useRouter();
    const { id } = router.query;

    const handleSubmit = (values) => {
        axios
            .patch(`https://control-financiero.herokuapp.com/api/v1/department/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response);
                toast.success('Departamento actualizado con éxito');
                router.push('/dashboard/department/list');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error al actualizar el departamento');
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
            department_name: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (id) {
            // Fetch department data from the API using the provided ID
            axios
                .get(`https://control-financiero.herokuapp.com/api/v1/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    const department = response.data;
                    formik.setValues({
                        department_name: department.department_name,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Error al cargar el departamento');
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, id, formik.setValues]);

    return (
        <RoleBasedGuard roles={['administrator', 'admin', 'superadmin', 'user']} hasContent>
            <Head>
                <title>Editar departamento | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Editar departamento
                </Typography>
            </Container>

            <ToastContainer />

            {/* Formulario de editar departamento */}
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
                                label="Nombre del departamento"
                                name="department_name"
                                value={formik.values.department_name}
                                onChange={handleInputChange}
                                error={
                                    formik.touched.department_name &&
                                    formik.errors.department_name
                                }
                                helperText={
                                    formik.touched.department_name &&
                                    formik.errors.department_name
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
                            >
                                Guardar
                            </Button>
                        </Grid>

                        {/* Botón para volver a la lista de departamentos */}
                        <Grid item xs={12} md={12}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                onClick={() => router.push("/dashboard/department/list")}
                            >
                                Volver a la lista de departamentos
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </RoleBasedGuard>
    );
};

EditDepartment.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditDepartment;
