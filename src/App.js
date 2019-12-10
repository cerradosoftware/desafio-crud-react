import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NovoCliente from "./pages/NovoCliente";
import { AuthContext } from "./context/auth";
import Navbar from './components/NavBar';

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          {authTokens && <Navbar />}
          <PrivateRoute exact path="/" component={Admin} />
          <PrivateRoute exact path="/novo" component={NovoCliente} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;