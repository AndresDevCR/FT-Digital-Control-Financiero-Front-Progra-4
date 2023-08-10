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
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../../auth/JwtContext';

export default function ClientList() {
  const [client, setClient] = useState([]);
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
    fetchClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = rows.filter(
    (row) =>
      row.client_name.toLowerCase().includes(searchTerm) &&
      (selectedEnterprise === '' || row.enterprise.enterprise_name === selectedEnterprise)
  );

  const fetchClient = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/client', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setClient(response.data);
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
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/client/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setClient((prevClient) => prevClient.filter((clientItem) => clientItem.id !== id));
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
          Lista de Clientes
        </Typography>

        <Button
          color="primary"
          component={Link}
          href="/dashboard/client/add"
          size="large"
          sx={{ mb: 3 }}
          variant="contained"
          style={{ float: 'right' }}
          startIcon={<AddIcon />}
        >
          Agregar Clientes
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

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel
            id="enterprise-filter-label"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ManageSearchIcon style={{ marginRight: '0.5em' }} />
            Buscar por empresa
          </InputLabel>
          <Select
            labelId="enterprise-filter-label"
            id="enterprise-filter"
            value={selectedEnterprise}
            onChange={handleEnterpriseFilterChange}
          >
            <MenuItem value="">Todas las empresas</MenuItem>
            {client.map((clientItem) => (
              <MenuItem key={clientItem.id} value={clientItem.enterprise.enterprise_name}>
                {clientItem.enterprise.enterprise_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del Cliente</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((clientItem) => (
                  <TableRow key={clientItem.id}>
                    <TableCell>{clientItem.client_name}</TableCell>
                    <TableCell>{clientItem.phone}</TableCell>
                    <TableCell>{clientItem.email}</TableCell>
                    <TableCell>{clientItem.address}</TableCell>
                    <TableCell>{clientItem.enterprise.enterprise_name}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <Button
                          style={{ backgroundColor: 'orange' }}
                          component={Link}
                          href={`/dashboard/client/edit/${clientItem.id}`}
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
                          onClick={() => handleDeleteDialogOpen(clientItem.id)}
                          startIcon={<DeleteForeverIcon />}
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
        apiEndpoint="https://control-financiero.herokuapp.com/api/v1/client/"
      />
    </>
  );
}
