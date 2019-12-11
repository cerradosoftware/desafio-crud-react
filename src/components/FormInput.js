import React from "react";
import InputMask from "react-input-mask";

const FormInput = ({ label, value, placeholder, onBlur, onChange, mask, addClassDiv = "", addClassInput = "", required = false }) => {

    if(mask){
        return (<div className={"form-group " + addClassDiv}>
        <label >{label}</label>
        <InputMask mask={mask} required={required} className={"form-control " + addClassInput} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
      </div>)
    }

    return (<div className={"form-group " + addClassDiv}>
        <label>{label}</label>
        <input type="text"  required={required} className={"form-control "+ addClassInput} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
    </div>);
}

export default FormInput;