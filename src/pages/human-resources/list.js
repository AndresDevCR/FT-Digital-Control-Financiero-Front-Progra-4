// next
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, TablePagination } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const { themeStretch } = useSettingsContext();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://control-financiero.herokuapp.com/api/v1/employees');
      setRows(response.data);
      setFilteredRows(response.data);
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
    const filteredRows = rows.filter((row) =>
      row.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredRows);
    setPage(0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Lista de Empleados | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph sx={{ mt: 3 }}>
          Lista de Empleados
        </Typography>

        <Button
          color="primary"
          component={Link}
          href="/human-resources/add"
          size="large"
          sx={{ mb: 3 }}
          variant="contained"
          style={{ float: 'right' }}
        >
          Agregar Empleado
        </Button>

        <TextField
          fullWidth
          label="Buscar"
          name="search"
          onChange={handleSearch}
          sx={{ mb: 3 }}
        />

        {/* tabla de empleados */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre del cliente</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Fecha de ingreso</TableCell>
                <TableCell>Salario</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Días de descanso</TableCell>
                <TableCell>Días de vacaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.schedule}</TableCell>
                    <TableCell>{row.restDays}</TableCell>
                    <TableCell>{row.vacationDays}</TableCell>
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
