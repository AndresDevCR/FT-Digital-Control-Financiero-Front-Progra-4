// next
import Head from 'next/head';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

// layouts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import DropZone from 'src/components/drop-zone/DropZone';

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
                <Box
                 
                >
                    <DropZone />
                </Box>
              <Button variant="contained" color="primary" sx={{ mt: 3, ml: 1 }}>
               Subir Archivo
                </Button>
                

            </Container>



        </>
    );
}
