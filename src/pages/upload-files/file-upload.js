// next
import Head from 'next/head';
import { Container, Typography, Box, Button } from '@mui/material';

// layouts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import DropZone from '../../components/drop-zone/DropZone';

// ----------------------------------------------------------------------

FileUpload.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FileUpload() {
    const { themeStretch } = useSettingsContext();


    return (
        <>
            <Head>
                <title> Agregar Archivo | FT Control Financiero</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Agregar Archivo
                </Typography>
            </Container>

            <ToastContainer />


            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
                    <DropZone />
                </Box>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Subir Archivo
                </Button>


            </Container>



        </>
    );
}
