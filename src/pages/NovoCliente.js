import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const NovoCliente = () => {
  const { authTokens } = useAuth();
  axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens;

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" component="h3">
        Cadastro de Cliente
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Nome" />
        <TextField id="standard-basic" label="CPF" />
      </form>
    </div>
  );
}



export default NovoCliente;
