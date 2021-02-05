import React, { useState } from "react";

const AuthField = (props) => {
  const { icon, label, value, setValue, type } = props;
  const [focus, setFocus] = useState(false);

  return (
    <div className="auth__field">
      <div className="field--left">
        {icon}
      </div>
      <div className="field--right">
        { focus && <label className="field__label">{label}</label>}
        <input
          className="field__input"
          type={type}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          required
        />
      </div>
    </div> 
  )
}

export default AuthField;