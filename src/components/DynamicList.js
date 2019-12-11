import React, { useState } from "react";
import InputMask from "react-input-mask";


const DynamicListEmail = ({ value, onChange }) => {

    let [email, setEmail] = useState("");
    let [error, setError] = useState(false);

    const add = () => {
        if (email.includes("@")) {
            value.push(email);
            setEmail("");
            onChange(value);
            setError(false);
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <label >Emails</label>
            {(value.length === 0) && <div className="alert alert-danger" role="alert">
                Ao menos um email deve ser informado.
            </div>}
            <ul className="list-group">
                {
                    value.map((item, index) => {
                        return <li key={index} className="list-group-item">{item}</li>
                    })
                }
            </ul>
            {error && <div className="alert alert-danger" role="alert">
                Email invalido.
            </div>}
            <div className="input-group input-group-sm mb-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="seu@email.com" />
                <button type="button" onClick={() => add()} className="btn btn-primary">Add</button>
            </div>
        </div>
    );
}

const DynamicListTelefone = ({ value, onChange }) => {

    let [telefone, setTelefone] = useState("");
    let [tipo, setTipo] = useState("RESIDENCIAL")
    let [error, setError] = useState(false);

    const add = () => {

        let tamanho = (tipo==="CELULAR")?14:13;

        if(telefone.length === tamanho){
            value.push({
                tipo: tipo,
                numero: telefone
            })
            setTelefone("");
            onChange(value);
            setError(false);
        }
        else{
            setError(true);
        }
    }

    return (
        <div>
            <label >Telefones</label>
            {(value.length === 0) && <div className="alert alert-danger" role="alert">
                Ao menos um telefone deve ser informado.
            </div>}
            <ul className="list-group">
                {
                    value.map((item, index) => {
                        return <li key={index} className="list-group-item">{item.tipo} - {item.numero}</li>
                    })
                }
            </ul>
            {error && <div className="alert alert-danger" role="alert">
                Telefone invalido.
            </div>}
            <div className="input-group input-group-sm mb-3">
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="custom-select" id="inputGroupSelect04">                    
                    <option value="RESIDENCIAL">RESIDENCIAL</option>
                    <option value="COMERCIAL">COMERCIAL</option>
                    <option value="CELULAR">CELULAR</option>
                </select>
                {(tipo === 'CELULAR') && <InputMask mask="(99)99999-9999" className={"form-control"} value={telefone} onChange={(e) => setTelefone(e.target.value)}  placeholder="(99) 9 9999 9999" />}
                {(tipo !== 'CELULAR') && <InputMask mask="(99)9999-9999" className={"form-control"} value={telefone} onChange={(e) => setTelefone(e.target.value)}  placeholder="(99) 9999 9999" />}
                
                <button type="button" onClick={() => add()} className="btn btn-primary">Add</button>
            </div>
        </div>
    );
}


export { DynamicListEmail, DynamicListTelefone };
