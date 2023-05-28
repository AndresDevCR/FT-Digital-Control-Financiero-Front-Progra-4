/* eslint-disable no-unused-vars */
// next
import Head from 'next/head';
// layouts
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
  Box,
  Grid,
  TextField,
  Button,
  TablePagination,
} from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { AuthContext } from '../../auth/JwtContext';

// ----------------------------------------------------------------------

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
  },
  addButton: {
    float: 'right',
    marginBottom: theme.spacing(3),
  },
  searchInput: {
    marginBottom: theme.spacing(3),
  },
}));

function MyTable() {
  const { accessToken } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();
  const classes = useStyles();
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
      const response = await axios.get(
        'https://control-financiero.herokuapp.com/api/v1/human-rescourse',
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://control-financiero.herokuapp.com/api/v1/human-rescourse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
    row.employee_name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Head>
        <title>Lista de Empleados | FT Control Financiero</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'} className={classes.container}>
        <Typography variant="h3" component="h1" paragraph>
          Lista de Empleados
        </Typography>

        <Button
          color="primary"
          component={Link}
          href="/human-resources/add"
          size="large"
          className={classes.addButton}
          variant="contained"
        >
          Crear Empleado
        </Button>

        <TextField
          fullWidth
          label="Buscar"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          className={classes.searchInput}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del empleado</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Fecha de entrada</TableCell>
                <TableCell>Salario</TableCell>
                <TableCell>Puesto</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Días de descanso</TableCell>
                <TableCell>Días de vacaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.employee_name}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.entry_date}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.schedule}</TableCell>
                    <TableCell>{employee.rest_days}</TableCell>
                    <TableCell>{employee.vacation_days}</TableCell>
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
