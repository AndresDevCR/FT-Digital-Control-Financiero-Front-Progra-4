import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar este campo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          startIcon={<CancelIcon />}
          color="warning"
          style={{ color: '#fff' }}
          variant="contained"
          
        >
          Cancelar
        </Button>
        <Button
          startIcon={<RemoveCircleIcon />}
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
