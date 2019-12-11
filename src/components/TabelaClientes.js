import React from "react";
import StringMask from "string-mask";
import { useAuth } from "../context/auth"
import axios from 'axios';

export const TabelaClientes = ({ data, onDelete, onEdit }) => {
  const { authTokens } = useAuth();

  const editCliente = (cliente) => {

  }



  return <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">CPF</th>
        <th scope="col">Logradouro</th>
        <th scope="col">Bairro</th>
        <th scope="col">Cidade</th>
        <th scope="col">uf</th>
        <th scope="col">cep</th>
        <th scope="col">Telefone (principal)</th>
        <th scope="col">Email (principal)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((c, i) => {

        let maskCpf = new StringMask('000.000.000-00').apply(c.cpf);
        let maskCep = new StringMask('00000-000').apply(c.cep);
        let maskFone = (c.telefones[0].tipo === "CELULAR") ? new StringMask('(00) 00000-0000').apply(c.telefones[0].numero)
          : new StringMask('(00) 00000-0000').apply(c.telefones[0].numero);


        return <tr key={i}>
          <th scope="row">{c.id}</th>
          <td>{c.nome}</td>
          <td>{maskCpf}</td>
          <td>{c.endereco.logradouro}</td>
          <td>{c.endereco.bairro}</td>
          <td>{c.endereco.cidade}</td>
          <td>{c.endereco.uf}</td>
          <td>{maskCep}</td>
          <td>{c.telefones[0].tipo} - {maskFone}</td>
          <td>{c.emails[0]}</td>
          {(authTokens.role === "ROLE_ADMIN") && <td>
            <button className="material-icons" >create</button>
          </td>}
          {(authTokens.role === "ROLE_ADMIN") && <td>
            <button className="material-icons" onClick={() => onDelete(c)}>close</button>
          </td>}
        </tr>;
      })}

    </tbody>
  </table>;
};
