/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Typography,
    TextField,
    Button,
    TablePagination,
    InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../auth/JwtContext';

export default function QuotationList() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { accessToken } = useContext(AuthContext);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setPage(0);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        fetchQuotation();
    }, []);

    const fetchQuotation = async () => {
        try {
            const response = await axios.get(
                'https://control-financiero.herokuapp.com/api/v1/quotation',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setRows(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredRows = rows.filter((row) =>
        row.e_invoice_code.toLowerCase().includes(searchTerm)
    );

    const handleDeleteDialogOpen = (id) => {
        setDeleteItemId(id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setDeleteItemId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://control-financiero.herokuapp.com/api/v1/quotation/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setRows((prevRows) => prevRows.filter((quotationItem) => quotationItem.id !== id));
            handleDeleteDialogClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Container>
                <Typography variant="h3" component="h1" paragraph>
                    Lista de Cotizaciones
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/quotations/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                    startIcon={<AddIcon />}
                >
                    Crear Cotizaciones
                </Button>

                <TextField
                    fullWidth
                    label="Buscar"
                    name="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ManageSearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Total a pagar</TableCell>
                                <TableCell>Total a pagar en dólares</TableCell>
                                <TableCell>Código de factura</TableCell>
                                <TableCell>Fecha de emisión</TableCell>
                                <TableCell>Numero de orden de compra</TableCell>
                                <TableCell>Fecha de orden de compra</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Titulo de cotización</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((quotationItem) => (
                                    <TableRow key={quotationItem.id}>
                                        <TableCell>{quotationItem.total_payment}</TableCell>
                                        <TableCell>{quotationItem.total_payment_dollar}</TableCell>
                                        <TableCell>{quotationItem.e_invoice_code}</TableCell>
                                        <TableCell>{quotationItem.issue_date}</TableCell>
                                        <TableCell>{quotationItem.po_number}</TableCell>
                                        <TableCell>{quotationItem.po_date}</TableCell>
                                        <TableCell>{quotationItem.description}</TableCell>
                                        <TableCell>{quotationItem.quote_title}</TableCell>
                                        <TableCell>{quotationItem.client.client_name}</TableCell>
                                        <TableCell>
                                            <div>
                                                <Button
                                                    style={{ backgroundColor: 'orange' }}
                                                    component={Link}
                                                    href={`/quotation/edit/${quotationItem.id}`}
                                                    size="small"
                                                    sx={{ mb: 2 }}
                                                    variant="contained"
                                                    startIcon={<EditIcon />}
                                                >
                                                    Editar
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    color="error"
                                                    size="small"
                                                    sx={{ mb: 2 }}
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleDeleteDialogOpen(quotationItem.id)
                                                    }
                                                    startIcon={<DeleteForeverIcon />}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    sx={{ mb: 2, mr: 2 }}
                                                    variant="contained"
                                                    component={Link}
                                                    href={`/quotation/details/${quotationItem.id}`}
                                                    startIcon={<InfoIcon />}
                                                >
                                                    Ver Detalles
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
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Container>

            <DeleteConfirmationDialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                itemId={deleteItemId}
                onDelete={handleDelete}
                apiEndpoint="https://control-financiero.herokuapp.com/api/v1/quotation/"
            />
        </>
    );
}
