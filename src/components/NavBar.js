import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {

  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  }

  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="nav-link" to="/novo">Novo Cliente</Link>
    <Link className="nav-link" to="/">Admin Page</Link>
    <button style={styles.logOut} type="button" className="btn btn-link" onClick={logOut}>Log out</button>
  </nav>
}

const styles = {
  logOut: {
    'marginRight': 10
  }
}

export default Navbar;