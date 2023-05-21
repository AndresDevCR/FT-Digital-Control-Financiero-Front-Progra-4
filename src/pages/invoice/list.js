/* eslint-disable no-unused-vars */
// next
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
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

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/invoices')
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    const [invoices, setInvoices] = useState([]);




    return (

        <>
            <Head>
                <title> Lista de Facturas | FT Control Financiero </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
                    Lista de Facturas
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/invoice/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                >
                    Crear Factura
                </Button>

                <TextField
                    fullWidth
                    label="Buscar"
                    name="search"
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                />

                {/* tabla de facturas */}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del cliente</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Correo electrónico</TableCell>
                                <TableCell>Fecha de emisión</TableCell>
                                <TableCell>Fecha de vencimiento</TableCell>
                                <TableCell>Número de factura</TableCell>
                                <TableCell>Número de orden</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.customerName}</TableCell>
                                    <TableCell>{invoice.address}</TableCell>
                                    <TableCell>{invoice.phone}</TableCell>
                                    <TableCell>{invoice.email}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.dueDate}</TableCell>
                                    <TableCell>{invoice.invoiceNumber}</TableCell>
                                    <TableCell>{invoice.orderNumber}</TableCell>
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
