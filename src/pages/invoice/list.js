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
            customerName: 'Juan Perez',
            address: 'Calle 123, Ciudad',
            phone: '555-1234',
            email: 'juan.perez@gmail.com',
            date: '2022-03-15',
            dueDate: '2022-04-15',
            invoiceNumber: 'INV-001',
            orderNumber: 'ORD-001',
        },
        {
            id: 2,
            customerName: 'Maria Rodriguez',
            address: 'Avenida 456, Ciudad',
            phone: '555-5678',
            email: 'maria.rodriguez@gmail.com',
            date: '2022-03-20',
            dueDate: '2022-04-20',
            invoiceNumber: 'INV-002',
            orderNumber: 'ORD-002',
        },
        {
            id: 3,
            customerName: 'Pedro Gomez',
            address: 'Calle 789, Ciudad',
            phone: '555-9012',
            email: 'pedro.gomez@gmail.com',
            date: '2022-03-25',
            dueDate: '2022-04-25',
            invoiceNumber: 'INV-003',
            orderNumber: 'ORD-003',
        },
        {
            id: 4,
            customerName: 'Luisa Lopez',
            address: 'Avenida 101, Ciudad',
            phone: '555-3456',
            email: 'matthew.thomas567@yahoo.com',
            date: '2022-03-30',
            dueDate: '2022-04-30',
            invoiceNumber: 'INV-004',
            orderNumber: 'ORD-004',
        },
        {
            id: 5,
            customerName: 'Jose Martinez',
            address: 'Calle 112, Ciudad',
            phone: '555-7890',
            email: 'jason.robinson123@yahoo.com',
            date: '2022-04-05',
            dueDate: '2022-05-05',
            invoiceNumber: 'INV-005',
            orderNumber: 'ORD-005',
        },
        {
            id: 6,
            customerName: 'Carlos Sanchez',
            address: 'Avenida 131, Ciudad',
            phone: '555-1212',
            email: 'kate.wilson456@outlook.com',
            date: '2022-04-10',
            dueDate: '2022-05-10',
            invoiceNumber: 'INV-006',
            orderNumber: 'ORD-006',
        },
        {
            id: 7,
            customerName: 'Maria Garcia',
            address: 'Calle 151, Ciudad',
            phone: '555-5656',
            email: 'andrew.scott234@gmail.com',
            date: '2022-04-15',
            dueDate: '2022-05-15',
            invoiceNumber: 'INV-007',
            orderNumber: 'ORD-007',
        },
        {
            id: 8,
            customerName: 'Luisa Lopez',
            address: 'Avenida 101, Ciudad',
            phone: '555-3456',
            email: 'sarah.green234@outlook.com',
            date: '2022-03-30',
            dueDate: '2022-04-30',
            invoiceNumber: 'INV-004',
            orderNumber: 'ORD-004',
        },
        {
            id: 9,
            customerName: 'Jose Martinez',
            address: 'Calle 112, Ciudad',
            phone: '555-7890',
            email: 'jenny.smith567@hotmail.com',
            date: '2022-04-05',
            dueDate: '2022-05-05',
            invoiceNumber: 'INV-005',
            orderNumber: 'ORD-005',
        },
        {
            id: 10,
            customerName: 'Carlos Sanchez',
            address: 'Avenida 131, Ciudad',
            phone: '555-1212',
            email: 'patito.thomas567@yahoo.com',
            date: '2022-04-10',
            dueDate: '2022-05-10',
            invoiceNumber: 'INV-006',
            orderNumber: 'ORD-006',
        },
        {
            id: 11,
            customerName: 'Maria Garcia',
            address: 'Calle 151, Ciudad',
            phone: '555-5656',
            email: 'john.doe123@gmail.com',
            date: '2022-04-15',
            dueDate: '2022-05-15',
            invoiceNumber: 'INV-007',
            orderNumber: 'ORD-007',
        },
    ]);




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
                            {invoices.map((invoice) => (
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
