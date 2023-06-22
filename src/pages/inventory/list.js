/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, TablePagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/inventory', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredInvoices = invoices.filter((invoice) =>
      Object.values(invoice).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
    setFilteredInvoices(filteredInvoices);
    setPage(0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteModalOpen = (id) => {
    setSelectedInvoiceId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedInvoiceId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteInvoice = async () => {
    try {
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/inventory/${selectedInvoiceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const filteredInvoices = invoices.filter((invoice) => invoice.id !== selectedInvoiceId);
      setInvoices(filteredInvoices);
      setFilteredInvoices(filteredInvoices);
      handleDeleteModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    handleDeleteModalOpen(id);
  };

  return (
    <>
      <Head>
        <title>Lista de Inventario | FT Control Financiero</title>
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto/servicio</TableCell>
                <TableCell>Cantidad disponible</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha de ingreso</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.productName}</TableCell>
                    <TableCell>{invoice.availableQuantity}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.entryDate}</TableCell>
                    <TableCell style={{ margin: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button
                          color="secondary"
                          component={Link}
                          href={`/inventory/edit/${invoice.id}`}
                          size="small"
                          sx={{ mb: 2 }}
                          variant="contained"
                        >
                          Editar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="error"
                          size="small"
                          sx={{ mb: 2 }}
                          variant="contained"
                          onClick={() => handleDelete(invoice.id)}
                        >
                          Eliminar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          sx={{ mb: 2 }}
                          variant="contained"
                          component={Link}
                          href={`/inventory/details/${invoice.id}`}
                        >
                          Ver Detalles
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Dialog
          open={deleteModalOpen}
          onClose={handleDeleteModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás seguro de que deseas eliminar esta factura?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteModalClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteInvoice} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default MyTable;
