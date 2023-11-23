import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteAccountButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Supprimer Mon Compte
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        autoComplete="off"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Supprimer mon compte APP-CRYPTO-MONNAIES
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr(e) de vouloir supprimer DÉFINITIVEMENT votre compte ?{" "}
            <br />
            Si OUI, veuillez entrer votre adresse mail pour confirmer.
            <br />
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Email Address"
            type="email"
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccountButton;
