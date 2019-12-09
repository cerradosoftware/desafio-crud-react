import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth";

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
          <ul>          
            <li>
              <Link to="/">Admin Page</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <PrivateRoute exact path="/" component={Admin} />
          <Route path="/login" component={Login} />          
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
