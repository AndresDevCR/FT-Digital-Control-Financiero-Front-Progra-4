// next
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// ----------------------------------------------------------------------

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


function MyTable() {
    const { themeStretch } = useSettingsContext();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRows = rows.filter((row) =>
            row.name.toLowerCase().includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [invoices, setInvoices] = useState([
        {
            id: 1,
            inventoryName: 'Computadora Macbook',
            inventoryQty: '4',
            inventoryDescription: 'Laptop Macbook para empleados',
            inventoryDate: '2022-12-15',
        },
        {
            id: 2,
            inventoryName: 'Monitor Aoc',
            inventoryQty: '8',
            inventoryDescription: 'Monitor de 24 pulgadas',
            inventoryDate: '2023-01-10',
        },
        {
            id: 3,
            inventoryName: 'Teclado Logitech',
            inventoryQty: '5',
            inventoryDescription: 'teclado USB',
            inventoryDate: '2022-11-11',
        },
        {
            id: 4,
            inventoryName: 'Headset Microsoft',
            inventoryQty: '7',
            inventoryDescription: 'Audifonos de diadema con microfono USB',
            inventoryDate: '2022-11-11',
        },
        {
            id: 5,
            inventoryName: 'Mouse Logitech',
            inventoryQty: '3',
            inventoryDescription: 'Mouse USB',
            inventoryDate: '2023-02-25',
        },
        {
            id: 6,
            inventoryName: 'Desarrollo de página web',
            inventoryQty: '2',
            inventoryDescription: 'Desarrollo de una página web para un negocio E-Commerce',
            inventoryDate: '2022-10-08',
        },
        {
            id: 7,
            inventoryName: 'Desarrollo de base de datos',
            inventoryQty: '1',
            inventoryDescription: 'Desarrollo de una base de datos para un negoocio E-Commerce',
            inventoryDate: '2022-11-03',
        },
    ]);




    return (

        <>
            <Head>
                <title> Lista de Inventario | FT Control Financiero </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
                    Lista de Inventario
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/inventory/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                >
                    Crear Inventario
                </Button>

                <TextField
                    fullWidth
                    label="Buscar"
                    name="search"
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                />

                {/* tabla de inventario */}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del producto/servicio</TableCell>
                                <TableCell>Cantidad disponible</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Fecha de ingreso</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.inventoryName}</TableCell>
                                    <TableCell>{invoice.inventoryQty}</TableCell>
                                    <TableCell>{invoice.inventoryDescription}</TableCell>
                                    <TableCell>{invoice.inventoryDate}</TableCell>
                                    <TableCell style={{margin: 1}}>
                                    <div>
                                        <Button
                                            color="secondary"
                                            component={Link}
                                            href="/inventory/edit"
                                            size="small"
                                            sx={{ mb: 2 }}
                                            variant="contained"                                           
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            color="primary"
                                            component={Link}
                                            href="/inventory/list"
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
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Container>

        </>
    );
}

export default MyTable;
