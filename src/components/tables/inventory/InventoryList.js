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

export default function InventoryList() {
  const [inventory, setInventory] = useState([]);
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
    fetchInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = rows.filter((row) => row.productName.toLowerCase().includes(searchTerm));

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        'https://control-financiero.herokuapp.com/api/v1/inventory',
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
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setInventory((prevInventory) =>
        prevInventory.filter((inventoryItem) => inventoryItem.id !== id)
      );
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
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
          startIcon={<AddIcon />}
        >
          Crear Inventario
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
                <TableCell>Nombre del producto/servicio</TableCell>
                <TableCell>Cantidad disponible</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha de ingreso</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inventoryItem) => (
                <TableRow key={inventoryItem.id}>
                  <TableCell>{inventoryItem.productName}</TableCell>
                  <TableCell>{inventoryItem.availableQuantity}</TableCell>
                  <TableCell>{inventoryItem.description}</TableCell>
                  <TableCell>{inventoryItem.entryDate}</TableCell>
                  <TableCell>
                    <div>
                      <Button
                        style={{ backgroundColor: 'orange' }}
                        component={Link}
                        href={`/inventory/edit/${inventoryItem.id}`}
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
                        onClick={() => handleDeleteDialogOpen(inventoryItem.id)}
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
                        href={`/inventory/details/${inventoryItem.id}`}
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
        apiEndpoint="https://control-financiero.herokuapp.com/api/v1/inventory/"
      />
    </>
  );
}
