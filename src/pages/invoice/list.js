import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  Box,
  TextField,
  Button,
  TablePagination,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
 import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

const useStyles = makeStyles((theme) => ({
  createButton: {
    float: 'right',
    marginBottom: theme.spacing(3),
  },
  actionButtons: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const classes = useStyles();
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/invoice', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
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
      await axios.delete(
        `https://control-financiero.herokuapp.com/api/v1/invoice/${selectedInvoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchData();
      handleDeleteModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    handleDeleteModalOpen(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => row.client_name.toLowerCase().includes(searchTerm));

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
          variant="contained"
          className={classes.createButton}
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
                    <TableCell className={classes.actionButtons}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href={`/invoice/details/${invoice.id}`}
                            size="small"
                          >
                            Detalles
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            href={`/invoice/edit/${invoice.id}`}
                            size="small"
                          >
                            Editar
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            Eliminar
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
            count={filteredRows.length}
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
