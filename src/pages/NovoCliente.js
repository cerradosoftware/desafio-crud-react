import React, { useState } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import FormInput from "../components/FormInput";
import { FormSelectEstados } from "../components/FormSelect";
import { DynamicListEmail, DynamicListTelefone } from "../components/DynamicList";


const NovoCliente = () => {
  const { authTokens } = useAuth();
  axios.defaults.headers.common['Authorization'] = "Bearer " + authTokens.jwt;

  //dados do formulario
  let [nome, setNome] = useState("");
  let [cpf, setCpf] = useState("");
  let [cep, setCep] = useState("");
  let [logradouro, setLogradouro] = useState("");
  let [complemento, setComplemento] = useState("");
  let [bairro, setBairro] = useState("");
  let [cidade, setCidade] = useState("");
  let [uf, setUf] = useState("");
  let [emails, setEmails] = useState([]);
  let [telefones, setTelefones] = useState([]);

  let [isError, setIsError] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");

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

  const reset = () => {        
    setNome("");
    setCpf("");
    setCep("");
    setLogradouro("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setUf("");
    setEmails([]);
    setTelefones([]);
  }

  const submitForm = (e) => {
    e.preventDefault();

    if(telefones.length === 0){
        setErrorMsg("Ao menos um telefone deve ser informado");
        setIsError(true);
        return;
    }

    if(emails.length === 0){
      setErrorMsg("Ao menos um email deve ser informado");
      setIsError(true);
      return;
  }

    let formData = {
      "nome": nome,
      "cpf": cpf.replace(/\D/g, ''),
      "endereco": {
        "cep": cep.replace(/\D/g, ''),
        "logradouro": logradouro,
        "bairro": bairro,
        "complemento": complemento,
        "cidade": cidade,
        "uf": uf
      },
      "telefones": telefones.map(t => {return {tipo: t.tipo, numero: t.numero.replace(/\D/g, '')}}),
      "emails": emails
    }

    axios
      .post("/v1/clientes/save",formData)
      .then(result => {
        if (result.status === 200) {  
          setIsError(false);        
          console.log(result)
        } else {
          setErrorMsg(result.statusText);
          setIsError(true);
        }
        reset();
      })
      .catch(e => {
        setErrorMsg(e.message);
        setIsError(true);
      });
  }

  return (
    <form style={styles.root} onSubmit={(e) => submitForm(e)} className="container">
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
          <DynamicListEmail value={emails} onChange={setEmails} />
          <DynamicListTelefone value={telefones} onChange={setTelefones} />
        </div>
      </div>
      {isError && (
          <div className="alert alert-danger" role="alert">{errorMsg}</div>
        )}
      <button type="submit" className="btn btn-primary">Cadastrar</button>
    </form>
  );
}

const styles = {
  root: {
    marginTop: 20,
    justifyContent: "center"
  },

}

export default NovoCliente;
