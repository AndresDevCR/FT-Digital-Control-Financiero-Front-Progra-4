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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import DeleteConfirmationDialog from '../../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../../auth/JwtContext';

export default function SupplierList() {
  const [supplier, setSupplier] = useState([]);
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
    fetchSupplier();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = rows.filter((row) => row.supplier_name.toLowerCase().includes(searchTerm));

  const fetchSupplier = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/supplier', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSupplier(response.data);
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
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSupplier((prevSupplier) => prevSupplier.filter((supplierItem) => supplierItem.id !== id));
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Lista de Proveedores
        </Typography>

        <Button
          color="primary"
          component={Link}
          href="/dashboard/supplier/add"
          size="large"
          sx={{ mb: 3 }}
          variant="contained"
          style={{ float: 'right' }}
          startIcon={<AddIcon />}
        >
          Agregar Proveedor
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
              <InputAdornment supplier="start">
                <ManageSearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del proveedor</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplierItem) => (
                  <TableRow key={supplierItem.id}>
                    <TableCell>{supplierItem.supplier_name}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <Button
                          style={{ backgroundColor: 'orange' }}
                          component={Link}
                          href={`/dashboard/supplier/edit/${supplierItem.id}`}
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
                          onClick={() => handleDeleteDialogOpen(supplierItem.id)}
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
        apiEndpoint="https://control-financiero.herokuapp.com/api/v1/supplier/"
      />
    </>
  );
}
