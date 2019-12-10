import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import { TabelaClientes } from "../components/TabelaClientes";

function Admin() {
  const { authTokens } = useAuth();
  const [clientes, setClientes] = useState([]);
  axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens;

  const fetchData = () => {
    axios.get('/v1/clientes/')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>Lista Clientes</div>
      {clientes && <TabelaClientes data={clientes} />}
    </div>
  );
}

export default Admin;
