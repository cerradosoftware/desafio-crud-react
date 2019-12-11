import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NovoCliente from "./pages/NovoCliente";
import { AuthContext } from "./context/auth";
import { ClienteContext } from "./context/cliente";
import Navbar from './components/NavBar';

function App() {
  const [authTokens, setAuthTokens] = useState();
  const [cliente, setCliente] = useState();

  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ClienteContext.Provider value={{ cliente, setCliente }}>
        <Router>
          <div>
            {authTokens && <Navbar />}
            <PrivateRoute exact path="/" component={Admin} />
            <PrivateRoute exact path="/novo" component={NovoCliente} />
            <Route path="/login" component={Login} />
          </div>
        </Router >
      </ClienteContext.Provider >
    </AuthContext.Provider >
  );
}

export default App;