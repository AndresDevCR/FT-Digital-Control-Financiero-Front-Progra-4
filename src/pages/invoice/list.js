/* eslint-disable no-unused-vars */
// next
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
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
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/invoice',{
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        }
      });
      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token de autenticación en el encabezado
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    row.client_name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Head>
        <title>Lista de Facturas | FT Control Financiero</title>
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
          value={searchTerm}
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.client_name}</TableCell>
                    <TableCell>{invoice.address}</TableCell>
                    <TableCell>{invoice.phone}</TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{invoice.issue_date}</TableCell>
                    <TableCell>{invoice.expiration_date}</TableCell>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.order_number}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        component={Link}
                        href={`/invoice/details/${invoice.id}`}
                        size="small"
                        variant="outlined"
                      >
                        Detalles
                      </Button>
                      <Button
                        color="primary"
                        component={Link}
                        href={`/invoice/edit/${invoice.id}`}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        color="error"
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(invoice.id)}
                      >
                        Eliminar
                      </Button>
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
    </>
  );
}

export default MyTable;
