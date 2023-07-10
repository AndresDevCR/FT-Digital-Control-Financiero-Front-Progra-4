import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { AuthContext } from '../../auth/JwtContext';

// eslint-disable-next-line react/prop-types
export default function DeleteConfirmationDialog({ open, onClose, itemId, onDelete, apiEndpoint }) {
  const { accessToken } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(apiEndpoint + itemId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onDelete(itemId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar esta solicitud?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
