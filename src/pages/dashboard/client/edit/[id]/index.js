/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../../auth/JwtContext';
import DashboardLayout from '../../../../../layouts/dashboard';
import RoleBasedGuard from '../../../../../auth/RoleBasedGuard';

EditClientForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
    client_name: Yup.string()
        .required('Nombre del cliente es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    phone: Yup.string()
        .required('Número de teléfono es requerido')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    email: Yup.string()
    .required('El correo es requerido')
    .max(70, 'El correo debe tener como máximo 70 caracteres')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'El correo electrónico ingresado no tiene un formato válido'
    ),
    address: Yup.string()
        .required('Dirección es requerida')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
    enterprise_id: Yup.number().required('ID de la empresa es requerido'),
});
export default function EditClientForm() {
    const { accessToken } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const [enterprises, setEnterprises] = useState([]);
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get(
                    `https://control-financiero.herokuapp.com/api/v1/client/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const client = response.data;
                setClientData(client);
                formik.setValues({
                    client_name: client.client_name,
                    phone: client.phone,
                    email: client.email,
                    address: client.address,
                    enterprise_id: client.enterprise_id,
                });
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, id]);

    useEffect(() => {
        const fetchEnterprises = async () => {
            try {
                const response = await axios.get(
                    'https://control-financiero.herokuapp.com/api/v1/enterprise',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setEnterprises(response.data);
            } catch (error) {
                console.error('Error fetching enterprises:', error);
            }
        };

        fetchEnterprises();
    }, [accessToken]);

    const handleSubmit = async (values) => {
        try {
            await axios.patch(
                `https://control-financiero.herokuapp.com/api/v1/client/${id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            toast.success('Cliente editado exitosamente');
            router.push('/dashboard/client/list');
        } catch (error) {
            toast.error('Error al editar cliente');
        }
    };

    const formik = useFormik({
        initialValues: {
            client_name: '',
            phone: '',
            email: '',
            address: '',
            enterprise_id: 0,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'client_name' && value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }

        if (name === 'phone' && value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }
        if (event.target.name === 'phone' && !/^\d+$/.test(event.target.value)) {
            toast.error('Solo se permiten números en este campo');
        }

        if (name === 'email' && value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }

        if (name === 'address' && value.length >= 30) {
            toast.info('Se ha alcanzado el límite de caracteres permitidos');
        }

        formik.handleChange(event);
    };

    if (!clientData) {
        return <div>Loading...</div>;
    }

    return (
        <RoleBasedGuard roles={['administrator','user','admin','superadmin']} hasContent>
            <Container>
                <Typography variant="h3" component="h1" paragraph>
                    Editar Cliente
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
                                label="Nombre del cliente"
                                name="client_name"
                                value={formik.values.client_name}
                                onChange={handleInputChange}
                                error={formik.touched.client_name && formik.errors.client_name}
                                helperText={formik.touched.client_name && formik.errors.client_name}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Número de teléfono"
                                name="phone"
                                value={formik.values.phone}
                                onChange={handleInputChange}
                                error={formik.touched.phone && formik.errors.phone}
                                helperText={formik.touched.phone && formik.errors.phone}
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
                                label="Dirección"
                                name="address"
                                value={formik.values.address}
                                onChange={handleInputChange}
                                error={formik.touched.address && formik.errors.address}
                                helperText={formik.touched.address && formik.errors.address}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="enterprise-label">Empresa</InputLabel>
                                <Select
                                    labelId="enterprise-label"
                                    id="enterprise_id"
                                    name="enterprise_id"
                                    value={formik.values.enterprise_id}
                                    onChange={formik.handleChange}
                                    error={formik.touched.enterprise_id && formik.errors.enterprise_id}
                                    fullWidth
                                >
                                    {enterprises.map((enterprise) => (
                                        <MenuItem key={enterprise.id} value={enterprise.id}>
                                            {enterprise.enterprise_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Button fullWidth size="large" type="submit" variant="contained">
                                Guardar
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                onClick={() => router.push('/dashboard/client/list')}
                            >
                                Volver a la lista de clientes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            </RoleBasedGuard>
        
    );
}