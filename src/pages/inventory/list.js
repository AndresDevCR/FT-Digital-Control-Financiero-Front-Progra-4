// next
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, TablePagination } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';
// ----------------------------------------------------------------------

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const { accessToken } = useContext(AuthContext); // Obtiene el accessToken del AuthContext
  const { themeStretch } = useSettingsContext();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/inventory', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
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
    // eslint-disable-next-line no-shadow
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      // eslint-disable-next-line no-shadow
      const filteredInvoices = invoices.filter(
        (invoice) => invoice.id !== id
      );
      setInvoices(filteredInvoices);
      setFilteredInvoices(filteredInvoices);
    } catch (error) {
      console.log(error);
    }
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
                <TableCell />
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
                      <div>
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
            count={filteredInvoices.length}
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
