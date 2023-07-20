import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../../auth/JwtContext';
import DashboardLayout from '../../../../../layouts/dashboard';

EditRolePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .max(30, 'El nombre debe tener como máximo 30 caracteres'),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .max(100, 'La descripción debe tener como máximo 100 caracteres'),
});

export default function EditRolePage() {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la URL

  const handleSubmit = async (values) => {
    try {
      await axios.patch(`https://control-financiero.herokuapp.com/api/v1/role/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      toast.success('Rol editado correctamente');
      router.push('/dashboard/roles/list'); 
    } catch (error) {
      toast.error('Error al editar el rol');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value.length >= 30) {
      toast.info('Se ha alcanzado el límite de caracteres permitidos');
    }

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    // Aquí puedes realizar una petición para obtener los datos del rol con el ID proporcionado y llenar el formulario con esos datos
    const fetchRole = async () => {
      try {
        const response = await axios.get(`https://control-financiero.herokuapp.com/api/v1/role/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const role = response.data;
        formik.setValues({
          name: role.name,
          description: role.description,
        });
      } catch (error) {
        toast.error('Error al obtener los datos del rol');
      }
    };

    if (id) {
      fetchRole();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, id]);

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Editar Rol
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
                label="Nombre del rol"
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
                label="Descripción del rol"
                name="description"
                value={formik.values.description}
                onChange={handleInputChange}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                inputProps={{
                  maxLength: 100,
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>

            {/* Botón para volver a la lista de roles */}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => router.push("/dashboard/roles/list")}
              >
                Volver a la lista de roles
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

