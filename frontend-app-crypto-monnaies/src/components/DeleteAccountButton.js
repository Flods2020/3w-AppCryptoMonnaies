import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { baseURL, userDataURL } from "../helper/url_helper";
import { useDispatch } from "react-redux";
import { deleteUserData } from "../store/slices/usersSlice";

const DeleteAccountButton = ({ userEmail }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAccount = async () => {
    console.log(email);
    const userEmailProps = userEmail;
    if (email === userEmailProps) {
      try {
        await axios
          .delete(`${baseURL}${userDataURL}`)
          .then(() => dispatch(deleteUserData()));
        alert("Compte supprimé");
        setOpen(false);
        navigate("/register");
      } catch (error) {
        console.log("Il ya eu une erreur dans la requête ::: ", error);
      }
    } else {
      alert("Veuillez entrer votre adresse mail svp");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[50],
      },
      secondary: {
        main: grey[900],
      },
    },
  });

  useEffect(() => {
    userEmail && console.log({ userEmail });
  }, [userEmail]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button color="primary" onClick={handleClickOpen}>
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
              Êtes-vous sûr(e) de vouloir supprimer DÉFINITIVEMENT votre compte
              ? <br />
              Si OUI, veuillez entrer votre adresse mail pour confirmer.
              <br />
            </DialogContentText>
            <TextField
              autoFocus
              autoComplete="off"
              margin="normal"
              id="name"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={deleteAccount} color="warning">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default DeleteAccountButton;
