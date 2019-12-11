import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const Login = (props) => {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    axios
      .post("/v1/acesso/login", {
        login: userName,
        password
      })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  }

  let referer = "/";
  if (props.location.state) {
    referer = props.location.state.referer;
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div style={styles.container}>
      <form>
        <h1 className="h3 mb-3 font-weight-normal">Entre com seu usuario  </h1>
        <input style={styles.input}
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          className="form-control"
          placeholder="usuario"
        />
        <input style={styles.input}
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          className="form-control"
          placeholder="password"
        />
        {isError && (
          <div className="alert alert-danger" role="alert">Usuario/senha incorreto!</div>
        )}
        <button type="button" className="btn btn-lg btn-primary btn-block" onClick={postLogin}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 250
  },
  input: {
    marginBottom: 10
  }
}

export default Login;
