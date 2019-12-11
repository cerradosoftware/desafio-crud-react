import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import { TabelaClientes } from "../components/TabelaClientes";

function Admin() {
  const { authTokens } = useAuth();
  const [clientes, setClientes] = useState([]);
  axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens.jwt;

  const fetchData = () => {
    axios.get('/v1/clientes/')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCliente = (cliente) => {
    axios
      .delete("/v1/clientes/delete/" + cliente.id)
      .then(result => {
        console.log(result);
        fetchData();
      })
      .catch(e => {
        console.log(e.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>Lista Clientes</div>
      {clientes && <TabelaClientes data={clientes} onDelete={deleteCliente} />}
    </div>
  );
}

export default Admin;
