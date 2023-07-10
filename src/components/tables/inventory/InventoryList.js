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
} from '@mui/material';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../auth/JwtContext';

export default function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchInventory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setInventory(response.data);
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
      await axios.delete(
        `https://control-financiero.herokuapp.com/api/v1/inventory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
        >
          Crear Inventario
        </Button>

        <TextField fullWidth label="Buscar" name="search" sx={{ mb: 3 }} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto/servicio</TableCell>
                <TableCell>Cantidad disponible</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha de ingreso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((inventoryItem) => (
                <TableRow key={inventoryItem.id}>
                  <TableCell>{inventoryItem.productName}</TableCell>
                  <TableCell>{inventoryItem.availableQuantity}</TableCell>
                  <TableCell>{inventoryItem.description}</TableCell>
                  <TableCell>{inventoryItem.entryDate}</TableCell>
                  <TableCell>
                    <div>
                      <Button
                        color="secondary"
                        component={Link}
                        href={`/inventory/edit/${inventoryItem.id}`}
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
                        onClick={() => handleDeleteDialogOpen(inventoryItem.id)}
                      >
                        Eliminar
                      </Button>

                      <Button
                          color="error"
                          size="small"
                          sx={{ mb: 2, mr: 2 }}
                          variant="contained"
                          component={Link}
                          href={`/inventory/details/${inventoryItem.id}`}
                        >
                          Ver Detalles
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
