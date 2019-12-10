import React, { useState, useEffect } from "react";
import { Button } from "../components/Components";
import { useAuth } from "../context/auth";
import axios from 'axios';

function Admin(props) {
  const { authTokens, setAuthTokens } = useAuth();
  const { clientes, setClientes } = useState([]);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens.jwt;
    const fetchData = async () => {
      axios.get('/v1/clientes/')
        .then((response) => {
          setClientes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);


  function logOut() {
    setAuthTokens();
  }



  return (
    <div>
      <div>Admin Page</div>
      <div> {clientes}</div>
     
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;
