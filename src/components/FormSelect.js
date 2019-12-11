import React from "react";

const FormSelect = ({ label, value, onChange, data, addClassDiv = "", addClassInput = "" }) => {

    return (<div className={"form-group " + addClassDiv}>
        <label >{label}</label>
        <select value={value} onChange={onChange} className={"form-control " + addClassInput}>
            {data.map((item, index) => {
                return <option key={index} value={item[0]}>{item[1]}</option>
            })}
        </select>
    </div>);
}

const FormSelectEstados = (props) => {

    const estados = [
        ['', 'Selecione um estado'], ['AC', 'Acre'], ['AL', 'Alagoas'], ['AM', 'Amazonas'], ['AP', 'Amapá'], ['BA', 'Bahia'],
        ['CE', 'Ceará'], ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'], ['GO', 'Goiás'], ['MA', 'Maranhão'], ['MG', 'Minas Gerais'],
        ['MS', 'Mato Grosso do Sul'], ['MT', 'Mato Grosso'], ['PA', 'Pará'], ['PB', 'Paraíba'], ['PE', 'Pernambuco'], ['PI', 'Piauí'],
        ['PR', 'Paraná'], ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'], ['RO', 'Rondônia'], ['RR', 'Roraima'], ['RS', 'Rio Grande do Sul'],
        ['SC', 'Santa Catarina'], ['SP', 'São Paulo'], ['SE', 'Sergipe'], ['TO', 'Tocantins']
    ];

    return <FormSelect data={estados} {...props} />
}

export { FormSelect, FormSelectEstados };