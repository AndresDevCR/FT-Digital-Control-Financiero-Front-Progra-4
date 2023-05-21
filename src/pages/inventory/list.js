/* eslint-disable no-unused-vars */
// next
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3011/api/v1/inventory')
            .then((response) => {
                setInvoices(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3011/api/v1/inventory/${id}`)
            .then((response) => {
                const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);
                setInvoices(filteredInvoices);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.productName}</TableCell>
                                    <TableCell>{invoice.availableQuantity}</TableCell>
                                    <TableCell>{invoice.description}</TableCell>
                                    <TableCell>{invoice.entryDate}</TableCell>
                                    <TableCell style={{ margin: 1 }}>
                                        <div>
                                            <Button
                                                color="secondary"
                                                component={Link}
                                                href={`/inventory/edit?id=${invoice.id}`}
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
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"
                                                onClick={() => handleDelete(invoice.id)}
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
                        count={invoices.length}
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
