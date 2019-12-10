import React from "react";
export const TabelaClientes = ({ data }) => {
  return <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">CPF</th>
        <th scope="col">e-mail</th>
      </tr>
    </thead>
    <tbody>
      {data.map((c, i) => {
        return <tr key={i}>
          <th scope="row">{c.id}</th>
          <td>{c.nome}</td>
          <td>{c.cpf}</td>
          <td>{c.emails[0]}</td>
        </tr>;
      })}

    </tbody>
  </table>;
};
