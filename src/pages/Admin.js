import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useCliente } from "../context/cliente";
import axios from 'axios';
import { TabelaClientes } from "../components/TabelaClientes";
import { useHistory } from "react-router-dom";

function Admin() {
  const { authTokens } = useAuth();
  const { setCliente } = useCliente();
  const [clientes, setClientes] = useState([]);
  let history = useHistory();
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

  const editCliente = (cliente) => {
    setCliente(cliente);

    history.push("/editar")
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>Lista Clientes</div>
      {clientes && <TabelaClientes data={clientes} onDelete={deleteCliente} onEdit={editCliente} />}
    </div>
  );
}

export default Admin;
