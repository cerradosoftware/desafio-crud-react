import React, { useState } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import FormInput from "../components/FormInput";
import  { FormSelectEstados } from "../components/FormSelect";


const NovoCliente = () => {
  const { authTokens } = useAuth();
  //axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens;

  //dados do formulario
  let [nome, setNome] = useState("");
  let [cpf, setCpf] = useState("");
  let [cep, setCep] = useState("");
  let [logradouro, setLogradouro] = useState("");
  let [complemento, setComplemento] = useState("");
  let [bairro, setBairro] = useState("");
  let [cidade, setCidade] = useState("");
  let [uf, setUf] = useState("");

  const buscaPorCep = () => {
    axios.get(`/ws/${cep}/json/`)
      .then((response) => {
        console.log(response);
        setLogradouro(response.data.logradouro);
        setComplemento(response.data.complemento);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setUf(response.data.uf);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={styles.container} >
      <form>
        <h3 className="mb-3">Dados Pessoais</h3>
        <div className="form-row">         
          <FormInput label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Fulano da Silva Sauro" addClassDiv="col-md-7" />
          <FormInput label="CPF (Somente numero)"  mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" addClassDiv="col-md-5" />
        </div>
        <h3 className="mb-3">Endereço</h3>
        <FormInput label="CEP (Somente numeros)" mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscaPorCep} placeholder="00000-000" addClassInput="col-md-3" />
        <FormInput label="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Rua, nº" />
        <FormInput label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Casa 2, ap 109" />
        <FormInput label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Asa Norte" />
        <div className="form-row">
          <FormInput label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Brasilia" addClassDiv="col-md-6" />
          <FormSelectEstados label="UF" value={uf}  onChange={(e) => setUf(e.target.value)} addClassDiv="col-md-6" />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20

  },

}

export default NovoCliente;
