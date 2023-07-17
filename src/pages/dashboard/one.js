// next
import Head from 'next/head';
import { Container, Typography, Grid } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { CardComponent } from '../../components/card/cardComponent';
// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Control Financiero | Dashboard</title>
      </Head>

      <Container
        sx={{
          py: 10,
          maxWidth: 'container.xl',
          margin: 'auto',
          textAlign: 'center',
        }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Typography variant="h3" paragraph>
          Dashboard
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Bienvenido al dashboard de Control Financiero
        </Typography>

        <Grid container spacing={5} sx={{ mt: 5, mb: 10 }} justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Pagos"
              description="Pagos de empleados"
              image="https://inbound.actualizaweb.com/hs-fs/hubfs/20180711-actualiza-web-Aprende-como-recibir-pagos-en-tu-tienda-online/Actualiza%20Web,%20como%20aceptar%20pagos%20en%20linea.jpg?width=1382&name=Actualiza%20Web,%20como%20aceptar%20pagos%20en%20linea.jpg"
              url="/payments/list"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Inventario"
              description="Inventario de productos"
              image="https://concepto.de/wp-content/uploads/2015/04/inventario-e1548898364548.jpg"
              url="/inventory/list"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Vacaciones"
              description="Vacaciones de empleados"
              image="https://images.telediario.cr/I1E0u4Y80vYyX3TFiFX0oOR7FPM=/345x215/uploads/media/2023/05/19/estas-son-parte-del-calendario.jpg"
              url="/vacations/list"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Cotizaciones"
              description="Cotizaciones de productos"
              image="https://tipsynoticias.com/wp-content/uploads/2021/04/plantillas.jpeg"
              url="/quotations/list"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Facturas"
              description="Facturas de la empresa"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9OOmpQfNNIKMUWzEXynew-27-BHyupWt6VA&usqp=CAU"
              url="/invoice"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardComponent
              title="Empleados"
              description="Empleados de la empresa"
              image="https://www.cucorent.com/blog/wp-content/uploads/2022/05/fortaleza-empleados.jpg"
              url="/dashboard/employee/list"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
