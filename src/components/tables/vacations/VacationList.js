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
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import DeleteConfirmationDialog from '../../delete-dialog/DeleteDialog';
import { AuthContext } from '../../../auth/JwtContext';

export default function VacationList() {
  const [vacation, setVacation] = useState([]);
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
    fetchVacation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = rows.filter((row) => {
    const employeeName = row.employee ? row.employee.employee_name.toLowerCase() : '';
    const startDate = row.start_date.toLowerCase();
    const reentryDate = row.reentry_date.toLowerCase();
    const requestStatus = row.request_status.toLowerCase();

    return (
      employeeName.includes(searchTerm) ||
      startDate.includes(searchTerm) ||
      reentryDate.includes(searchTerm) ||
      requestStatus.includes(searchTerm)
    );
  });

  const fetchVacation = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/vacation', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setVacation(response.data);
      setRows(response.data);
    } catch (error) {
     enqueueSnackbar('Error al cargar las solicitudes', { variant: 'error' });
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
      await axios.delete(`https://control-financiero.herokuapp.com/api/v1/vacation/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setVacation((prevVacation) => prevVacation.filter((vacationItem) => vacationItem.id !== id));
      handleDeleteDialogClose();
    } catch (error) {
      enqueueSnackbar('Error al eliminar la solicitud', { variant: 'error' });
    }
  };

  const handleNotification = async (id) => {
    console.log(id);
    try {
      const response= await axios.post(
        `https://control-financiero.herokuapp.com/api/v1/v1/notifications/vacation-emails/${id}`,
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
          Lista de vacaciones
        </Typography>

        <Button
          color="primary"
          component={Link}
          href="/vacations/add"
          size="large"
          sx={{ mb: 3 }}
          variant="contained"
          style={{ float: 'right' }}
          startIcon={<AddIcon />}
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
                <TableCell>Empleado</TableCell>
                <TableCell>Fecha de inicio</TableCell>
                <TableCell>Fecha de reingreso</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vacationItem) => (
                  <TableRow key={vacationItem.id}>
                    <TableCell>
                      {vacationItem.employee ? vacationItem.employee.employee_name : '-'}
                    </TableCell>
                    <TableCell>{vacationItem.start_date.split('T')[0]}</TableCell>
                    <TableCell>{vacationItem.reentry_date.split('T')[0]}</TableCell>
                    <TableCell>{vacationItem.request_status}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <Button
                          style={{ backgroundColor: 'orange' }}
                          component={Link}
                          href={`/vacations/edit/${vacationItem.id}`}
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
                          onClick={() => handleDeleteDialogOpen(vacationItem.id)}
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
                          href={`/vacations/details/${vacationItem.id}`}
                          startIcon={<InfoIcon />}
                        />
                      </Tooltip>
                      <Tooltip title="Enviar Email">
                        <Button
                          color="primary"
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                          variant="contained"
                          onClick={() => handleNotification(`${vacationItem.id}`)}
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
        apiEndpoint="https://control-financiero.herokuapp.com/api/v1/vacation/"
      />
    </>
  );
}
