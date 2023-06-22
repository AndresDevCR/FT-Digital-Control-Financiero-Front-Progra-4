/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { memo, useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, Avatar, Card, CardContent } from '@mui/material';
import { AuthContext } from '../../auth/JwtContext';
import { useSettingsContext } from '../../components/settings';
import DashboardLayout from '../../layouts/dashboard';

const Profile = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const { themeStretch } = useSettingsContext();

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* Logo o título del perfil de usuario */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Perfil de usuario
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        {/* Tarjeta de foto de portada */}
        <Card sx={{ width: '100%', position: 'relative', marginBottom: 2, overflow: 'hidden' }}>
          <img src="https://i.pinimg.com/originals/1a/c7/38/1ac7382c342c9c7dc6e8eb9a80f0083d.jpg" alt="Foto de portada" style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
          {/* Tarjeta de foto de perfil */}
          <Card sx={{ width: '100%', display: 'flex', justifyContent: 'rigth', alignItems: 'center', p: 2, mb: 2, backgroundColor: 'transparent' }}>
            <Avatar
              src="/ruta-a-la-foto-de-perfil.jpg"
              alt={user?.first_name}
              name={user?.first_name}
              sx={{
                width: theme.spacing(30), // Aumentamos el tamaño de la imagen de perfil
                height: theme.spacing(30),
                fontSize: theme.spacing(10), // Aumentamos el tamaño de la fuente del avatar
                fontWeight: 'bold',
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
              }}
            />
          </Card>
        </Card>

        {/* Tarjeta de información del usuario */}
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Información del usuario
            </Typography>
            <Typography sx={{ marginTop: 2 }}>
              <strong>Nombre:</strong> {user?.first_name} {user?.last_name}
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              <strong>Email:</strong> {user?.email}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profile;
