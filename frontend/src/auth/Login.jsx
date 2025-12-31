import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async () => {
    const res = await loginUser(form);
    login(res.data.access_token);
    alert("Logged in");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
