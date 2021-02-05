import React, { useState } from "react";
import { useDispatch } from "react-redux";

import AuthField from "./AuthField";

import { signup } from "../../../store/session";
import "./styles/auth.css";


const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <AuthField 
          icon={<i className="field__icon fa-lg fas fa-envelope"></i>}
          label="EMAIL"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <AuthField 
          icon={<i className="field__icon fa-lg fas fa-user"></i>}
          label="USERNAME"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <AuthField 
          icon={<i className="field__icon fa-lg fas fa-unlock-alt"></i>}
          label="PASSWORD"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <AuthField 
          icon={<i className="field__icon fa-lg fas fa-unlock-alt"></i>}
          label="CONFIRM PASSWORD"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <button className="field__buttons" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;
