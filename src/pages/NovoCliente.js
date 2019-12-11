import React, { useState } from "react";
//import { useAuth } from "../context/auth";
import axios from 'axios';
import FormInput from "../components/FormInput";
import { FormSelectEstados } from "../components/FormSelect";


const NovoCliente = () => {
  //const { authTokens } = useAuth();
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
    if (cep.length === 9) {
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

  }

  return (
        <form style={styles.root}  className="container-fluid">
        <div className="row">
          <div className="col">
            <h3 className="mb-3">Dados Pessoais</h3>
            <div className="form-row">
              <FormInput label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Fulano da Silva Sauro" addClassDiv="col-md-7" required />
              <FormInput label="CPF (Somente numero)" mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" addClassDiv="col-md-5" required />
            </div>
            <h3 className="mb-3">Endereço</h3>
            <FormInput label="CEP (Somente numeros)" mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscaPorCep} placeholder="00000-000" addClassInput="col-md-3" required />
            <FormInput label="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Rua, nº" required />
            <FormInput label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Casa 2, ap 109" />
            <FormInput label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Asa Norte" required />
            <div className="form-row">
              <FormInput label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Brasilia" addClassDiv="col-md-6" required />
              <FormSelectEstados label="UF" value={uf} onChange={(e) => setUf(e.target.value)} addClassDiv="col-md-6" required />
            </div>
          </div>
          <div className="col">
            <h3 className="mb-3">Dados Contato</h3>
          </div>
        </div>
       <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>   
  );
}

const styles = {
  root: {
   
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },

}

export default NovoCliente;
