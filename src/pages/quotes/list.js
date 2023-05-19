/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import Head from 'next/head';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
// import { IconButton, TableFooter } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';


function MyTable() {
    const { themeStretch } = useSettingsContext();
    const [quotes, setQuotes] = useState([
        {
            id: 1,
            quoteNumber: 'Q-0001',
            client: 'Empresa XYZ',
            product: 'Desarrollo de aplicación móvil',
            date: '2022-12-15',
            total: '$10,000.00',
        },
        {
            id: 2,
            quoteNumber: 'Q-0002',
            client: 'Negocio ABC',
            product: 'Desarrollo de página web',
            date: '2023-01-10',
            total: '$5,000.00',
        },
        {
            id: 3,
            quoteNumber: 'Q-0003',
            client: 'Compañía 123',
            product: 'Servicio de consultoría',
            date: '2022-11-11',
            total: '$3,000.00',
        },
        {
            id: 4,
            quoteNumber: 'Q-0004',
            client: 'Empresa XYZ',
            product: 'Desarrollo de software personalizado',
            date: '2022-11-11',
            total: '$15,000.00',
        },
        {
            id: 5,
            quoteNumber: 'Q-0005',
            client: 'Negocio ABC',
            product: 'Diseño de identidad de marca',
            date: '2023-02-25',
            total: '$2,500.00',
        },
    ]);
    const [rows, setRows] = useState(quotes);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRows = quotes.filter((row) =>
            row.client.toLowerCase().includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Head>
                <title> Lista de Cotizaciones | FT Control Financiero </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
                    Lista de Cotizaciones
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/quotes/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                >
                    Agregar Cotización
                </Button>

                <TextField
                    id="search"
                    label="Buscar por cliente"
                    onChange={handleSearch}
                    sx={{ width: '300px', mb: 3 }}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Número de Cotización</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Producto/Servicio</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell align="center">Total</TableCell>                          
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.quoteNumber}</TableCell>
                                    <TableCell>{row.client}</TableCell>
                                    <TableCell>{row.product}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                               
                                    <TableCell>
                                        <div>
                                            <Button
                                                color="secondary"
                                                component={Link}
                                                href="/quotes/list"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"

                                            >
                                                Ver
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                component={Link}
                                                href="/quotes/edit"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"
                                            >
                                                Editar
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                style={{ backgroundColor: "red" }}
                                                component={Link}
                                                href="/quotes/list"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}
function QuotesPage() {
    return (
        <DashboardLayout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MyTable />
                    </Grid>
                </Grid>
            </Box>
        </DashboardLayout>
    );
}

export default QuotesPage;
