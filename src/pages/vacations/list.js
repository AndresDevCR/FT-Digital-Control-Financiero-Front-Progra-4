/* eslint-disable no-unused-vars */
// next
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography,TextField, Button, TablePagination } from '@mui/material';
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
            vacationsName: 'Juan Perez',
            vacationsQty: '8',
            vacationsStartDate: '2023-04-03',
            vacationsEndDate: '2023-04-05',
            vacationsStatus: 'Aprobado',
        },
        {
            id: 1,
            vacationsName: 'Maria Rodriguez',
            vacationsQty: '4',
            vacationsStartDate: '2023-04-11',
            vacationsEndDate: '2023-04-12',
            vacationsStatus: 'Esperando Solicitud',
        },
    ]);




    return (

        <>
            <Head>
                <title> Lista de Vacaciones | FT Control Financiero </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
                    Lista de Vacaciones
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/vacations/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                >
                    Solicitar vacaciones
                </Button>

                <TextField
                    fullWidth
                    label="Buscar"
                    name="search"
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                />

                {/* tabla de vacaciones */}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del Empleado</TableCell>
                                <TableCell>Cantidad disponible</TableCell>
                                <TableCell>Fecha de inicio</TableCell>
                                <TableCell>Fecha de reingreso</TableCell>
                                <TableCell>Estado de solicitud</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.vacationsName}</TableCell>
                                    <TableCell>{invoice.vacationsQty}</TableCell>
                                    <TableCell>{invoice.vacationsStartDate}</TableCell>
                                    <TableCell>{invoice.vacationsEndDate}</TableCell>
                                    <TableCell>{invoice.vacationsStatus}</TableCell>
                                    <TableCell>
                                        <div>
                                            <Button
                                                color="secondary"
                                                component={Link}
                                                href="/vacations/list"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"

                                            >
                                                Aprobar
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                component={Link}
                                                href="/vacations/list"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"
                                            >
                                                Rechazar
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                style={{ backgroundColor: "orange" }}
                                                component={Link}
                                                href="/vacations/edit"
                                                size="small"
                                                sx={{ mb: 2 }}
                                                variant="contained"
                                            >
                                                Editar
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
