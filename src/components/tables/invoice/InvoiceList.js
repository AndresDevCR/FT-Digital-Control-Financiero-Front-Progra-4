/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
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
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../auth/JwtContext';

export default function InvoiceList() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { accessToken } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();


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
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
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

  const filteredRows = rows.filter((row) =>
    row.invoice_number.toString().toLowerCase().includes(searchTerm)
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
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRows((prevRows) => prevRows.filter((invoiceItem) => invoiceItem.id !== id));
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = async (id) => {
    console.log(id);
    try {
      const response= await axios.post(
        `https://control-financiero.herokuapp.com/api/v1/v1/notifications/invoice-emails/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        enqueueSnackbar('Notificación enviada', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Error al enviar la notificación', { variant: 'error' });
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
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
          startIcon={<AddIcon />}
        >
          Crear Facturas
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
                <TableCell>Fecha de emisión</TableCell>
                <TableCell>Fecha de expiración</TableCell>
                <TableCell>Número de factura</TableCell>
                <TableCell>Valor del dólar</TableCell>
                <TableCell>Total en colones</TableCell>
                <TableCell>Total en dólares</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoiceItem) => (
                  <TableRow key={invoiceItem.id}>
                    <TableCell>{invoiceItem.issue_date.split('T')[0]}</TableCell>
                    <TableCell>{invoiceItem.expiration_date.split('T')[0]}</TableCell>
                    <TableCell>{invoiceItem.invoice_number}</TableCell>
                    <TableCell>{invoiceItem.dollar_value}</TableCell>
                    <TableCell>{invoiceItem.total_colon}</TableCell>
                    <TableCell>{invoiceItem.total_dollar}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <Button
                          style={{ backgroundColor: 'orange' }}
                          component={Link}
                          href={`/invoice/edit/${invoiceItem.id}`}
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                          variant="contained"
                          startIcon={<EditIcon />}
                        />
                      </Tooltip>

                      <Tooltip title="Eliminar">
                        <Button
                          color="error"
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                          variant="contained"
                          onClick={() => handleDeleteDialogOpen(invoiceItem.id)}
                          startIcon={<DeleteForeverIcon />}
                        />
                      </Tooltip>

                      <Tooltip title="Ver Detalles">
                        <Button
                          color="info"
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                          variant="contained"
                          component={Link}
                          href={`/invoice/details/${invoiceItem.id}`}
                          startIcon={<InfoIcon />}
                        />
                      </Tooltip>
                      <Tooltip title="Enviar Email">
                        <Button
                          color="primary"
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                          variant="contained"
                          onClick={() => handleNotification(`${invoiceItem.id}`)}
                          startIcon={<EmailIcon />}
                        />
                      </Tooltip>
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
        apiEndpoint="https://control-financiero.herokuapp.com/api/v1/invoice/"
      />
    </>
  );
}
