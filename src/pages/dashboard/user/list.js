import Head from 'next/head';

// layouts
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Grid, TextField, Button, TablePagination } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';


// ----------------------------------------------------------------------

MyTable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function MyTable() {
  const { themeStretch } = useSettingsContext();
  const [users] = useState([
    {
      userName: 'David Cardenas Orozco',
      userEmail: 'dcardenas90058@ufide.ac.cr',
      userNumber: '7244-5678',
      userIdentification: '118790058',
      userJob: 'Full Stack Developer',
      userRole: 'Administrador',
      userStatus: 'Activo',
    },
    {
      userName: 'Juan Perez',
      userEmail: 'jperez@gmail.com',
      userNumber: '2234-5678',
      userIdentification: '206980345',
      userJob: 'Contador',
      userRole: 'Usuario',
      userStatus: 'Activo',
    },
    {
      userName: 'María Fernández',
      userEmail: 'mfernandez@hotmail.com',
      userNumber: '8765-4321',
      userIdentification: '118780095',
      userJob: 'Diseñadora Gráfica',
      userRole: 'Administrador',
      userStatus: 'Activo',
    },
    {
      userName: 'Pedro Rodriguez',
      userEmail: 'prodriguez@yahoo.com',
      userNumber: '5555-5555',
      userIdentification: '209870098',
      userJob: 'Ingeniero Civil',
      userRole: 'Usuario',
      userStatus: 'Activo',
    },
    {
      userName: 'Luisa Gómez',
      userEmail: 'lgomez@gmail.com',
      userNumber: '1111-2222',
      userIdentification: '315090432',
      userJob: 'Abogada',
      userRole: 'Administrador',
      userStatus: 'Activo',
    },
    {
      userName: 'Andres Velasco',
      userEmail: 'avelasco@outlook.com',
      userNumber: '3333-4444',
      userIdentification: '119980345',
      userJob: 'Ingeniero en Sistemas',
      userRole: 'Usuario',
      userStatus: 'Activo',
    },
    {
      userName: 'Laura Castro',
      userEmail: 'lcastro@yahoo.com',
      userNumber: '7777-8888',
      userIdentification: '210880345',
      userJob: 'Psicóloga',
      userRole: 'Usuario',
      userStatus: 'Activo',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => Object.values(user).some(
    (value) => value.toLowerCase().includes(searchTerm)
  ));

  return (
    <>

      <Head>
        <title>Lista de Usuarios | FT Control Financiero</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Lista de Usuarios</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Buscar"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Link href="/dashboard/users/create">
              <Button
                color="primary"
                component={Link}
                href="/dashboard/user/add"
                size="large"
                sx={{ mb: 3, float: 'right' }}
                variant="contained"
              >
                Crear Usuario
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo Electrónico</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Identificación</TableCell>
                  <TableCell>Puesto</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.userEmail}</TableCell>
                      <TableCell>{user.userNumber}</TableCell>
                      <TableCell>{user.userIdentification}</TableCell>
                      <TableCell>{user.userJob}</TableCell>
                      <TableCell>{user.userRole}</TableCell>
                      <TableCell>{user.userStatus}</TableCell>
                      <TableCell>
                        <div>
                          <Button
                            color="secondary"
                            component={Link}
                            href="/dashboard/user/edit"
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
                            component={Link}
                            href="/dashboard/user/list"
                            size="small"
                            sx={{ mb: 2 }}
                            variant="contained"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ px: 3 }}
          />
        </Paper>
      </Container>
    </>
  );
}

export default MyTable;