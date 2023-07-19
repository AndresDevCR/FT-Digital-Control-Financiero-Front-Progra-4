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
    Checkbox,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../../auth/JwtContext';

export default function CompanyList() {
    const [company, setCompany] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { accessToken } = useContext(AuthContext);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEnterprise, setSelectedEnterprise] = useState('');

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
        fetchCompany();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRows = rows.filter(
        (row) =>
            row.name.toLowerCase().includes(searchTerm) &&
            (selectedEnterprise === '' || row.enterprise.enterprise_name === selectedEnterprise)
    );

    const fetchCompany = async () => {
        try {
            const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/company', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCompany(response.data);
            setRows(response.data);
        } catch (error) {
            console.log(error);
        }
    };

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
            await axios.delete(`https://control-financiero.herokuapp.com/api/v1/company/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCompany((prevCompany) =>
                prevCompany.filter((companyItem) => companyItem.id !== id)
            );
            handleDeleteDialogClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterpriseFilterChange = (event) => {
        setSelectedEnterprise(event.target.value);
        setPage(0);
    };

    return (
        <>
            <Container>
                <Typography variant="h3" component="h1" paragraph>
                    Lista de Compañías
                </Typography>

                <Button
                    color="primary"
                    component={Link}
                    href="/dashboard/company/add"
                    size="large"
                    sx={{ mb: 3 }}
                    variant="contained"
                    style={{ float: 'right' }}
                    startIcon={<AddIcon />}
                >
                    Agregar Compañías
                </Button>

                <TextField
                    fullWidth
                    label="Buscar por nombre"
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
                                <TableCell>Nombre del Compañía</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Primer Teléfono</TableCell>
                                <TableCell>Segundo Teléfono</TableCell>
                                <TableCell>Ciudad</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>País</TableCell>
                                <TableCell>Es Activo?</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((companyItem) => (
                                    <TableRow key={companyItem.id}>
                                        <TableCell>{companyItem.name}</TableCell>
                                        <TableCell>{companyItem.description}</TableCell>
                                        <TableCell>{companyItem.primary_phone_number}</TableCell>
                                        <TableCell>{companyItem.secondary_phone_number}</TableCell>
                                        <TableCell>{companyItem.city}</TableCell>
                                        <TableCell>{companyItem.state}</TableCell>
                                        <TableCell>{companyItem.country}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={companyItem.is_active}
                                                sx={{
                                                    color: companyItem.is_active ? 'green' : 'red',
                                                }}
                                                disabled
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <Button
                                                    style={{ backgroundColor: 'orange' }}
                                                    component={Link}
                                                    href={`/dashboard/company/edit/${companyItem.id}`}
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
                                                    onClick={() => handleDeleteDialogOpen(companyItem.id)}
                                                    startIcon={<DeleteForeverIcon />}
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
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Container >

            <DeleteConfirmationDialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                itemId={deleteItemId}
                onDelete={handleDelete}
                apiEndpoint="https://control-financiero.herokuapp.com/api/v1/company/"
            />
        </>
    );
}
