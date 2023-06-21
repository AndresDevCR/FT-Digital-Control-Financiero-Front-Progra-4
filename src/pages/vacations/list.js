/* eslint-disable no-unused-vars */
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/vacation', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken]);

  const filteredRows = rows.filter((row) =>
    row.employee_name.toLowerCase().includes(searchTerm)
  );

  const handleDeleteDialogOpen = (id) => {
    setOpenDeleteDialog(true);
    setDeleteItemId(id);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteItemId(null);
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    handleDeleteDialogOpen();
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/vacation/${deleteItemId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteItemId));
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (rowId) => {
    setEditingRowId(rowId);
    const selectedRow = rows.find((row) => row.id === rowId);
    setEditedData(selectedRow);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`https://control-financiero.herokuapp.com/api/v1/vacation/${editingRowId}`, editedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setEditingRowId(null);
      setEditedData({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetails = (rowId) => {
    // Aquí debes redirigir a la vista de ver detalles
    // Por ejemplo:
    window.location.href = `/details/${rowId}`;
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  return (
    <>
      <Head>
        <title>Lista de Vacaciones | FT Control Financiero</title>
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
          value={searchTerm}
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        name="employee_name"
                        value={editedData.employee_name || ''}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      row.employee_name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        name="available_quantity"
                        value={editedData.available_quantity || ''}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      row.available_quantity
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        name="start_date"
                        value={editedData.start_date || ''}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      row.start_date
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        name="reentry_date"
                        value={editedData.reentry_date || ''}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      row.reentry_date
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        name="request_status"
                        value={editedData.request_status || ''}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      row.request_status
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === row.id ? (
                      <>
                        <Button
                          color="primary"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          onClick={handleSave}
                        >
                          Guardar
                        </Button>
                        <Button
                          color="secondary"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="secondary"
                          component={Link}
                          href="/vacations/list"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                        >
                          Aprobar
                        </Button>
                        <Button
                          color="primary"
                          component={Link}
                          href="/vacations/list"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                        >
                          Rechazar
                        </Button>
                        <Button
                          style={{ backgroundColor: 'orange' }}
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          onClick={() => handleEdit(row.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          onClick={() => handleDelete(row.id)}
                        >
                          Borrar
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          component={Link}
                          href={`/vacations/details/${row.id}`}
                        >
                          Ver Detalles
                        </Button>
                      </>
                    )}
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
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta solicitud?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyTable;
